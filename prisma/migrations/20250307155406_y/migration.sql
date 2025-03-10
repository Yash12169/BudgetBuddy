/*
  Warnings:

  - You are about to drop the `BasicFinancials` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "BasicFinancials";

-- CreateTable
CREATE TABLE "financials" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,
    "expenses" INTEGER NOT NULL,
    "extraExpenses" INTEGER NOT NULL,
    "insurancePremium" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debt" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "loanAmount" INTEGER NOT NULL,
    "loanTenure" INTEGER NOT NULL,
    "interestRate" INTEGER NOT NULL,
    "emiAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "debt_pkey" PRIMARY KEY ("id")
);
