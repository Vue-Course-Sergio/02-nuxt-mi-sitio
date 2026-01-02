import z from "zod";

const bodySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string()).min(0),
  tags: z.array(z.string()).min(0),
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No data provided",
    });
  }

  let dataString = "";

  for (const part of formData) {
    if (part.name === "data" && part.data) {
      dataString = part.data.toString("utf-8");
    }
  }

  const body = bodySchema.safeParse(JSON.parse(dataString));

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data format",
      data: body.error,
    });
  }

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: body.data,
  });

  return {
    message: "Product updated successfully",
    product: updatedProduct,
    files: [],
  };
});
