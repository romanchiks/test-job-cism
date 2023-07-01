<script lang="ts" setup>
import { RouteNames } from "@/router/router.types";
</script>

<template>
  <header class="main-header">
    <router-link
      :to="{ name: RouteNames.main }"
      class="main-header__main-logo title-1"
      >MyApp</router-link
    >
    <p class="main-header__user">Username</p>
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__main-logo {
    font-weight: 700;
    font-size: 32px;
    text-decoration: none;
  }

  &__user {
    font-size: 16px;
  }
}
</style>
