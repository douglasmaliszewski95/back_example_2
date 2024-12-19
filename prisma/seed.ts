import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.findMany();
  if (users.length === 0) {
    await prisma.users.createMany({
      data: [
        {
          userId: '978277a2-f460-45d5-ba9d-dc337e1f2fbc',
          collaboratorId: 1,
          name: 'Admin',
          userGroupName: 'Admin',
          login: 'user',
          nationalIdCard2: '12345678910',
          email: 'joao.batista@lighthouseit.com.br',
          enabled: true,
          fieldTeam: false,
          birthDate: new Date('02-04-1981'),
          password: '$2a$12$NJU4GXcyascfs3ZEIU2cHu7Sv8rvXdmNnp8TdkTZLnFuxTWdyIQSu',
          updatedPassword: '',
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
