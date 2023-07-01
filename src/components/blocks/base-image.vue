<script lang="ts" setup>
import { ref, computed, ComputedRef, watch } from "vue";

const props = defineProps<{
  src?: string;
  alt?: string;
}>();

const imageLoading = ref(true);
const imageLoadError = ref(props?.src ? false : true);

const currentImageURL: ComputedRef<string> = computed(() => {
  if (imageLoadError.value || !props?.src) {
    return `${process.env.BASE_URL}images/no-image.png`;
  }
  if (imageLoading.value) return `${process.env.BASE_URL}images/preloader.gif`;
  return props.src;
});

watch(
  () => props.src,
  () => {
    imageLoading.value = true;
    imageLoadError.value = props?.src ? false : true;
  }
);

function onLoadImage(): void {
  imageLoading.value = false;
}

function onErrorImage(): void {
  imageLoadError.value = true;
  imageLoading.value = false;
}
</script>

<template>
  <img
    :src="currentImageURL"
    :alt="alt"
    @load="onLoadImage()"
    @error="onErrorImage()"
    class="base-image"
  />
</template>
