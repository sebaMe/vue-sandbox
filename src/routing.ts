import { _RouteRecordProps, RouteRecordRaw } from "vue-router";

import EventOverview from "./pages/EventOverview.vue";

export type EventOverviewRouteNames =
  | "event-overview"
  | "event-overview_event"
  | "event-overview_phase"
  | "event-overview_unit";

export interface EventOverviewConfig<T> {
  event: {
    defaultRoute: T;
    children: ({ name: T; props: _RouteRecordProps } & RouteRecordRaw)[];
  };
  phase: {
    defaultRoute: T;
    children: ({ name: T; props: _RouteRecordProps } & RouteRecordRaw)[];
  };
  unit: {
    defaultRoute: T;
    children: ({ name: T; props: _RouteRecordProps } & RouteRecordRaw)[];
  };
}

export const defineEventOverviewRoutes = <TRouteNames>(
  definition: EventOverviewConfig<TRouteNames>
): RouteRecordRaw => {
  return {
    name: "event-overview",
    path: "/event-overview",
    component: EventOverview,
    props: (route) => ({
      rsc: route.params?.rsc,
      defaultEventRoute: definition.event.defaultRoute,
      defaultPhaseRoute: definition.phase.defaultRoute,
      defaultUnitRoute: definition.unit.defaultRoute
    }),
    children: [
      {
        name: "event-overview_event",
        path: "event/:rsc",
        component: {},
        children: definition.event.children
      },
      {
        name: "event-overview_phase",
        path: "phase/:rsc",
        component: {},
        children: definition.phase.children
      },
      {
        name: "event-overview_unit",
        path: "unit/:rsc",
        component: {},
        children: definition.unit.children
      }
    ]
  };
};
