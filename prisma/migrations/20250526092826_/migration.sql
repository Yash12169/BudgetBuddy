/*
  Warnings:

  - The primary key for the `debt` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "debt" DROP CONSTRAINT "debt_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "debt_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "debt_id_seq";
