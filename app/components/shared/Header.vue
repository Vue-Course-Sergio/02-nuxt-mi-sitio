<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const { isLoggedIn, logout, isAdmin } = useAuthentication();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Productos",
    to: "/products",
    // icon: "i-lucide-book-open",
    active: route.path.startsWith("/products"),
  },
  {
    label: "Precios",
    to: "/pricing",
    // icon: "i-lucide-box",
    active: route.path.startsWith("/pricing"),
  },
  {
    label: "Nosotros",
    // icon: "i-simple-icons-figma",
    to: "/about",
    active: route.path.startsWith("/about"),
  },
  {
    label: "Contacto",
    // icon: "i-lucide-rocket",
    to: "/contact",
    active: route.path.startsWith("/contact"),
  },
]);

const responsiveMenu = ref([
  ...items.value,
  {
    label: "Iniciar sesión",
    to: "/login",
    active: route.path.startsWith("/login"),
  },
]);
</script>

<template>
  <u-header>
    <template #title>
      <icons-nuxtui class="h-6 w-auto" />
    </template>

    <u-navigation-menu :items="items" />

    <client-only>
      <u-navigation-menu
        v-if="isAdmin"
        :items="[
          {
            label: 'Dashboard',
            to: '/dashboard',
          },
        ]"
      />
    </client-only>

    <template #right>
      <u-color-mode-button />

      <u-tooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <u-button
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </u-tooltip>

      <client-only>
        <!-- Login -->
        <u-button
          v-if="!isLoggedIn"
          color="primary"
          variant="solid"
          icon="i-heroicons-user-circle"
          to="/login"
          label="Login"
        />
        <!-- Logout -->
        <u-button
          v-else
          variant="ghost"
          icon="i-heroicons-user-circle"
          label="Cerrar sesión"
          @click="logout"
        />
      </client-only>
    </template>

    <template #body>
      <u-navigation-menu
        :items="responsiveMenu"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </u-header>
</template>
