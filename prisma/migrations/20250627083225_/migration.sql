/*
  Warnings:

  - You are about to drop the column `adjustedTargetAmount` on the `LifeGoal` table. All the data in the column will be lost.
  - You are about to drop the column `amountRequired` on the `LifeGoal` table. All the data in the column will be lost.
  - You are about to drop the column `annualIncrementRate` on the `LifeGoal` table. All the data in the column will be lost.
  - You are about to drop the column `currentSalary` on the `LifeGoal` table. All the data in the column will be lost.
  - You are about to drop the column `forecastedSalary` on the `LifeGoal` table. All the data in the column will be lost.
  - You are about to drop the column `interestRate` on the `debt` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `emergencyFund` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LifeGoal" DROP COLUMN "adjustedTargetAmount",
DROP COLUMN "amountRequired",
DROP COLUMN "annualIncrementRate",
DROP COLUMN "currentSalary",
DROP COLUMN "forecastedSalary";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "debt" DROP COLUMN "interestRate";

-- AlterTable
ALTER TABLE "emergencyFund" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "financials" ADD COLUMN     "annualIncrementRate" DOUBLE PRECISION NOT NULL DEFAULT 0.05,
ADD COLUMN     "netWorth" DOUBLE PRECISION NOT NULL DEFAULT 0;
