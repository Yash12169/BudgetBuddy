import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const inflationRates = {
  realEstate: 0.06,
  automobile: 0.04,
  education: 0.05,
  general: 0.03,
} as const;

type CategoryType = keyof typeof inflationRates;

interface GoalInput {
  userId: string;
  title: string;
  targetAmount: number;
  yearsToGoal: number;
  category: CategoryType;
  currentSalary: number;
  annualIncrementRate: number;
  priority?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']);
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'POST': {
        const {
          userId,
          title,
          targetAmount,
          yearsToGoal,
          category,
          currentSalary,
          annualIncrementRate,
          priority = 3,
        } = req.body as GoalInput;

        // Validation
        const missingFields = [];
        if (!userId) missingFields.push('userId');
        if (!title) missingFields.push('title');
        if (!targetAmount) missingFields.push('targetAmount');
        if (!yearsToGoal) missingFields.push('yearsToGoal');
        if (!category) missingFields.push('category');
        if (!currentSalary) missingFields.push('currentSalary');
        if (!annualIncrementRate) missingFields.push('annualIncrementRate');

        if (missingFields.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields',
            missingFields,
          });
        }

        if (priority < 1 || priority > 3) {
          return res.status(400).json({
            success: false,
            message: 'Priority must be 1 (High), 2 (Medium), or 3 (Low)',
          });
        }

        // Calculations
        const inflationRate = inflationRates[category] || inflationRates.general;
        const adjustedTargetAmount = targetAmount * Math.pow(1 + inflationRate, yearsToGoal);
        const projectedSalary = currentSalary * Math.pow(1 + annualIncrementRate, yearsToGoal);
        const isAchievable = (projectedSalary * 0.3 * yearsToGoal) >= adjustedTargetAmount;

        // Handle priority reshuffle
        if (priority === 1) {
          await prisma.lifeGoal.updateMany({
            where: { userId, priority: 1 },
            data: { priority: 2 },
          });
        }

        // Create new goal
        const goal = await prisma.lifeGoal.create({
          data: {
            userId,
            title,
            targetAmount,
            adjustedTargetAmount,
            yearsToGoal,
            category,
            currentSalary,
            annualIncrementRate,
            forecastedSalary: projectedSalary,
            isAchievable,
            priority,
          },
        });

        return res.status(201).json({
          success: true,
          data: goal,
        });
      }

      case 'GET': {
        const { userId, topGoals } = req.query;

        if (!userId || typeof userId !== 'string') {
          return res.status(400).json({
            success: false,
            message: 'Missing or invalid userId',
          });
        }

        try {
          const where = { userId };
          const orderBy = [
            { priority: 'asc' as const },
            { createdAt: 'desc' as const },
          ];

          const goals = await prisma.lifeGoal.findMany({
            where,
            orderBy,
            take: topGoals === 'true' ? 3 : undefined,
            ...(topGoals === 'true' ? { where: { ...where, priority: 1 } } : {}),
          });

          return res.status(200).json({
            success: true,
            data: goals,
          });
        } catch (error) {
          console.error('GET Error:', error);
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch goals',
          });
        }
      }

      case 'PUT': {
        const {
          id,
          targetAmount,
          yearsToGoal,
          category,
          currentSalary,
          annualIncrementRate,
          title,
          priority,
          userId: requestUserId,
        } = req.body;

        if (!id) {
          return res.status(400).json({
            success: false,
            message: 'Goal ID is required',
          });
        }

        const updateData: {
          title?: string;
          priority?: number;
          adjustedTargetAmount?: number;
          forecastedSalary?: number;
          isAchievable?: boolean;
        } = {};

        if (title) updateData.title = title;

        // Priority handling
        if (priority !== undefined) {
          if (priority < 1 || priority > 3) {
            return res.status(400).json({
              success: false,
              message: 'Priority must be 1 (High), 2 (Medium), or 3 (Low)',
            });
          }
          updateData.priority = priority;

          if (priority === 1 && requestUserId) {
            await prisma.lifeGoal.updateMany({
              where: {
                userId: requestUserId,
                priority: 1,
                NOT: { id },
              },
              data: { priority: 2 },
            });
          }
        }

        // Full recalculation if financial fields are provided
        if (
          targetAmount &&
          yearsToGoal &&
          category &&
          currentSalary &&
          annualIncrementRate
        ) {
          const inflationRate =
            inflationRates[category as CategoryType] || inflationRates.general;
          updateData.adjustedTargetAmount =
            targetAmount * Math.pow(1 + inflationRate, yearsToGoal);
          updateData.forecastedSalary =
            currentSalary * Math.pow(1 + annualIncrementRate, yearsToGoal);
          updateData.isAchievable =
            (updateData.forecastedSalary * 0.3 * yearsToGoal) >=
            updateData.adjustedTargetAmount;
        }

        const updatedGoal = await prisma.lifeGoal.update({
          where: { id },
          data: updateData,
        });

        return res.status(200).json({
          success: true,
          data: updatedGoal,
        });
      }

      case 'DELETE': {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({
            success: false,
            message: 'Goal ID is required',
          });
        }

        await prisma.lifeGoal.delete({ where: { id } });

        return res.status(200).json({
          success: true,
          message: 'Goal deleted successfully',
        });
      }

      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']);
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
