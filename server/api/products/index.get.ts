export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let limit = parseInt(query.limit as string);
  let offset = parseInt(query.offset as string);

  if (isNaN(limit) || limit <= 1) limit = 10;
  if (isNaN(offset) || offset < 0) offset = 0;

  const products = await prisma.product.findMany({
    take: limit,
    skip: offset,
  });

  const total = await prisma.product.count();
  const totalPages = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;

  return {
    products,
    totalPages,
    currentPage,
    perPage: limit,
    total,
  };
});
