<script setup lang="ts">
const { data } = await useFetch("/api/home/reviews");

const testimonials = ref(data);
</script>

<template>
  <div>
    <u-page-section
      title="Testimonios"
      description="Nuestros testimonios de clientes satisfechos"
      headline="Testimonios"
    />

    <u-page-columns>
      <u-page-card
        variant="solid"
        to="https://cloudflare.com"
        icon="i-logos-cloudflare-icon"
        title="Workers LaunchPad de Cloudflare"
        description="NuxtHub es parte del programa Workers Launchpad de Cloudflare para asegurar que obtengas una experiencia de primera clase sobre la red de Cloudflare."
        :ui="{ leadingIcon: 'size-10' }"
      />

      <u-page-card
        v-for="(testimonial, index) in testimonials"
        :key="index"
        variant="subtle"
        :description="testimonial.description"
        :ui="{
          description:
            'before:content-[open-quote] after:content-[close-quote]',
        }"
      >
        <template #footer>
          <u-user
            :name="testimonial.name"
            :description="testimonial.subtitle"
            :avatar="{
              src: testimonial.profileImage,
              alt: `${testimonial.name}s avatar`,
            }"
            size="xl"
          />
        </template>
      </u-page-card>
    </u-page-columns>
  </div>
</template>
