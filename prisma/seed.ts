import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { PrismaClient } from "./generated/client";
import { productReviews } from "./seed/product-reviews";
import { products } from "./seed/products";
import { siteReviews } from "./seed/site-reviews";
import { users } from "./seed/users";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.siteReview.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productReview.deleteMany();
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

  const productsCreated = await prisma.product.findMany();
  const usersCreated = await prisma.user.findMany();

  const productsReviewsCreated = productReviews.map((review) => ({
    rating: review.rating,
    review: review.review,
    userTitle: review.userTitle,
    username: review.name,
    productId: productsCreated[Math.floor(Math.random() * products.length)].id,
    userId: usersCreated[Math.floor(Math.random() * users.length)].id,
  }));

  await prisma.productReview.createMany({
    data: productsReviewsCreated,
  });
}

seed()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
