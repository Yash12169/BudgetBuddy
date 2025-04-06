/*
  Warnings:

  - You are about to drop the column `amount` on the `emergencyFund` table. All the data in the column will be lost.
  - Added the required column `emergencyFund` to the `emergencyFund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
--ALTER TABLE "emergencyFund" DROP COLUMN "amount",
--ADD COLUMN     "emergencyFund" DOUBLE PRECISION NOT NULL;
ALTER TABLE "emergencyFund"
ADD COLUMN "emergencyFund" DOUBLE PRECISION NOT NULL;
