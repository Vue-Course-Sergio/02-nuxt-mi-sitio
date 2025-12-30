<template>
  <u-dashboard-group
    storage="local"
    storage-key="dashboard-sidebar"
    :persistent="true"
  >
    <dashboard-sidebar />

    <u-dashboard-panel>
      <dashboard-navbar />

      <div class="flex-1 overflow-auto p-6">
        <slot />
      </div>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>
