/*
  Warnings:

  - You are about to drop the column `amount` on the `emergencyFund` table. All the data in the column will be lost.
  - Added the required column `emergencyFund` to the `emergencyFund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emergencyFund" DROP COLUMN "amount",
ADD COLUMN     "emergencyFund" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "LifeGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "adjustedTargetAmount" DOUBLE PRECISION NOT NULL,
    "yearsToGoal" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "currentSalary" DOUBLE PRECISION NOT NULL,
    "annualIncrementRate" DOUBLE PRECISION NOT NULL,
    "forecastedSalary" DOUBLE PRECISION NOT NULL,
    "isAchievable" BOOLEAN NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LifeGoal_pkey" PRIMARY KEY ("id")
);
