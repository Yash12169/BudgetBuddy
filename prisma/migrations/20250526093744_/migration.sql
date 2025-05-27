/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `debt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "debt_userId_key" ON "debt"("userId");
