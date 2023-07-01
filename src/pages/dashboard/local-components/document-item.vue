<script lang="ts" setup>
import { computed } from "vue";

import BaseImage from "@/components/blocks/base-image.vue";

const emits = defineEmits(["select-document"]);

const props = defineProps<{
  id: number;
  imageURL: string | null;
  name: string;
  selectedDocumentID?: number;
}>();

const currentDocumentIsSelected = computed(
  () => props?.selectedDocumentID === props.id
);

function onClickDocumentItem() {
  if (props?.selectedDocumentID !== props.id) emits("select-document");
}
</script>

<template>
  <div
    :class="{ 'document-item--selected': currentDocumentIsSelected }"
    @click="onClickDocumentItem()"
    class="document-item"
  >
    <base-image
      :src="imageURL || undefined"
      :alt="'Изображение документа'"
      class="document-item__image"
    ></base-image>
    <div class="document-item__info info">
      <p class="info__name">{{ name }}</p>
      <!-- не нашел в api свойства с размером файла, сделал статичным, как в макете -->
      <p
        :class="{ 'size--selected': currentDocumentIsSelected }"
        class="info__size size"
      >
        12 МБ
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.document-item {
  display: flex;
  width: 100%;
  border: 1px solid $block-gray-background;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }

  &--selected {
    cursor: default;

    & .info {
      background-color: $block-blue-background;
      color: $text-white-color;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__image {
    width: 70px;
    height: 70px;
    border-right: 1px solid $block-gray-background;
  }

  &__info {
    flex-grow: 1;
  }

  & .info {
    padding: 15px;
    transition: all 0.3s;

    &__name {
      font-weight: 600;
      margin-bottom: 6px;
      color: inherit;
    }

    &__size {
      color: $text-gray-color;
    }

    & .size {
      color: $text-gray-color;

      &--selected {
        color: $text-lightgray-color;
      }
    }
  }
}
</style>
