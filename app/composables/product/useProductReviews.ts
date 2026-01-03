export const useProductReviews = async (slug: string) => {
  const { data, error, status, pending, clear, execute, refresh } =
    await useFetch(`/api/product/${slug}/reviews`);

  return {
    data,
    error,
    status,
    pending,
    clear,
    execute,
    refresh,
  };
};
