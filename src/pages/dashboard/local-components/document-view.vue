<script lang="ts" setup>
import { DocumentItemType } from "../types";

import BaseImage from "@/components/blocks/base-image.vue";
import TransparentButton from "@/components/buttons/transparent-button.vue";

const emits = defineEmits(["delete-document"]);

const props = defineProps<{
  document?: DocumentItemType;
}>();

function downloadDocomentDescription(): void {
  if (!props.document) return;
  const element = document.createElement("a");
  const file = new Blob([props.document.description], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `${props.document.name}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function deleteDocument(): void {
  if (!props.document?.image) return;
  emits("delete-document", props.document.id);
}
</script>

<template>
  <div class="document-view">
    <transition name="fade" mode="out-in">
      <p v-if="!document" class="document-view__undefined">
        Выберите документ, чтобы посмотреть его содержиое
      </p>
      <div v-else class="document-view__content content">
        <div class="content__image-block image-block">
          <base-image
            :src="document.image || undefined"
            class="image-block__image"
          ></base-image>
        </div>
        <div class="content__description-block description-block">
          <h3 class="description-block__title title-2">
            {{ document.name }}
          </h3>
          <div class="description-block__controls">
            <transparent-button
              :color="'blue'"
              @click="downloadDocomentDescription()"
              >Скачать</transparent-button
            >
            <transparent-button
              :disabled="!document?.image"
              :color="'red'"
              @click="deleteDocument()"
              >Удалить</transparent-button
            >
          </div>
          <h3 class="description-block__desription-title title-2">Описание:</h3>
          <p class="description-block__description">
            {{ document.description }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<styles lang="scss" scoped>
.document-view {
  position: sticky;
  top: 0;
  display: flex;
  gap: 20px;
  padding: 30px 30px 60px 30px;

  &__undefined {
    margin-top: 40vh;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: $text-gray-color;
  }

  &__content {
    @media (max-width: 1150px) {
      flex-direction: column;
    }
  }

  & .content {
    &__image-block {
      flex-shrink: 0;
      height: auto;
      max-width: 424px;
      overflow: hidden;
    }

    & .image-block {
      &__image {
        border: 1px solid $block-gray-background;
      }
    }

    & .description-block {
      &__title {
        margin-bottom: 14px;
      }

      &__controls {
        display: flex;
        flex-wrap: wrap;
        gap: 7px 17px;
        margin-bottom: 47px;
      }

      &__description-title {
        margin-bottom: 14px;
      }

      &__description {
        color: $text-gray-color;
        max-width: 100%;
      }
    }
  }
}
</styles>
