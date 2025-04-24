
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // for (let i = 0; i < 50; i++) {
    // const id = faker.string.uuid()
    // await prisma.user.create({
    //   data: {
    //     id,
    //     email: faker.internet.email(),
    //     firstName: faker.person.firstName(),
    //     lastName: faker.person.lastName(),
    //     password: faker.internet.password(),
    //   },
    // });
    // await prisma.financials.create({
    //   data:{
    //     id: "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N",
    //     userId:"user_2uGEVCVsBBTBRsEZzNWCMsb5r3N",
    //     salary: faker.number.int({min: 15000,max: 50000}),
    //     expenses: faker.number.int({min: 5000,max: 10000}),
    //     extraExpenses: faker.number.int({min: 2000,max: 5000}),
    //     insurancePremium: faker.number.int({min: 500,max: 1000})

    //   }
    // })
  // }



  // await prisma.emergencyFund.create({
  //   data:{
  //     id: "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N",
  //     userId:"user_2uGEVCVsBBTBRsEZzNWCMsb5r3N",
  //     emergencyFund: faker.number.int({min: 19000,max:120000}),
  //   }
  // })
  const loanAmount = faker.number.int({ min: 100000, max: 1000000 });
  const loanTenure = faker.number.int({ min: 1, max: 10 }); // in years
  const interestRate = faker.number.float({ min: 8, max: 10 }); // annual interest rate in %
  
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenure * 12;
  
  const emiAmount = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  
  await prisma.debt.create({
    data: {
      id: "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N",
      userId: "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N",
      loanAmount,
      loanTenure,
      interestRate,
      emiAmount,
    }
  });
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
