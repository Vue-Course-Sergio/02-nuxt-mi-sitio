export const usePaginatedProducts = async () => {
  const { data, error, status, execute, pending } = await useFetch(
    "/api/products"
  );

  return {
    products: computed(() => data.value?.products || []),
    totalPages: computed(() => data.value?.totalPages || 0),
    currentPage: computed(() => data.value?.currentPage || 1),
    perPage: computed(() => data.value?.perPage || 10),
    total: computed(() => data.value?.total || 0),
    //Actions
    error,
    status,
    execute,
    pending,
  };
};
