import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function userLoginPrisma(login: string) {
    if (!login) return null
    const user = await prisma.user.findFirst({
        where: { login },
    })
    return user
}


// получение пользователя из бд
async function userGetPrisma(id: string) {
    if (!id) return null
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }


export default {
    userLoginPrisma, userGetPrisma
}
