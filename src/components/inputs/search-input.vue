<script lang="ts" setup>
import { ref, watch } from "vue";

import CircularPreloader from "@/components/preloaders/circular-preloader.vue";

const emits = defineEmits(["update:value", "input"]);

const props = withDefaults(
  defineProps<{
    value?: string;
    placeholder?: string;
    delay?: number;
    loading?: boolean;
    disableLoading?: boolean;
  }>(),
  {
    value: "",
    placeholder: "Поиск",
    delay: 0,
    loading: false,
    disableLoading: false,
  }
);

let delayTimeoutID: number | null = null;

const localValue = ref(props.value);

watch(
  () => props.value,
  (newValue) => (localValue.value = newValue)
);

const onInput = (event: Event): void => {
  if (delayTimeoutID) clearTimeout(delayTimeoutID);
  const newValue = (event.target as HTMLInputElement).value;
  delayTimeoutID = window.setTimeout(setValue, props.delay, newValue);
};

const setValue = (value: string): void => {
  localValue.value = value;
  emits("update:value", localValue.value.trim());
  emits("input", localValue.value.trim());
};
</script>

<template>
  <label class="search-input"
    ><input
      v-model="localValue"
      :placeholder="placeholder"
      @input="onInput($event)"
      type="search"
      class="search-input__input"
    />
    <div v-if="!disableLoading" class="search-input__preloader">
      <circular-preloader v-if="loading"></circular-preloader>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 16px 24px;
  border: 1.5px solid $block-gray-background;
  border-radius: 8px;
  cursor: text;
  background-color: transparent;

  &__input {
    cursor: inherit;

    &::placeholder {
      color: $text-gray-color;
    }
  }

  &__preloader {
    width: 16px;
    height: 16px;
  }
}
</style>
