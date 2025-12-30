<script setup lang="ts">
const breadcrumbItems = [
  {
    label: "Dashboard",
    icon: "i-lucide-layout-dashboard",
  },

  {
    label: "Inicio",
    icon: "i-lucide-house",
  },
];

const userMenuItems = [
  [
    {
      label: "Perfil",
      icon: "i-lucide-user",
      to: "#",
    },
    {
      label: "Preferencias",
      icon: "i-lucide-settings",
      to: "#",
    },
  ],
  [
    {
      label: "Cerrar sesión",
      icon: "i-lucide-log-out",
      click: () => {
        console.log("Logout clicked");
      },
    },
  ],
];
</script>

<template>
  <div class="border-b border-default bg-primary/10 sticky top-0 z-10">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Left Side: Breadcrumb or Title -->
      <div class="flex-1">
        <u-breadcrumb
          :items="breadcrumbItems"
          :ui="{ list: 'text-sm font-medium' }"
        />
      </div>

      <!-- Right Side: Actions and User Menu -->
      <div class="flex items-center gap-4 ms-auto">
        <!-- Notification Bell -->
        <u-button
          icon="i-lucide-bell"
          color="neutral"
          variant="ghost"
          square
          class="h-8 w-8"
        />

        <!-- Divider -->
        <u-separator orientation="vertical" class="h-6" />

        <!-- User Dropdown Menu -->
        <u-dropdown-menu
          :items="userMenuItems"
          :popper="{ placement: 'bottom-end' }"
        >
          <u-button
            icon="i-lucide-user"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-chevron-down"
            label="Account"
          />
        </u-dropdown-menu>
      </div>
    </div>
  </div>
</template>
