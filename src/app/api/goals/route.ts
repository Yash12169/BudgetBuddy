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
type MissingField = 'userId' | 'title' | 'targetAmount' | 'amountRequired' | 'yearsToGoal' | 'category' | 'currentSalary' | 'annualIncrementRate';

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

    const missingFields: MissingField[] = [];
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
        { success: false, message: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
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
  amountRequired?: number;
  yearsToGoal?: number;
  category?: string;
  currentSalary?: number;
  annualIncrementRate?: number;
  userId?: string;
  priority?: number;
  adjustedTargetAmount?: number;
  forecastedSalary?: number;
  isAchievable?: boolean;
}

export async function PUT(req: NextRequest) {
  try {
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
    if (amountRequired !== undefined) updateData.amountRequired = Number(amountRequired);
    if (yearsToGoal !== undefined) updateData.yearsToGoal = Number(yearsToGoal);
    if (category !== undefined) updateData.category = category;
    if (currentSalary !== undefined) updateData.currentSalary = Number(currentSalary);
    if (annualIncrementRate !== undefined) updateData.annualIncrementRate = Number(annualIncrementRate);
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

    
    if (amountRequired !== undefined && yearsToGoal !== undefined && category !== undefined) {
      const inflationRate = inflationRates[category as CategoryType] || inflationRates.general;
      updateData.adjustedTargetAmount = updateData.amountRequired! * Math.pow(1 + inflationRate, updateData.yearsToGoal!);
      
      if (currentSalary !== undefined && annualIncrementRate !== undefined) {
        updateData.forecastedSalary = updateData.currentSalary! * Math.pow(1 + Number(updateData.annualIncrementRate), updateData.yearsToGoal!);
        updateData.isAchievable = updateData.forecastedSalary! * 0.3 * updateData.yearsToGoal! >= updateData.adjustedTargetAmount!;
      }
    }

    
    if (priority === 1 && userId) {
      await prisma.lifeGoal.updateMany({
        where: {
          userId,
          priority: 1,
          NOT: { id },
        },
        data: { priority: 2 },
      });
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

    return NextResponse.json(
      { success: true, message: 'Goal deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete goal', error: (error as Error).message },
      { status: 500 }
    );
  }
}