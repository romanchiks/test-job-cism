<script lang="ts" setup>
import { DocumentItemType } from "../types";

import SearchInput from "@/components/inputs/search-input.vue";
import DocumentItem from "./document-item.vue";

const emits = defineEmits(["change-filter", "select-document"]);

defineProps<{
  documents: DocumentItemType[] | undefined;
  selectedDocumentID?: DocumentItemType["id"];
  loading?: boolean;
}>();

function changeFilter(filterValue: string): void {
  emits("change-filter", filterValue);
}
</script>

<template>
  <div class="document-list">
    <div class="document-list__search-section search-section">
      <h3 class="search-section__title title-2">Поиск документа</h3>
      <search-input
        :loading="loading"
        @input="changeFilter($event)"
        :delay="500"
      ></search-input>
    </div>
    <div class="document-list__list-section list-section">
      <h3 class="search-section__title title-2">Поиск документа</h3>
      <transition-group
        name="list"
        tag="div"
        class="list-section__items items"
        mode="out-in"
      >
        <template v-if="documents?.length">
          <document-item
            v-for="document in documents"
            :key="document.id"
            :id="document.id"
            :selected-document-i-d="selectedDocumentID"
            :image-u-r-l="document.image"
            :name="document.name"
            @select-document="$emit('select-document', document.id)"
          ></document-item>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<styles lang="scss" scoped>
.document-list {
  display: flex;
  flex-direction: column;
  gap: 29px;
  height: 100%;
  padding: 27px 20px 60px 20px;

  &__search-section {
    flex-shrink: 1;
  }

  &__list-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  & .list-section {
    &__items {
      position: relative;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
  }
}
</styles>
