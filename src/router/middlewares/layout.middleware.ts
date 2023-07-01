import type { RouteLocationNormalized } from "vue-router";

import { LAYOUT_FILEMAP, LAYOUT_NAMES } from "@/layouts/layouts.types";

const DEFAULT_LAYOUT_NAME = LAYOUT_NAMES.default;

export async function layoutMiddleware(
  route: RouteLocationNormalized
): Promise<void> {
  const { layout } = route.meta;
  const layoutName = layout || DEFAULT_LAYOUT_NAME;
  const fileName = LAYOUT_FILEMAP[layoutName];
  const component = await import(`../../layouts/modules/${fileName}`);

  route.meta.layoutComponent = component.default;
}
