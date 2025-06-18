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

interface GoalUpdateData {
  title?: string;
  targetAmount?: number;
  amountRequired?: number;
  yearsToGoal?: number;
  category?: string;
  currentSalary?: number;
  annualIncrementRate?: number;
  priority?: number;
  adjustedTargetAmount?: number;
  forecastedSalary?: number;
  isAchievable?: boolean;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
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
  } catch (error: unknown) {
    console.error('GET error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: 'Failed to fetch goals', error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const body = await req.json();
    const {
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
    if (!title) missingFields.push('title');
    if (!targetAmount) missingFields.push('targetAmount');
    if (!amountRequired) missingFields.push('amountRequired');
    if (!yearsToGoal) missingFields.push('yearsToGoal');
    if (!category) missingFields.push('category');
    if (!currentSalary) missingFields.push('currentSalary');
    if (!annualIncrementRate) missingFields.push('annualIncrementRate');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    if (priority < 1 || priority > 3) {
      return NextResponse.json(
        { success: false, message: 'Priority must be between 1 and 3' },
        { status: 400 }
      );
    }

    const inflationRate = inflationRates[category as CategoryType] || inflationRates.general;
    const adjustedTargetAmount = amountRequired * Math.pow(1 + inflationRate, yearsToGoal);
    const forecastedSalary = currentSalary * Math.pow(1 + Number(annualIncrementRate), yearsToGoal);
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
        targetAmount: Number(targetAmount),
        amountRequired: Number(amountRequired),
        adjustedTargetAmount,
        yearsToGoal: Number(yearsToGoal),
        category,
        currentSalary: Number(currentSalary),
        annualIncrementRate: Number(annualIncrementRate),
        forecastedSalary,
        isAchievable,
        priority,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, data: goal }, { status: 201 });
  } catch (error: unknown) {
    console.error('POST error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: 'Failed to create goal', error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const body = await req.json();
    const {
      id,
      title,
      targetAmount,
      amountRequired,
      yearsToGoal,
      category,
      currentSalary,
      annualIncrementRate,
      priority,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Goal ID is required' },
        { status: 400 }
      );
    }

    const existingGoal = await prisma.lifeGoal.findFirst({
      where: { id, userId },
    });

    if (!existingGoal) {
      return NextResponse.json(
        { success: false, message: 'Goal not found or unauthorized' },
        { status: 404 }
      );
    }

    const updateData: GoalUpdateData = {};
    if (title !== undefined) updateData.title = title;
    if (targetAmount !== undefined) updateData.targetAmount = Number(targetAmount);
    if (amountRequired !== undefined) updateData.amountRequired = Number(amountRequired);
    if (yearsToGoal !== undefined) updateData.yearsToGoal = Number(yearsToGoal);
    if (category !== undefined) updateData.category = category;
    if (currentSalary !== undefined) updateData.currentSalary = Number(currentSalary);
    if (annualIncrementRate !== undefined) updateData.annualIncrementRate = Number(annualIncrementRate);

    if (priority !== undefined) {
      if (priority < 1 || priority > 3) {
        return NextResponse.json(
          { success: false, message: 'Priority must be between 1 and 3' },
          { status: 400 }
        );
      }
      updateData.priority = priority;

      if (priority === 1) {
        await prisma.lifeGoal.updateMany({
          where: { userId, priority: 1, NOT: { id } },
          data: { priority: 2 },
        });
      }
    }

    if (amountRequired !== undefined && yearsToGoal !== undefined && category !== undefined) {
      const inflationRate = inflationRates[category as CategoryType] || inflationRates.general;
      const amountRequiredNum = Number(amountRequired);
      const yearsToGoalNum = Number(yearsToGoal);
      updateData.adjustedTargetAmount = amountRequiredNum * Math.pow(1 + inflationRate, yearsToGoalNum);
      
      if (currentSalary !== undefined && annualIncrementRate !== undefined) {
        const currentSalaryNum = Number(currentSalary);
        const annualIncrementRateNum = Number(annualIncrementRate);
        updateData.forecastedSalary = currentSalaryNum * Math.pow(1 + annualIncrementRateNum, yearsToGoalNum);
        updateData.isAchievable = updateData.forecastedSalary * 0.3 * yearsToGoalNum >= updateData.adjustedTargetAmount;
      }
    }

    const updatedGoal = await prisma.lifeGoal.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, data: updatedGoal }, { status: 200 });
  } catch (error: unknown) {
    console.error('PUT error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: 'Failed to update goal', error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Goal ID is required' },
        { status: 400 }
      );
    }

    const existingGoal = await prisma.lifeGoal.findFirst({
      where: { id, userId },
    });

    if (!existingGoal) {
      return NextResponse.json(
        { success: false, message: 'Goal not found or unauthorized' },
        { status: 404 }
      );
    }

    await prisma.lifeGoal.delete({
      where: { id }
    });

    return NextResponse.json(
      { success: true, message: 'Goal deleted successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('DELETE error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: 'Failed to delete goal', error: errorMessage },
      { status: 500 }
    );
  }
} 