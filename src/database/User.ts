import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const UserDb = async () =>
{
   const _fady = await prisma.user.create({ data: { first_name: "fady" } });
   const _magy = await prisma.user.create({ data: { first_name: "magy" } });
   const users = await prisma.user.findMany();
   console.log(users);
};
