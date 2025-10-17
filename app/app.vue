<script lang="ts" setup>
const count = ref(10);

await sleep(2000);

count.value = 20;
</script>

<template>
  <div>
    <h1>Hola mundo - {{ count }}</h1>
    <button @click="count++">Click me</button>
  </div>
</template>
