import z from "zod";

interface IFileData {
  name: string;
  type: string;
  data: Buffer;
}

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
  const files: IFileData[] = [];

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

    if (part.name === "files" && part.filename) {
      files.push({
        name: part.filename,
        type: part.type || "application/octet-stream",
        data: part.data,
      });
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

  if (files.length > 0) {
    const uploadFiles = await Promise.all(
      files.map(async (file) => {
        const url = await fileUpload(file.data);
        return url;
      })
    );

    body.data.images = body.data.images.concat(uploadFiles);
  }

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: body.data,
  });

  return {
    message: "Product updated successfully",
    product: updatedProduct,
  };
});
