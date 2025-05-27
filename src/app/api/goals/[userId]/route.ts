
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

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    console.log('Fetching goals for userId:', userId);

    if (!userId) {
      console.log('No userId provided');
      return NextResponse.json(
        { success: false, message: 'Missing userId' },
        { status: 400 }
      );
    }

    console.log('Fetching goals for user...');
    const goals = await prisma.lifeGoal.findMany({
      where: { userId },
      orderBy: [
        { priority: 'asc' },
        { createdAt: 'desc' }
      ],
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

    console.log(`Found ${goals.length} goals for user`);

    return NextResponse.json(
      { 
        success: true,
        data: goals
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET error details:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      userId: params.userId
    });

    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to fetch goals',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 