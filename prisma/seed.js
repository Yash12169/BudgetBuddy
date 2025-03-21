const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

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
    await prisma.financials.create({
      data:{
        id: "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N",
        userId:"user_2uGEVCVsBBTBRsEZzNWCMsb5r3N",
        salary: faker.number.int({min: 15000,max: 50000}),
        expenses: faker.number.int({min: 5000,max: 10000}),
        extraExpenses: faker.number.int({min: 2000,max: 5000}),
        insurancePremium: faker.number.int({min: 500,max: 1000})

      }
    })
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });