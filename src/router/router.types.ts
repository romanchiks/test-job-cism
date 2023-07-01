import type { Component } from "vue";

import { LAYOUT_NAMES } from "@/layouts/layouts.types";

declare module "vue-router" {
  interface RouteMeta {
    layout?: LAYOUT_NAMES;
    layoutComponent?: Component;
  }
}

export enum RouteNames {
  "main" = "main",
}
