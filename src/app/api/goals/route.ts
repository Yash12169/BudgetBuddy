
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

const inflationRates = {
  realEstate: 0.06,
  automobile: 0.04,
  education: 0.05,
  general: 0.03,
} as const;

type CategoryType = keyof typeof inflationRates;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Missing userId' }, { status: 400 });
    }

    const goals = await prisma.lifeGoal.findMany({
      where: { userId },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        userId: true,
        title: true,
        targetAmount: true,
        adjustedTargetAmount: true,
        amountRequired: true, 
        yearsToGoal: true,
        category: true,
        currentSalary: true,
        annualIncrementRate: true,
        forecastedSalary: true,
        isAchievable: true,
        priority: true,
        createdAt: true,
      },
    });

    if (goals.length === 0) {
      return NextResponse.json({ success: false, message: 'No goals found for this user' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: goals }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch goals', error: error.message }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      title,
      targetAmount,
      amountRequired,
      yearsToGoal,
      category,
      currentSalary,
      annualIncrementRate,
      priority = 3,
    } = body;

    const missingFields = [];
    if (!userId) missingFields.push('userId');
    if (!title) missingFields.push('title');
    if (!targetAmount) missingFields.push('targetAmount');
    if (!amountRequired) missingFields.push('amountRequired');
    if (!yearsToGoal) missingFields.push('yearsToGoal');
    if (!category) missingFields.push('category');
    if (!currentSalary) missingFields.push('currentSalary');
    if (!annualIncrementRate) missingFields.push('annualIncrementRate');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Missing fields', missingFields },
        { status: 400 }
      );
    }

    if (priority < 1 || priority > 3) {
      return NextResponse.json({ success: false, message: 'Priority must be 1, 2, or 3' }, { status: 400 });
    }

    const inflationRate = inflationRates[category as CategoryType] || inflationRates.general;
    const adjustedTargetAmount = amountRequired * Math.pow(1 + inflationRate, yearsToGoal);
    const forecastedSalary = currentSalary * Math.pow(1 + annualIncrementRate, yearsToGoal);
    const isAchievable = forecastedSalary * 0.3 * yearsToGoal >= adjustedTargetAmount;

    
    if (priority === 1) {
      await prisma.lifeGoal.updateMany({
        where: { userId, priority: 1 },
        data: { priority: 2 },
      });
    }

    const goal = await prisma.lifeGoal.create({
      data: {
        userId,
        title,
        targetAmount,
        amountRequired,
        adjustedTargetAmount,
        yearsToGoal,
        category,
        currentSalary,
        annualIncrementRate,
        forecastedSalary,
        isAchievable,
        priority,
      },
    });

    return NextResponse.json({ success: true, data: goal }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      targetAmount,
      amountRequired,
      yearsToGoal,
      category,
      currentSalary,
      annualIncrementRate,
      title,
      priority,
      userId: requestUserId,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Goal ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (title) updateData.title = title;

    
    if (priority !== undefined) {
      if (priority < 1 || priority > 3) {
        return NextResponse.json({ success: false, message: 'Invalid priority' }, { status: 400 });
      }
      updateData.priority = priority;

      if (priority === 1 && requestUserId) {
        await prisma.lifeGoal.updateMany({
          where: { userId: requestUserId, priority: 1, NOT: { id } },
          data: { priority: 2 },
        });
      }
    }

   
    if (amountRequired && yearsToGoal && category && currentSalary && annualIncrementRate) {
      const inflationRate = inflationRates[category as CategoryType] || inflationRates.general;
      const adjustedTargetAmount = amountRequired * Math.pow(1 + inflationRate, yearsToGoal);
      const forecastedSalary = currentSalary * Math.pow(1 + annualIncrementRate, yearsToGoal);
      const isAchievable = forecastedSalary * 0.3 * yearsToGoal >= adjustedTargetAmount;

      Object.assign(updateData, {
        adjustedTargetAmount,
        forecastedSalary,
        isAchievable,
      });
    }

    const updatedGoal = await prisma.lifeGoal.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updatedGoal }, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update goal', error: error.message }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Goal ID is required' }, { status: 400 });
    }

    await prisma.lifeGoal.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Goal deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete goal', error: error.message }, { status: 500 });
  }
}
