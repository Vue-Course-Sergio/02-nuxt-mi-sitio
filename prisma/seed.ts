import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { prisma } from "../server/utils/db";
import { PrismaClient } from "./generated/client";
import { siteReviews } from "./seed/site-reviews";
import { products } from "./seed/products";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.siteReview.deleteMany();

  await prisma.siteReview.createMany({
    data: siteReviews,
  });

  await prisma.product.createMany({
    data: products,
  });
}

seed()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
