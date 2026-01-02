export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (id === "new") {
    return {
      id: 0,
      slug: "",
      name: "",
      description: "",
      price: 0,
      images: [],
      tags: [],
    } as unknown as Product;
  }

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
