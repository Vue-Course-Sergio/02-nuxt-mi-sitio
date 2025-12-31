export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  await new Promise((resolve) => setTimeout(resolve, 2500));

  if (!product)
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
      message: `No product found with slug: ${slug}`,
      data: {
        slug,
        state: process.env.STAGE,
      },
      stack: process.env.STAGE !== "prod" ? new Error().stack : "",
    });

  const suggestions = await prisma.product.findMany({
    where: {
      tags: { hasSome: product.tags },
      NOT: { id: product.id },
    },
    take: 3,
  });

  return suggestions;
});
