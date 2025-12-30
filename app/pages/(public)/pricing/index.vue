<template>
  <u-page-c-t-a
    orientation="horizontal"
    title="Información de precios"
    description="Descubre nuestros precios y planes."
  >
    <template #default>
      <div class="flex items-center justify-center">
        <u-icon name="i-simple-icons-nuxtdotjs" :size="150" />
      </div>
    </template>
  </u-page-c-t-a>

  <div class="mt-10" />

  <pricing-table />
</template>
