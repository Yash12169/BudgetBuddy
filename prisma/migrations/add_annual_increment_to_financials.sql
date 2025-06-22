-- Add annualIncrementRate to financials table
ALTER TABLE "financials" ADD COLUMN "annualIncrementRate" DOUBLE PRECISION NOT NULL DEFAULT 0.05;

-- Remove annualIncrementRate from LifeGoal table
ALTER TABLE "LifeGoal" DROP COLUMN "annualIncrementRate"; 