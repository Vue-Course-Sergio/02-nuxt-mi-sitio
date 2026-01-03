<script setup lang="ts">
import { client } from "node:process";

const route = useRoute();
const slug = route.params.slug as string;

const { data } = await useProductReviews(slug);

const testimonials = data.value?.reviews;
const hasUserReviewed = data.value?.hasUserReviewed;
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
        <modal-review button-label="Añadir reseña" v-if="!hasUserReviewed" />
      </client-only>
    </div>
  </u-card>

  <u-page-columns>
    <u-page-card
      v-for="(testimonial, index) in testimonials"
      :key="index"
      variant="subtle"
      :description="testimonial.review"
      :ui="{
        description: 'before:content-[open-quote] after:content-[close-quote]',
      }"
    >
      <template #footer>
        <div class="flex items-center gap-2 mb-2">
          <u-icon
            name="i-lucide-star"
            class="text-primary-500 text-xl"
            v-for="star in testimonial.rating"
            :key="star"
          />
        </div>
        <u-user
          :name="testimonial.username"
          :description="testimonial.userTitle"
          size="xl"
        />
      </template>
    </u-page-card>
  </u-page-columns>
</template>
