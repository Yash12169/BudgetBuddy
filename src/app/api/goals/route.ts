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
type MissingField = 'userId' | 'title' | 'targetAmount' | 'yearsToGoal' | 'category';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      title,
      targetAmount,
      yearsToGoal,
      category,
      priority = 3,
    } = body;

    // Validate required fields
    const missingFields: MissingField[] = [];
    if (!userId) missingFields.push('userId');
    if (!title) missingFields.push('title');
    if (!targetAmount) missingFields.push('targetAmount');
    if (!yearsToGoal) missingFields.push('yearsToGoal');
    if (!category) missingFields.push('category');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Get financial data to calculate achievability
    const financials = await prisma.financials.findUnique({
      where: { userId }
    });

    if (!financials) {
      return NextResponse.json(
        { success: false, message: 'Financial data not found. Please complete your financial checkup first.' },
        { status: 400 }
      );
    }

    const currentSalary = financials.salary;
    const annualIncrementRate = financials.annualIncrementRate;
    const inflationRate = inflationRates[category as CategoryType] || inflationRates.general;
    const adjustedTargetAmount = targetAmount * Math.pow(1 + inflationRate, yearsToGoal);
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
        targetAmount: Number(targetAmount),
        yearsToGoal: Number(yearsToGoal),
        category,
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
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create goal', error: (error as Error).message },
      { status: 500 }
    );
  }
}

interface UpdateData {
  title?: string;
  targetAmount?: number;
  yearsToGoal?: number;
  category?: string;
  userId?: string;
  priority?: number;
  isAchievable?: boolean;
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      targetAmount,
      yearsToGoal,
      category,
      priority,
      userId,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Goal ID is required' },
        { status: 400 }
      );
    }

    const existingGoal = await prisma.lifeGoal.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!existingGoal) {
      return NextResponse.json(
        { success: false, message: 'Goal not found' },
        { status: 404 }
      );
    }

    
    if (userId && userId !== existingGoal.userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return NextResponse.json(
          { success: false, message: 'New user not found' },
          { status: 404 }
        );
      }
    }

    const updateData: UpdateData = {};
    if (title !== undefined) updateData.title = title;
    if (targetAmount !== undefined) updateData.targetAmount = Number(targetAmount);
    if (yearsToGoal !== undefined) updateData.yearsToGoal = Number(yearsToGoal);
    if (category !== undefined) updateData.category = category;
    if (userId !== undefined) updateData.userId = userId;

    if (priority !== undefined) {
      if (priority < 1 || priority > 3) {
        return NextResponse.json(
          { success: false, message: 'Priority must be between 1 and 3' },
          { status: 400 }
        );
      }
      updateData.priority = priority;
    }

    // Recalculate isAchievable if relevant fields are updated
    if (targetAmount !== undefined || yearsToGoal !== undefined || category !== undefined) {
      const currentTargetAmount = targetAmount !== undefined ? targetAmount : existingGoal.targetAmount;
      const currentYearsToGoal = yearsToGoal !== undefined ? yearsToGoal : existingGoal.yearsToGoal;
      const currentCategory = category !== undefined ? category : existingGoal.category;

      // Get current salary and annual increment rate from financials
      const financials = await prisma.financials.findUnique({
        where: { userId: existingGoal.userId }
      });

      if (financials) {
        const currentSalary = financials.salary;
        const annualIncrementRate = financials.annualIncrementRate;
        const inflationRate = inflationRates[currentCategory as CategoryType] || inflationRates.general;
        const adjustedTargetAmount = currentTargetAmount * Math.pow(1 + inflationRate, currentYearsToGoal);
        const forecastedSalary = currentSalary * Math.pow(1 + annualIncrementRate, currentYearsToGoal);
        updateData.isAchievable = forecastedSalary * 0.3 * currentYearsToGoal >= adjustedTargetAmount;
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

    return NextResponse.json({ success: true, data: updatedGoal });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update goal', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Goal ID is required' },
        { status: 400 }
      );
    }

    const existingGoal = await prisma.lifeGoal.findUnique({
      where: { id }
    });

    if (!existingGoal) {
      return NextResponse.json(
        { success: false, message: 'Goal not found' },
        { status: 404 }
      );
    }

    await prisma.lifeGoal.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete goal', error: (error as Error).message },
      { status: 500 }
    );
  }
}