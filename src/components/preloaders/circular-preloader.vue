<script lang="ts" setup>
withDefaults(
  defineProps<{
    fullSize?: boolean;
  }>(),
  {
    fullSize: false,
  }
);
</script>

<template>
  <div :class="{ 'preloader--full-size': fullSize }" class="preloader">
    <div class="preloader__spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  &__spinner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top: 2px solid $block-blue-background;
    border-left: 2px solid $block-blue-background;
    animation: spin 0.7s linear infinite;
  }

  &--full-size {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    filter: blur(5px);

    &__spinner {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
