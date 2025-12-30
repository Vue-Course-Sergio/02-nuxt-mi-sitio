<script setup lang="ts">
defineProps<{
  buttonLabel: string;
}>();

const reviewText = ref("");
const rating = ref(0);
const isOpen = ref(false);

const submitReview = () => {
  console.log("submitReview");

  isOpen.value = false;
};
</script>

<template>
  <u-modal
    :open="isOpen"
    @close="isOpen = false"
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
