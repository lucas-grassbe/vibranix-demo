import "dotenv/config";
import { PrismaClient } from "../../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../../server/utils/hash";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME

  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing) {
    await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } })
    console.log(`User "${email}" updated to ADMIN.`)
  } else {
    const passwordHash = await hashPassword(password)
    await prisma.user.create({ data: { email, passwordHash, name, role: 'ADMIN' } })
    console.log(`Admin "${email}" created.`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
