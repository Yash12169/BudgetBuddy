/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `debt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `emergencyFund` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `financials` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "debt" DROP CONSTRAINT "debt_userId_fkey";

-- DropForeignKey
ALTER TABLE "emergencyFund" DROP CONSTRAINT "emergencyFund_userId_fkey";

-- DropForeignKey
ALTER TABLE "financials" DROP CONSTRAINT "financials_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "debt" DROP CONSTRAINT "debt_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "debt_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "debt_id_seq";

-- AlterTable
ALTER TABLE "emergencyFund" DROP CONSTRAINT "emergencyFund_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "emergencyFund_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "emergencyFund_id_seq";

-- AlterTable
ALTER TABLE "financials" DROP CONSTRAINT "financials_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "financials_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "financials_id_seq";

-- AddForeignKey
ALTER TABLE "financials" ADD CONSTRAINT "financials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debt" ADD CONSTRAINT "debt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergencyFund" ADD CONSTRAINT "emergencyFund_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
