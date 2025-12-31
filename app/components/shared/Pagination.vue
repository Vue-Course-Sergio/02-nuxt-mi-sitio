<script setup lang="ts">
defineProps<{
  total: number;
  modelValue: number;
  perPage: number;
}>();

const router = useRouter();
const route = useRoute();

const currentPage = computed(() => {
  return parseInt(route.query.page as string) || 1;
});

const handlePageUpdate = (page: number) => {
  router.push({
    query: {
      ...route.query,
      page: page.toString(),
    },
  });
};
</script>

<template>
  <div class="flex items-center justify-center my-10">
    <u-pagination
      :total="total"
      :page="currentPage"
      :per-page="perPage"
      :items-per-page="perPage"
      show-edges
      @update:page="handlePageUpdate"
    />
  </div>
</template>
