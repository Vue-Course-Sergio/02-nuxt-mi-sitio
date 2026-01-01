<template>
  <div class="space-y-6">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Productos
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Gestiona y organiza tu catálogo de productos
        </p>
      </div>
      <u-button
        to="/dashboard/product/new"
        icon="i-lucide-plus"
        label="Agregar Producto"
        color="primary"
        size="lg"
      />
    </div>

    <u-table :data="products" :columns="columns" class="flex-1" />

    <shared-pagination
      :total="total"
      :model-value="currentPage"
      :per-page="perPage"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const { products, currentPage, perPage, total } = await usePaginatedProducts();

const UBadge = resolveComponent("UBadge");
const NuxtLink = resolveComponent("NuxtLink");

const columns: TableColumn<Product>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "images",
    header: "Imagen",
    cell: ({ row }) => {
      const images = row.getValue("images") as string[];
      const url = Array.isArray(images) && images.length > 0 ? images[0] : "";

      if (!url) return h("span", { class: "text-gray-500" }, "N/A");

      return h("img", { class: "w-12 h-12 rounded-lg object-cover", src: url });
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const productName = row.getValue("name");
      const productId = row.getValue("id");

      return h(
        NuxtLink,
        {
          to: `/dashboard/product/${productId}`,
          class:
            "text-primary-500 hover:text-primary-700 underline cursor-pointer",
        },
        () => productName
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      return h(
        "div",
        {
          class: "whitespace-normal break-words max-w-[300px] truncate-text",
        },
        String(row.getValue("description")).slice(0, 50) + "..."
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => formatCurrency(row.getValue("price")),
  },
  {
    accessorKey: "tags",
    header: "Etiquetas",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];

      if (!Array.isArray(tags) || tags.length === 0) return "";

      return h(
        "div",
        { class: "flex flex-wrap gap-1" },
        tags.map((tag) =>
          h(
            UBadge,
            {
              color: "primary",
              variant: "subtle",
              size: "xs",
              class: "mr-0.5",
            },
            () => tag
          )
        )
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
    cell: ({ row }) => dayMonthYearFormat(row.getValue("createdAt")),
  },
];
</script>
