import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ResultPage from "./pages/ResultPage.vue";

export const homeRoute: RouteRecordRaw = {
  path: "/",
  component: HomePage,
  children: [
    {
      path: "results/:event?/:phase?/:unit?",
      component: ResultPage
    }
  ]
};

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [homeRoute]
});
