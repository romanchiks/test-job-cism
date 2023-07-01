import { defineStore } from "pinia";
import { clone } from "lodash";

import { PageState, PageModuleState, PageModules } from "./types";

const BASE_PAGE_STATE: PageState = {
  currentWidth: 0,
  error: false,
  loading: true,
  feedback: false,
  message: "",
  modules: {},
};

const BASE_MODULE_STATE: PageModuleState = {
  error: false,
  loading: false,
  message: "",
};

const DEFAULT_ERROR_MESSAGE = "Произошла неизвестная ошибка";

export const userPageStateStore = defineStore({
  id: "pageStateStore",

  state: () =>
    ({
      ...clone(BASE_PAGE_STATE),
    } as PageState),

  getters: {
    isMediumBreakpoint: (state: PageState): boolean => {
      if (state.currentWidth <= 768) return true;
      return false;
    },
  },

  actions: {
    updateCurrentWidth(): void {
      this.$state.currentWidth = window.innerWidth;
    },

    initPage(): void {
      this.$state = clone(BASE_PAGE_STATE);
    },

    pageEndLoading(): void {
      this.$state.loading = false;
    },

    pageStartLoading(): void {
      this.$state.loading = true;
    },

    createFeedback(message: PageState["message"]): void {
      this.$state.message = message;
      this.$state.feedback = true;
    },

    removeFeedback(): void {
      this.$state.feedback = false;
      this.$state.message = "";
    },

    createPageError(message: PageState["message"] = ""): void {
      this.$state.message = message || DEFAULT_ERROR_MESSAGE;
      this.$state.error = true;
    },

    removePageError(): void {
      this.$state.error = false;
      this.$state.message = "false";
    },

    moduleStartLoading(id: keyof PageModules): void {
      const module = this.getModuleState(id);
      module.loading = true;
    },

    moduleEndLoading(id: keyof PageModules): void {
      const module = this.getModuleState(id);
      module.loading = false;
    },

    createModuleError(id: keyof PageModules, message = ""): void {
      const module = this.getModuleState(id);
      module.message = message || DEFAULT_ERROR_MESSAGE;
      module.error = true;
    },

    removeModuleError(id: keyof PageModules): void {
      const module = this.getModuleState(id);
      module.error = false;
      module.message = "";
    },

    getModuleState(id: keyof PageModules): PageModuleState {
      if (!Object.hasOwnProperty.call(this.$state.modules, id)) {
        this.createModuleState(id);
      }

      return this.$state.modules[id];
    },

    createModuleState(id: keyof PageModules): void {
      this.$state.modules[id] = clone(BASE_MODULE_STATE);
    },
  },
});
