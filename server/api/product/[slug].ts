export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const product = await prisma.product.findUnique({
    where: { slug },
  });

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

  return product;
});
