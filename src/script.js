const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
    const allLinks = await prisma.link.findMany()
    const newLink = await prisma.link.create({
        data: {
            description: 'AFAAF tutorial for GQL',
            url: 'www.fw.com',
        },
    });
    console.log(newLink)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })