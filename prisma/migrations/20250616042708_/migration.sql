-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financials" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "salary" INTEGER NOT NULL DEFAULT 0,
    "expenses" INTEGER NOT NULL DEFAULT 0,
    "extraExpenses" INTEGER NOT NULL DEFAULT 0,
    "insurancePremium" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "loanAmount" INTEGER NOT NULL DEFAULT 0,
    "loanTenure" INTEGER NOT NULL DEFAULT 0,
    "interestRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "emiAmount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergencyFund" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emergencyFund" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergencyFund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifeGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "adjustedTargetAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "amountRequired" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "yearsToGoal" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "currentSalary" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "annualIncrementRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "forecastedSalary" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isAchievable" BOOLEAN NOT NULL DEFAULT false,
    "priority" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LifeGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "financials_userId_key" ON "financials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "debt_userId_key" ON "debt"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "emergencyFund_userId_key" ON "emergencyFund"("userId");

-- CreateIndex
CREATE INDEX "LifeGoal_userId_idx" ON "LifeGoal"("userId");

-- CreateIndex
CREATE INDEX "LifeGoal_priority_idx" ON "LifeGoal"("priority");

-- AddForeignKey
ALTER TABLE "financials" ADD CONSTRAINT "financials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debt" ADD CONSTRAINT "debt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergencyFund" ADD CONSTRAINT "emergencyFund_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifeGoal" ADD CONSTRAINT "LifeGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
