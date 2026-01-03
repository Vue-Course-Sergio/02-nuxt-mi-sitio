export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  const slug = getRouterParam(event, "slug");
  const userId = session.user?.id;

  const reviews = await prisma.productReview.findMany({
    where: { product: { slug: slug } },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const hasUserReviewed = await prisma.productReview.findFirst({
    where: {
      product: { slug: slug },
      userId: Number(userId),
    },
  });

  return {
    reviews,
    hasUserReviewed: !!hasUserReviewed,
  };
});
