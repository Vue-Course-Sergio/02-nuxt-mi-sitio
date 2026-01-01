export const useAdminProduct = async (id: string) => {
  const { data, error, status, execute, refresh, pending } = await useFetch(
    `/api/admin/product/${id}`
  );

  const createOrUpdate = (data: Partial<Product>, files?: File[]) => {
    const isCreating = data.id === 0;

    //? form-multipart y manejo de ficheros

    if (isCreating) {
      // TODO: Implement product creation logic
      //   const {} = await $fetch('', {
      //     method: 'POST',
      //     body: data
      //   });
      //   return algo;
    }

    // TODO: Implement product update logic
    //   const {} = await $fetch('', {
    //     method: 'PATCH',
    //     body: data
    //   });

    //   return algo;
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
