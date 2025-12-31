<script setup lang="ts">
const { products, total, currentPage, perPage } = await usePaginatedProducts();
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

  <SharedPagination
    :total="total"
    :model-value="currentPage"
    :per-page="perPage"
  />
</template>

<style scoped></style>
