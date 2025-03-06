-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicFinancials" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "expenses" INTEGER NOT NULL,
    "extraExpenses" INTEGER NOT NULL,
    "insurancePremium" INTEGER NOT NULL,
    "emi" INTEGER NOT NULL,

    CONSTRAINT "BasicFinancials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
