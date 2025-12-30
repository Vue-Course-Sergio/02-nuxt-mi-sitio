<script setup lang="ts">
const testimonials = ref([
  {
    user: {
      name: "Evan You",
      description: "Autor de Vue.js y Vite",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/499550?v=4",
        alt: "Evan You",
      },
    },
    quote:
      "¡Nuxt en la infraestructura de Cloudflare con un esfuerzo mínimo - esto es enorme!",
  },
  {
    user: {
      name: "Igor Minar",
      description: "Ingeniero de Software en Cloudflare",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/216296?v=4",
        alt: "Igor Minar",
      },
    },
    quote:
      "Me encanta el pulido y el enfoque de baterías incluidas. ¡NuxtHub lleva la integración de framework web y hosting a un nuevo nivel!",
  },
  {
    user: {
      name: "Charlie Hield",
      description: "Tecnólogo Creativo Senior",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/527849?v=4",
        alt: "Charlie Hield",
      },
    },
    quote:
      "¡NuxtHub es sin duda la forma más fácil de llevar un proyecto de cero a producción en el stack de Cloudflare!",
  },
  {
    user: {
      name: "Israel Ortuño",
      description: "Co-fundador de VueJobs",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/1769417?v=4",
        alt: "Israel Ortuño",
      },
    },
    quote:
      "No puedo encontrar una excusa para no ir full-stack con Nuxt de ahora en adelante. Entrega rápido al estilo Nuxt, cero configuración. Solo conecta y despliega.",
  },
  {
    user: {
      name: "Fayaz Ahmed",
      description: "Desarrollador Independiente",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/15716057?v=4",
        alt: "Fayaz Ahmed",
      },
    },
    quote:
      "Me tomó menos de 90 segundos desplegar una aplicación con BD, KV, almacenamiento de archivos y caché, todo en el edge con un solo comando.",
  },
  {
    user: {
      name: "Tommy J. Vedvik",
      description: "Desarrollador UX",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/48070?v=4",
        alt: "Tommy J. Vedvik",
      },
    },
    quote:
      "Nuxt se está convirtiendo en el mejor framework para emprendedores en mi opinión. NuxtHub es una capa sobre los servicios de Cloudflare para hosting full-stack edge económico y rápido.",
  },
  {
    user: {
      name: "Dario Piotrowicz",
      description: "Desarrollador Web en Cloudflare",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/61631103?v=4",
        alt: "Dario Piotrowicz",
      },
    },
    quote:
      "Me encanta cómo NuxtHub combina, amplifica y simplifica las herramientas de Cloudflare con el amplio y maduro ecosistema de Nuxt. ¡No puedo esperar a ver cómo evolucionará y se expandirá en el futuro!",
  },
  {
    user: {
      name: "Markus Oberlehner",
      description: "Desarrollador Web",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/6883314?v=4",
        alt: "Markus Oberlehner",
      },
    },
    quote:
      "Acabo de desplegar mi primer sitio en Cloudflare usando NuxtHub. ¡Experiencia muy elegante!",
  },
  {
    user: {
      name: "Anthony Fu",
      description: "Equipo principal de Vue.js, Vite y Nuxt",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/11247099?v=4",
        alt: "Anthony Fu",
      },
    },
    quote:
      "¡Es increíble poder ejecutar un solo comando y tener un proyecto Nuxt existente desplegado en edge en minutos! Se sintió como desbloquear la infraestructura y UI faltante para Cloudflare, mejorando la experiencia del desarrollador de una manera extraordinaria.",
  },
  {
    user: {
      name: "Jonathan Beckman",
      description: "Fundador de GuaranTee Time",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/90707158?v=4",
        alt: "Jonathan Beckman",
      },
    },
    quote:
      "NuxtHub y Cloudflare son mi opción principal para aplicaciones full stack. La experiencia de desarrollo es alegre y muy superior a cualquier otra plataforma que haya usado. Mi equipo puede iterar rápidamente y construir aplicaciones hermosas y de alto rendimiento con facilidad.",
  },
  {
    user: {
      name: "Eckhardt Dreyer",
      description: "Desarrollador Principal en YG",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/37825447?v=4",
        alt: "Eckhardt Dreyer",
      },
    },
    quote:
      "En YG, nuestro equipo creció recientemente y eso significó más asientos en todas las herramientas que usamos. Migrar nuestro flujo de trabajo de hosting a NuxtHub no solo tomó unos minutos, sino que nos ahorró dinero de nuestro proveedor anterior. ¡NuxtHub proporciona una excelente capa de gestión sobre nuestra infraestructura y estamos muy felices con el cambio!",
  },
]);
</script>

<template>
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
      :description="testimonial.quote"
      :ui="{
        description: 'before:content-[open-quote] after:content-[close-quote]',
      }"
    >
      <template #footer>
        <u-user v-bind="testimonial.user" size="xl" />
      </template>
    </u-page-card>
  </u-page-columns>
</template>
