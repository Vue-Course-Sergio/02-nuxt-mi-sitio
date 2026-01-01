export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
      message: `No product found with id: ${id}`,
      data: {
        id,
        state: process.env.STAGE,
      },
      stack: process.env.STAGE !== "prod" ? new Error().stack : "",
    });
  }

  return product;
});
