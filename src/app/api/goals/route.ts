
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST': {
        const {
          userId, title, targetAmount, yearsToGoal,
          category, currentSalary, annualIncrementRate,
          priority = 3
        } = req.body;

        if (!userId || !title || !targetAmount || !yearsToGoal || !category || !currentSalary || !annualIncrementRate) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        if (priority < 1 || priority > 3) {
          return res.status(400).json({ error: 'Priority must be 1 (High), 2 (Medium), or 3 (Low)' });
        }

        
        const inflationRate = inflationRates[category as CategoryType] || inflationRates.general;
        const adjustedTargetAmount = targetAmount * Math.pow(1 + inflationRate, yearsToGoal);
        const projectedSalary = currentSalary * Math.pow(1 + annualIncrementRate, yearsToGoal);
        const isAchievable = (projectedSalary * 0.3 * yearsToGoal) >= adjustedTargetAmount;

        
        if (priority === 1) {
          await prisma.lifeGoal.updateMany({
            where: { userId, priority: 1 },
            data: { priority: 2 }
          });
        }

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
            priority
          }
        });

        return res.status(201).json(goal);
      }

      case 'GET': {
        const { userId, topGoals } = req.query;
        
        if (!userId || typeof userId !== 'string') {
          return res.status(400).json({ error: 'Missing or invalid userId' });
        }

        const where = { userId };
        const orderBy = [{ priority: 'asc' }, { createdAt: 'desc' }];
        
        const goals = await prisma.lifeGoal.findMany({
          where,
          orderBy,
          take: topGoals === 'true' ? 3 : undefined,
          ...(topGoals === 'true' && { where: { ...where, priority: 1 } })
        });

        return res.status(200).json(goals);
      }

      case 'PUT': {
        const {
          id, targetAmount, yearsToGoal, category,
          currentSalary, annualIncrementRate, title,
          priority
        } = req.body;

        if (!id) return res.status(400).json({ error: 'Goal ID is required' });

        const updateData: any = { title };
        if (priority) {
          if (priority < 1 || priority > 3) {
            return res.status(400).json({ error: 'Invalid priority value' });
          }
          updateData.priority = priority;

          if (priority === 1) {
            await prisma.lifeGoal.updateMany({
              where: { 
                userId: req.body.userId,
                priority: 1,
                NOT: { id }
              },
              data: { priority: 2 }
            });
          }
        }

        if (targetAmount && yearsToGoal && category && currentSalary && annualIncrementRate) {
          const inflationRate = inflationRates[category as CategoryType] || inflationRates.general;
          updateData.adjustedTargetAmount = targetAmount * Math.pow(1 + inflationRate, yearsToGoal);
          updateData.forecastedSalary = currentSalary * Math.pow(1 + annualIncrementRate, yearsToGoal);
          updateData.isAchievable = (updateData.forecastedSalary * 0.3 * yearsToGoal) >= updateData.adjustedTargetAmount;
        }

        const updatedGoal = await prisma.lifeGoal.update({
          where: { id },
          data: updateData
        });

        return res.status(200).json(updatedGoal);
      }

      case 'DELETE': {
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: 'Goal ID is required' });
        
        await prisma.lifeGoal.delete({ where: { id } });
        return res.status(200).json({ message: 'Goal deleted successfully' });
      }

      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}