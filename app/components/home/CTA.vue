<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const links = ref<ButtonProps[]>([
  {
    label: "Empezando",
    color: "neutral",
  },
  {
    label: "Más información",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-lucide-arrow-right",
  },
]);
</script>

<template>
  <u-page-c-t-a
    title="Confiado y apoyado por nuestra increíble comunidad"
    description="Hemos construido una asociación sólida y duradera. Su confianza es nuestra fuerza motriz, impulsándonos hacia el éxito compartido."
    orientation="horizontal"
    :links="links"
  >
    <img
      src="https://picsum.photos/640/728"
      width="320"
      height="364"
      alt="Illustration"
      class="w-full rounded-lg"
    />
  </u-page-c-t-a>
</template>
