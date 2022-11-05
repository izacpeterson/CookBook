<script setup>
import { RouterLink, RouterView } from "vue-router";
import PageHeader from "./components/PageHeader.vue";
</script>

<template>
  <PageHeader></PageHeader>

  <RouterView class="p-5" />
</template>
