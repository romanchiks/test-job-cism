<script lang="ts" setup>
import { reactive } from "vue";

import { userPageStateStore } from "@/store/page-state/page-state.store";

import { apiResponse } from "@/services/api/api-response.service";

import type { AxiosRequestConfig } from "axios";
import { DocumentListType, DocumentItemType, DocumentViewType } from "./types";

import MainModal from "@/components/containers/main-modal.vue";
// eslint-disable-next-line
import DocumentList from "./local-components/document-list.vue";
// eslint-disable-next-line
import DocumentView from "./local-components/document-view.vue";

const DOCUMENT_ITEMS_BREAKPOINT = `${process.env.VUE_APP_DASHBOARD_API_BREAKPOINT}/user/docs`;

const pageStateStore = userPageStateStore();

const documentList: DocumentListType = reactive({
  moduleID: "documentList",
  filter: "",
  items: undefined,
  moduleState: pageStateStore.getModuleState("documentList"),
});
const documentView: DocumentViewType = reactive({
  moduleID: "documentView",
  item: undefined,
});

getDocumentItems();

async function getDocumentItems(): Promise<void> {
  const validatorFunction = (documentItems: unknown): void => {
    const documentItemsGuard = (
      documentItems: unknown
    ): documentItems is DocumentItemType[] => {
      return Array.isArray(documentItems);
    };
    if (!documentItemsGuard(documentItems)) {
      throw new Error("Получены не валидные данные");
    }
  };

  const params: AxiosRequestConfig["params"] = {};

  if (documentList.filter) params.search = documentList.filter;

  const documentItems = await apiResponse(
    { url: DOCUMENT_ITEMS_BREAKPOINT, params },
    {
      acceptableStatusCode: 200,
      pageModuleID: documentList.moduleID,
      validatorFunction,
    }
  );

  if (!documentItems) return;

  documentList.items = documentItems as DocumentItemType[];
}

function changeFilter(filterValue: string): void {
  documentList.filter = filterValue;
  getDocumentItems();
}

function selectDocument(documentID: DocumentItemType["id"]): void {
  const findedDocument = documentList.items?.find(
    (document) => document.id === documentID
  );

  if (!findedDocument) return;

  documentView.item = findedDocument;
}

function unselectDocoment(): void {
  documentView.item = undefined;
}
</script>

<template>
  <div class="dashboard-page">
    <section class="dashboard-page__document-list">
      <document-list
        :documents="documentList.items"
        :loading="documentList.moduleState.loading"
        :selected-document-i-d="documentView.item?.id"
        @change-filter="changeFilter($event)"
        @select-document="selectDocument($event)"
      ></document-list>
    </section>
    <main-modal
      v-if="pageStateStore.isMediumBreakpoint && documentView.item"
      @close-modal="unselectDocoment()"
    >
      <document-view
        :document="documentView.item"
        @delete-document="unselectDocoment()"
      ></document-view>
    </main-modal>
    <section
      v-if="!pageStateStore.isMediumBreakpoint"
      class="dashboard-page__document-view"
    >
      <document-view
        :document="documentView.item"
        @delete-document="unselectDocoment()"
      ></document-view>
    </section>
  </div>
</template>

<style lang="scss">
.dashboard-page {
  display: flex;
  gap: 2px;
  height: 100%;

  &__document-list {
    flex-shrink: 0;
    width: 282px;

    @media (max-width: $min-medium-width) {
      width: 100%;
    }
  }

  &__document-view {
    position: relative;
    flex-grow: 1;
    border-left: 1px solid $block-gray-background;
  }
}
</style>
