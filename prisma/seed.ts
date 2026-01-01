import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "./generated/client";
import { products } from "./seed/products";
import { siteReviews } from "./seed/site-reviews";
import { users } from "./seed/users";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.siteReview.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Hash user passwords before seeding
  const usersWithHashedPassword = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
  }));

  await prisma.siteReview.createMany({
    data: siteReviews,
  });

  await prisma.product.createMany({
    data: products,
  });

  await prisma.user.createMany({
    data: usersWithHashedPassword,
  });
}

seed()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
