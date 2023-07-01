<script lang="ts" setup>
import { onBeforeUnmount } from "vue";

const emits = defineEmits(["close-modal"]);

document.body.style.overflow = "hidden";

onBeforeUnmount(() => (document.body.style.overflow = "auto"));

function closeModal(): void {
  emits("close-modal");
}
</script>

<template>
  <teleport to="#modal">
    <article @click="closeModal()" class="main-modal">
      <div @click.stop class="main-modal__content modal-content">
        <slot></slot>
      </div>
    </article>
  </teleport>
</template>

<styles lang="scss" scoped>
.main-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 30px 15%;
  padding-bottom: 60px;
  cursor: pointer;
  background-color: rgba($block-white-background, 0.5);
  backdrop-filter: blur(5px);

  &__content {
    max-height: 100%;
    max-width: 100%;
  }

  & .modal-content {
    border-radius: 10px;
    cursor: default;
    background-color: $block-white-background;
    overflow: auto;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
}
</styles>
