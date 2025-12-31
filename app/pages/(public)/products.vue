<script setup lang="ts">
const { products } = await usePaginatedProducts();
</script>

<template>
  <u-page-c-t-a
    orientation="horizontal"
    title="Productos"
    description="Descubre nuestros productos y servicios."
  >
    <template #default>
      <div class="flex items-center justify-center">
        <u-icon name="i-lucide-box" :size="150" />
      </div>
    </template>
  </u-page-c-t-a>

  <div class="mt-10" />

  <ProductsGrid :products="products" />

  <SharedPagination :total="100" :model-value="1" :per-page="10" />
</template>

<style scoped></style>
