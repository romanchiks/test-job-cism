<script lang="ts" setup>
import MainHeader from "@/components/containers/main-header.vue";
</script>

<template>
  <div class="default-layout">
    <main-header class="default-layout__header"></main-header>
    <main class="default-layout__main"><slot></slot></main>
  </div>
</template>

<styles lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  gap: 35px;
  height: 100%;
  max-width: 1266px;
  margin: 0 auto;
  padding-top: 41px;
  padding-bottom: 58px;

  @media (max-width: $min-extra-large-width) {
    margin: 0 50px;
  }

  &__header {
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }

  &__main {
    flex-grow: 1;
    border: 1px solid $block-gray-background;
    border-radius: 10px;
    box-shadow: $block-main-box-shadow;
  }
}
</styles>
