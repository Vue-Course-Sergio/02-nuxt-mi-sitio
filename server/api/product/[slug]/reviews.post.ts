import z from "zod";

const bodySchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string(),
  userTitle: z.string(),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const slug = getRouterParam(event, "slug");

  const session = await requireUserSession(event);
  const userId = session.user.id;

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const existingReview = await prisma.productReview.findFirst({
    where: {
      productId: product.id,
      userId: Number(userId),
    },
  });

  if (existingReview) {
    throw createError({
      statusCode: 400,
      statusMessage: "You have already reviewed this product",
    });
  }

  const review = await prisma.productReview.create({
    data: {
      ...body,
      username: session.user.name,
      productId: product.id,
      userId: Number(userId),
    },
  });

  return review;
});
