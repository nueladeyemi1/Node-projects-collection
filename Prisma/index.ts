import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  //Prisma Queries
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@example2.com',
  //   },
  // })

  // const users = await prisma.user.findMany()

  // console.log(users)

  const article = await prisma.article.create({
    data: {
      title: 'Amazing Article',
      content: 'This is an amazing article about...',
      author: {
        connect: {
          id: 1,
        },
      },
    },
  })

  console.log(article)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
