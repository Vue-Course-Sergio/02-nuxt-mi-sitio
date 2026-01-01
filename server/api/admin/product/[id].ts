export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const session = await requireUserSession(event);

  const hasAdminRole = session.user.roles.includes("admin");

  if (!hasAdminRole) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "You do not have permission to access this resource.",
    });
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
