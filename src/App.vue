<script lang="ts" setup>
import { onMounted } from "vue";

import { userPageStateStore } from "@/store/page-state/page-state.store";

import AppLayout from "@/layouts/app-layout.vue";

const pageStateStore = userPageStateStore();

onMounted(() => {
  pageStateStore.updateCurrentWidth();
  window.addEventListener("resize", pageStateStore.updateCurrentWidth);
});
</script>

<template>
  <app-layout>
    <router-view></router-view>
  </app-layout>
</template>
