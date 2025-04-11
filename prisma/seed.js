
// import 'dotenv/config';
// import { PrismaClient } from '@prisma/client';
// import { faker } from '@faker-js/faker';

// const prisma = new PrismaClient();

// async function main() {
//   const userId = "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N";

//   try {
//     // 1. Create/update user
//     await prisma.user.upsert({
//       where: { id: userId },
//       update: {},
//       create: {
//         id: userId,
//         email: faker.internet.email(),
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         profileImage: faker.image.avatar(),
//       },
//     });

//     // 2. Create/update financials (salary only exists here)
//     await prisma.financials.upsert({
//       where: { userId },
//       update: {
//         salary: faker.number.int({ min: 15000, max: 50000 }),
//         expenses: faker.number.int({ min: 5000, max: 10000 }),
//         extraExpenses: faker.number.int({ min: 2000, max: 5000 }),
//         insurancePremium: faker.number.int({ min: 500, max: 1000 }),
//       },
//       create: {
//         userId,
//         salary: faker.number.int({ min: 15000, max: 50000 }),
//         expenses: faker.number.int({ min: 5000, max: 10000 }),
//         extraExpenses: faker.number.int({ min: 2000, max: 5000 }),
//         insurancePremium: faker.number.int({ min: 500, max: 1000 }),
//       },
//     });

//     // 3. Clear existing debts
//     await prisma.debt.deleteMany({ where: { userId } });

//     // 4. Create sample debts
//     const debtCount = 3;
//     for (let i = 0; i < debtCount; i++) {
//       await prisma.debt.create({
//         data: {
//           userId,
//           loanAmount: faker.number.int({ min: 5000, max: 20000 }),
//           loanTenure: faker.number.int({ min: 1, max: 5 }),
//           interestRate: faker.number.float({ min: 5, max: 15, precision: 0.1 }),
//           emiAmount: faker.number.int({ min: 100, max: 500 }),
//         },
//       });
//     }

//     // 5. Create/update emergency fund (NO SALARY FIELD)
//     const fundValue = faker.number.float({ 
//       min: 10000, 
//       max: 50000, 
//       precision: 0.01 
//     });
//     const status = faker.helpers.arrayElement([
//       "secure", 
//       "in-progress", 
//       "at-risk"
//     ]);
    
//     await prisma.emergencyFund.upsert({
//       where: { userId },
//       update: { 
//         emergencyFund: fundValue,
//         status: status
//       },
//       create: {
//         userId,
//         emergencyFund: fundValue,
//         status: status
//       },
//     });

//     console.log("✅ Database seeded successfully!");
//   } catch (error) {
//     console.error("❌ Seeding error:", error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const userId = "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N";

  try {
    // Verify database connection first
    await prisma.$connect();
    console.log("🔌 Connected to database");

    // 1. Create/update user
    const user = await prisma.user.upsert({
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
    console.log(`👤 User upserted: ${user.email}`);

    // 2. Create/update financials
    const financials = await prisma.financials.upsert({
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
    console.log(`💰 Financials upserted with salary: ${financials.salary}`);

    // 3. Clear existing debts
    const deleteCount = await prisma.debt.deleteMany({ where: { userId } });
    console.log(`🧹 Deleted ${deleteCount.count} existing debts`);

    // 4. Create sample debts
    const debtCount = 3;
    const debts = [];
    for (let i = 0; i < debtCount; i++) {
      const debt = await prisma.debt.create({
        data: {
          userId,
          loanAmount: faker.number.int({ min: 5000, max: 20000 }),
          loanTenure: faker.number.int({ min: 1, max: 5 }),
          interestRate: faker.number.float({ min: 5, max: 15, precision: 0.1 }),
          emiAmount: faker.number.int({ min: 100, max: 500 }),
        },
      });
      debts.push(debt);
    }
    console.log(`🏦 Created ${debts.length} new debts`);

    // 5. Create/update emergency fund
    const fundValue = faker.number.float({ 
      min: 10000, 
      max: 50000, 
      precision: 0.01 
    });
    const status = faker.helpers.arrayElement(["secure", "in-progress", "at-risk"]);
    
    const emergencyFund = await prisma.emergencyFund.upsert({
      where: { userId },
      update: { 
        emergencyFund: fundValue,
        status: status
      },
      create: {
        userId,
        emergencyFund: fundValue,
        status: status
      },
    });
    console.log(`🛡️ Emergency fund set to ${emergencyFund.status} with $${emergencyFund.emergencyFund}`);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();