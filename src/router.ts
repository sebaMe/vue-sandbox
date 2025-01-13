import {
  createRouter,
  createWebHashHistory,
  RouteLocationRaw,
  RouteRecordRaw
} from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ResultPage from "./pages/ResultPage.vue";

type CompetitionTreeRouteNames =
  | "competition-tree"
  | "competition-tree_event_result"
  | "competition-tree_phase_result"
  | "competition-tree_unit_result";

export const toEventTreeRoute = (
  route: CompetitionTreeRouteNames,
  params?: { rsc: string }
): RouteLocationRaw => ({
  name: route,
  params
});

const createEventTreeRoutes = () => {
  const exportConfig = (): RouteRecordRaw => {
    return {
      path: "/competition-tree",
      name: "competition-tree",
      component: HomePage,
      children: [
        {
          path: "event/:rsc/result",
          name: "competition-tree_event_result" as CompetitionTreeRouteNames,
          component: ResultPage,
          props: true
        },
        {
          path: "phase/:rsc/result",
          name: "competition-tree_phase_result" as CompetitionTreeRouteNames,
          component: ResultPage,
          props: true
        },
        {
          path: "unit/:rsc/result",
          name: "competition-tree_unit_result" as CompetitionTreeRouteNames,
          component: ResultPage,
          props: true
        }
      ],
      props: true
    };
  };

  return { exportConfig };
};

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    createEventTreeRoutes().exportConfig(),
    { path: "/", redirect: "/competition-tree" }
  ]
});
