import "./style.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";
import { defineEventOverviewRoutes, EventOverviewRouteNames } from "./routing";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");

type SportEventOverviewRouteNames =
  | EventOverviewRouteNames
  | "event-overview_event_entry-list"
  | "event-overview_phase_summary"
  | "event-overview_unit_results";

const routes = defineEventOverviewRoutes<SportEventOverviewRouteNames>({
  event: {
    defaultRoute: "event-overview_event_entry-list",
    children: [
      {
        name: "event-overview_event_entry-list",
        path: "entry-list",
        component: {},
        props: true
      }
    ]
  },
  phase: {
    defaultRoute: "event-overview_phase_summary",
    children: [
      {
        name: "event-overview_phase_summary",
        path: "summary",
        component: {},
        props: true
      }
    ]
  },
  unit: {
    defaultRoute: "event-overview_unit_results",
    children: [
      {
        name: "event-overview_unit_results",
        path: "result",
        component: {},
        props: true
      }
    ]
  }
});

console.log(routes);
