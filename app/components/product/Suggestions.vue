<script setup lang="ts">
const props = defineProps<{
  slug: string;
}>();

const { data: productSuggestions, status } = useFetch(
  `/api/product/${props.slug}/suggestions`,
  {
    lazy: true,
    server: false,
    cache: "force-cache",
  }
);
</script>

<template>
  <client-only>
    <div
      v-if="status === 'pending'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <u-skeleton class="w-full h-52 rounded-md mb-4" />
      <u-skeleton class="w-full h-52 rounded-md mb-4" />
      <u-skeleton class="w-full h-52 rounded-md mb-4" />
    </div>

    <products-grid
      v-else
      class="fade-in"
      :products="productSuggestions ?? []"
    />
  </client-only>
</template>
