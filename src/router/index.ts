import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { layoutMiddleware } from "./middlewares/layout.middleware";

import { RouteNames } from "./router.types";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: RouteNames.main,
    component: () => import("../pages/dashboard/dashboard-page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(layoutMiddleware);

export default router;
