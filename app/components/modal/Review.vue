<script setup lang="ts">
import type { User } from "#auth-utils";
import type { ProductReview } from "~~/prisma/generated/client";

const props = defineProps<{
  buttonLabel: string;
  slug: string;
  user: User | null;
}>();

const emit = defineEmits<{
  (event: "review-posted", review: ProductReview): void;
}>();

const reviewText = ref("");
const userTitle = ref("");
const rating = ref(0);
const isOpen = ref(false);

const submitReview = () => {
   try {
    const review = await $fetch<ProductReview>(
      `/api/product/${props.slug}/reviews`,
      {
        method: "POST",
        body: {
          rating: rating.value,
          userTitle: userTitle.value,
          review: reviewText.value,
        },
      }
    );

    emit("review-posted", review);
  } catch (error) {}

  isOpen.value = false;
};

const handleCloseModal = (event: boolean) => {
  isOpen.value = event;
  reviewText.value = "";
  userTitle.value = "";
  rating.value = 0;
};
</script>

<template>
  <u-modal
    :open="isOpen"
    @close="handleCloseModal"
    @update:open="handleCloseModal"
    title="Añadir reseña"
    description="Deja tu reseña sobre el producto."
  >
    <u-button
      :label="buttonLabel"
      color="primary"
      variant="subtle"
      @click="isOpen = true"
    />

    <template #content>
      <u-container class="max-w-2xl mx-auto p-4">
        <h2 class="text-xl font-semibold">Añadir reseña</h2>
        <p class="text-gray-600 text-sm mb-5">
          Deja tu reseña sobre el producto.
        </p>
        <form class="grid grid-cols-1 gap-4 mb-5">
          <input type="hidden" v-model="rating" />

          <!-- Stars -->
          <div class="col-span-1">
            <div class="flex items-center gap-2">
              <u-icon
                name="i-lucide-star"
                class="text-gray-600 text-xl cursor-pointer"
                :class="{ 'text-yellow-500': rating >= star }"
                v-for="star in 5"
                :key="star"
                @click="rating = star"
              />
            </div>
          </div>

          <div class="col-span-1">
            <u-input :model-value="user?.name" class="w-full" disabled />
          </div>

          <div class="col-span-1">
            <u-input
              v-model="userTitle"
              placeholder="Título del usuario"
              class="w-full"
            />
          </div>

          <div class="col-span-1">
            <u-textarea
              v-model="reviewText"
              placeholder="Escribe tu reseña"
              class="w-full"
              :rows="6"
            />
          </div>

          <div class="flex flex-1 items-end">
            <u-button
              color="primary"
              variant="solid"
              block
              label="Enviar reseña"
              :disabled="!reviewText || rating === 0"
              @click="submitReview"
            />
          </div>
        </form>
      </u-container>
    </template>
  </u-modal>
</template>
