import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            login: 'username',
            password: '123456789'
        }

    })
    await prisma.note.create({
        data: {
            top: '.',
            bottom: '.'
        }
    })
    await prisma.seo.create({
        data: {
            name: 'Метрология',
            title: 'Метрология',
            description: 'О метрологии',
            keyword: "Метрология метрология метрология"
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        // process.exit(1)
    })
