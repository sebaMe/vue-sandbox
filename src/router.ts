import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ResultPage from "./pages/ResultPage.vue";

type CompetitionTreeRouteNames =
  | "competition-tree_event_result"
  | "competition-tree_phase_result"
  | "competition-tree_unit_result";

export const toEventTreeRoute = (
  route: CompetitionTreeRouteNames,
  params: { event?: string; phase?: string; unit?: string } | string[]
) => {
  if (Array.isArray(params)) {
    router.push({
      name: route,
      params: { event: params.at(0), phase: params.at(1), unit: params.at(2) }
    });
  } else {
    router.push({
      name: route,
      params
    });
  }
};

const createEventTreeRoutes = () => {
  const exportRoutes = (): RouteRecordRaw => {
    return {
      path: "/competition-tree",
      name: "competition-tree",
      component: HomePage,
      children: [
        {
          path: "competition-tree/event/:event?/:phase?/:unit?/result",
          name: "competition-tree_event_result" as CompetitionTreeRouteNames,
          component: ResultPage,
          props: true
        },
        {
          path: "competition-tree/phase/:event?/:phase?/:unit?/result",
          name: "competition-tree_phase_result" as CompetitionTreeRouteNames,
          component: ResultPage,
          props: true
        },
        {
          path: "competition-tree/unit/:event?/:phase?/:unit?/result",
          name: "competition-tree_unit_result" as CompetitionTreeRouteNames,
          component: ResultPage,
          props: true
        }
      ],
      props: true
    };
  };

  return { exportRoutes };
};

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    createEventTreeRoutes().exportRoutes(),
    { path: "/", redirect: "/competition-tree" }
  ]
});
