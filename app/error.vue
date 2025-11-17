<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <u-error
    :error="error"
    :clear="{
      size: 'xl',
      icon: 'i-lucide-arrow-left',
      class: 'rounded-full',
      label: 'Volver a Inicio'
    }"
    :ui="{
      statusCode: 'text-9xl font-thin',
    }"
  />
</template>
