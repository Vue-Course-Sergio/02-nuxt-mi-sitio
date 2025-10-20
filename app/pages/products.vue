<script setup lang="ts">
throw createError({
  statusCode: 404,
  statusMessage: "Page not found!!",
  data: {
    myCustomField: true,
    otherField: "Some value",
  },
});
</script>

<template>
  <div>Page: products</div>
</template>

<style scoped></style>
