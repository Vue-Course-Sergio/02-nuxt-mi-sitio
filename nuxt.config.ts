// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Mi Sitio con Nuxt 4",
      meta: [
        {
          name: "description",
          content: "Este es mi sitio web construido con Nuxt 4",
        },
      ],
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],

  // ssr: false,
  // nitro: {
  //   preset: "static",
  //   static: true,
  // },
});
