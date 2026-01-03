<script setup lang="ts">
const props = defineProps<{
  slug: string;
}>();

const { isLoggedIn } = useAuthentication();

const { data, status, refresh } = useFetch(
  `/api/product/${props.slug}/reviews`,
  {
    server: false,
    lazy: true,
  }
);

const productReviews = computed(() => data.value?.reviews ?? []);
const hasUserReviewed = computed(() => data.value?.hasUserReviewed ?? false);
</script>

<template>
  <u-card class="mb-8" icon="i-lucide-star">
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <u-icon name="i-lucide-star" class="text-primary-500 text-2xl" />
        <div>
          <h2 class="text-xl font-semibold">Reseñas</h2>
          <p class="text-gray-600 text-sm">
            Nuestras reseñas de clientes satisfechos.
          </p>
        </div>
      </div>
      <!-- <UButton
        color="primary"
        icon="i-lucide-plus-circle"
        size="md"
        class="ml-4"
        label="Añadir reseña"
      /> -->
      <client-only>
        <modal-review
          v-if="isLoggedIn && !hasUserReviewed"
          button-label="Añadir reseña"
        />
      </client-only>
    </div>
  </u-card>

  <div
    v-if="status === 'pending'"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <u-skeleton class="h-48 w-full rounded-md mb-4" />
    <u-skeleton class="h-48 w-full rounded-md mb-4" />
    <u-skeleton class="h-48 w-full rounded-md mb-4" />
  </div>

  <u-page-columns>
    <u-page-card
      v-for="(review, index) in productReviews"
      :key="index"
      class="fade-in"
      variant="subtle"
      :description="review.review"
      :ui="{
        description: 'before:content-[open-quote] after:content-[close-quote]',
      }"
    >
      <template #footer>
        <div class="flex items-center gap-2 mb-2">
          <u-icon
            name="i-lucide-star"
            class="text-primary-500 text-xl"
            v-for="star in review.rating"
            :key="star"
          />
        </div>
        <u-user
          :avatar="{
            alt: review.username,
            name: review.username,
          }"
          :name="review.username"
          :description="review.userTitle"
          size="xl"
        />
      </template>
    </u-page-card>
  </u-page-columns>
</template>
