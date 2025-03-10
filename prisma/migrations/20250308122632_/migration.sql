/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `debt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `financials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "emergencyFund" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergencyFund_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emergencyFund_userId_key" ON "emergencyFund"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "debt_userId_key" ON "debt"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "financials_userId_key" ON "financials"("userId");

-- AddForeignKey
ALTER TABLE "financials" ADD CONSTRAINT "financials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debt" ADD CONSTRAINT "debt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergencyFund" ADD CONSTRAINT "emergencyFund_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
