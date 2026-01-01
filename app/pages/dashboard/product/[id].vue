<script setup lang="ts">
const route = useRoute();

const rawId = route.params.id as string;

const { data: product } = await useAdminProduct(rawId);
</script>

<template>
  <h1>Admin Product Page</h1>

  <h3>{{ product?.name }}</h3>
</template>
