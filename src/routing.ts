import { _RouteRecordProps, RouteComponent, RouteRecordRaw } from "vue-router";

import EventOverview from "./pages/EventOverview.vue";

export type EventOverviewRouteNames =
  | "event-overview"
  | "event-overview_event"
  | "event-overview_phase"
  | "event-overview_unit";

export interface IEventOverviewContextItem<T> {
  defaultRouteName: T;
  component: RouteComponent;
  children?: ({ name: T; props: _RouteRecordProps } & RouteRecordRaw)[];
}

export interface IEventOverviewContextConfig<T> {
  component?: RouteComponent;
  event: IEventOverviewContextItem<T>;
  phase: IEventOverviewContextItem<T>;
  unit: IEventOverviewContextItem<T>;
}

export const createEventOverviewRoutes = <TRouteNames>(
  config: IEventOverviewContextConfig<TRouteNames>
): RouteRecordRaw => {
  return {
    name: "event-overview",
    path: "/event-overview",
    component: config.component ?? EventOverview,
    props: (route) => ({
      rsc: route.params?.rsc,
      defaultEventRouteName: config.event.defaultRouteName,
      defaultPhaseRouteName: config.phase.defaultRouteName,
      defaultUnitRouteName: config.unit.defaultRouteName
    }),
    children: [
      {
        name: "event-overview_event",
        path: "event/:rsc",
        component: config.event.component,
        children: config.event.children
      },
      {
        name: "event-overview_phase",
        path: "phase/:rsc",
        component: config.phase.component,
        children: config.phase.children
      },
      {
        name: "event-overview_unit",
        path: "unit/:rsc",
        component: config.unit.component,
        children: config.unit.children
      }
    ]
  };
};
