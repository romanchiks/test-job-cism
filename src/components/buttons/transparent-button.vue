<script lang="ts" setup>
type AllowedСolorValues = "gray" | "blue" | "red";

withDefaults(defineProps<{ color?: AllowedСolorValues }>(), {
  color: "gray",
});
</script>

<template>
  <button :class="`transparent-button--${color}`" class="transparent-button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.transparent-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 28px;
  border: 1px solid $block-darkgray-background;
  border-radius: 8px;
  cursor: pointer;
  background-color: transparent;
  color: $text-gray-color;
  transition: all 0.3s;

  &:hover:not([disabled]) {
    background-color: $block-darkgray-background;
    color: $text-white-color;
  }

  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background-color: $block-darkgray-background;
    color: $text-white-color;
  }

  &--blue {
    border: 1px solid $block-blue-background;
    color: $text-blue-color;

    &:hover:not([disabled]) {
      background-color: $block-blue-background;
    }

    &:disabled {
      background-color: $block-blue-background;
    }
  }

  &--red {
    border: 1px solid $block-red-background;
    color: $text-red-color;

    &:hover:not([disabled]) {
      background-color: $block-red-background;
    }

    &:disabled {
      background-color: $block-red-background;
    }
  }
}
</style>
