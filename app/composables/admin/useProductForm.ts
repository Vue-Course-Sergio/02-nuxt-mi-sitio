import z from "zod";

export async function useProductForm() {
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();

  const productSchema = z.object({
    slug: z.string().nonempty("El slug es obligatorio."),
    name: z.string().nonempty("El nombre es obligatorio."),
    description: z.string().nonempty("La descripción es obligatoria."),
    price: z.number().min(0, "El precio no puede ser negativo."),
  });

  const filesToUpload = ref<File[]>([]);
  const messageQuery = route.query.message as string;
  const rawId = route.params.id as string;

  if (messageQuery) {
    toast.add({
      title: "Producto creado",
      description: "El producto ha sido creado exitosamente.",
    });

    router.replace({ query: {} });
  }

  const {
    data: product,
    error,
    pending,
    createOrUpdate,
  } = await useAdminProduct(rawId);

  if (error.value) navigateTo("/404");

  const isCreating = computed(() => rawId === "new");

  const selectedImageIndex = ref(0);
  const isSubmitting = ref(false);
  const fieldErrors = ref<Record<string, string>>({});

  const newProduct = ref<Product | null>(
    product.value
      ? {
          ...product.value,
          createdAt: new Date(product.value.createdAt),
          updatedAt: new Date(product.value.updatedAt),
        }
      : null
  );

  const pageTitle = computed(() =>
    isCreating.value
      ? "Crear Producto"
      : `Editar Producto: ${product.value?.name}`
  );

  const subtitle = computed(() =>
    isCreating.value
      ? "Complete el formulario para crear un nuevo producto."
      : `Actualice los detalles del producto seleccionado.`
  );

  const checkValidations = () => {
    if (!newProduct.value) return false;

    fieldErrors.value = {};

    const result = productSchema.safeParse(newProduct.value);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
          fieldErrors.value[field] = issue.message;
        }
      });

      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const isFormValid = checkValidations();

    if (!isFormValid) return;
    if (!newProduct.value) return;
    isSubmitting.value = true;

    // Convertir tags de string a array si es necesario
    if (typeof (newProduct.value as any).tags === "string") {
      (newProduct.value as any).tags = (
        (newProduct.value as any).tags as string
      )
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);
    }

    const product = await createOrUpdate(
      newProduct.value,
      filesToUpload.value.length > 0 ? filesToUpload.value : undefined
    );

    newProduct.value = product;

    if (isCreating.value) {
      router.replace(`/dashboard/product/${product.id}?message=created`);
      return;
    }

    filesToUpload.value = [];

    toast.add({
      title: "Producto actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    });
    isSubmitting.value = false;
  };

  const handleCancel = () => {
    navigateTo("/dashboard/products");
  };

  const handleFilesChanged = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    filesToUpload.value = Array.from(files);
  };

  watch(
    newProduct,
    () => {
      if (newProduct.value) {
        checkValidations();
      }
    },
    { deep: true }
  );

  return {
    filesToUpload,
    product,
    error,
    pending,
    isCreating,
    newProduct,
    selectedImageIndex,
    isSubmitting,
    fieldErrors,
    pageTitle,
    subtitle,
    handleSubmit,
    handleCancel,
    handleFilesChanged,
  };
}
