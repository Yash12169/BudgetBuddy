
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const userId = "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N";

  // 1. Upsert the user
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      profileImage: faker.image.avatar(),
    },
  });

  // 2. Upsert financials (since userId is unique)
  await prisma.financials.upsert({
    where: { userId },
    update: {
      salary: faker.number.int({ min: 15000, max: 50000 }),
      expenses: faker.number.int({ min: 5000, max: 10000 }),
      extraExpenses: faker.number.int({ min: 2000, max: 5000 }),
      insurancePremium: faker.number.int({ min: 500, max: 1000 }),
    },
    create: {
      userId,
      salary: faker.number.int({ min: 15000, max: 50000 }),
      expenses: faker.number.int({ min: 5000, max: 10000 }),
      extraExpenses: faker.number.int({ min: 2000, max: 5000 }),
      insurancePremium: faker.number.int({ min: 500, max: 1000 }),
    },
  });

  // 3. Delete any existing debts for this user
  await prisma.debt.deleteMany({ where: { userId } });

  // 4. Create multiple new debts for this user
  const debtCount = 3;
  for (let i = 0; i < debtCount; i++) {
    await prisma.debt.create({
      data: {
        userId,
        loanAmount: faker.number.int({ min: 5000, max: 20000 }),
        loanTenure: faker.number.int({ min: 1, max: 5 }),
        interestRate: faker.number.float({ min: 5, max: 15, precision: 0.1 }),
        emiAmount: faker.number.int({ min: 100, max: 500 }),
      },
    });
  }

  // 5. Upsert emergency fund
  await prisma.emergencyFund.upsert({
    where: { userId},
    update: { emergencyFund: 50000, salary: 15000, status: "secure" },
    create: {
      userId,
      emergencyFund: 50000,
      salary: 15000,
      status: "secure",
    },
  });
  
  console.log("🌱 Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
