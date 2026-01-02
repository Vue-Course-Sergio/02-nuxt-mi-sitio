export const useAdminProduct = async (id: string) => {
  const { data, error, status, execute, refresh, pending } = await useFetch(
    `/api/admin/product/${id}`
  );

  const createOrUpdate = async (data: Partial<Product>, files?: File[]) => {
    const isCreating = data.id === 0;
    const formData = new FormData();

    //? form-multipart y manejo de ficheros

    formData.append("data", JSON.stringify(data));

    if (isCreating) {
      const { product } = await $fetch("/api/admin/product", {
        method: "POST",
        body: data,
      });
      return product;
    }

    try {
      const { product } = await $fetch(`/api/admin/product/${id}`, {
        method: "PATCH",
        body: formData,
      });

      return product;
    } catch (error) {
      throw createError({
        statusCode: 400,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return {
    data,
    error,
    status,
    pending,
    createOrUpdate,
    execute,
    refresh,
  };
};
