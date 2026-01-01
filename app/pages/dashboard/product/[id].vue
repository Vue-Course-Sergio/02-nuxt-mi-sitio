<script setup lang="ts">
const route = useRoute();

const rawId = route.params.id as string;
</script>

<template>
  <h1>Admin Product Page</h1>

  <h3>{{ rawId }}</h3>
</template>
