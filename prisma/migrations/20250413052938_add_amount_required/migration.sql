/*
  Warnings:

  - Added the required column `amountRequired` to the `LifeGoal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LifeGoal" ADD COLUMN     "amountRequired" DOUBLE PRECISION NOT NULL;
