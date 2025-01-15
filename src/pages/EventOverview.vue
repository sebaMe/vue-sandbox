<template>
  <div class="flex overflow-hidden">
    <div class="overflow-auto">
      <CompetitionTree
        :root-node="eventList"
        :selected-key="rsc"
        @node-click="onNodeClick"
      >
        <template #default="{ slotProps }">
          <router-link
            class="mt-1 px-2"
            :class="{
              'bg-blue-700 text-white': slotProps.isActive
            }"
            :style="{ marginLeft: `${slotProps.depth / 2}rem` }"
            :to="getContextRouteTo(slotProps.node.Rsc)"
          >
            <span class="mr-2">{{ slotProps.depth }}</span>
            <span>{{ slotProps.node.Name ?? "Result" }}</span>
          </router-link>
        </template>
      </CompetitionTree>
    </div>

    <div class="flex-1">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import compStructJson from "../assets/jsons/EXAMPLE_COMPSTRUCT_JSON.json";
import CompetitionTree from "../components/CompetitionTree.vue";
import { toEventTreeRoute } from "../router";
import { isEventRsc, isPhaseRsc, isUnitRsc } from "../utils/rsc.utils";

withDefaults(
  defineProps<{
    rsc?: string;
  }>(),
  {
    rsc: undefined
  }
);

const eventList = computed(() => Object.values(compStructJson.Events ?? {}));

const getContextRouteTo = (rsc: string) => {
  if (isEventRsc(rsc)) {
    return toEventTreeRoute("competition-tree_event_result", { rsc });
  }
  if (isPhaseRsc(rsc)) {
    return toEventTreeRoute("competition-tree_phase_result", { rsc });
  }
  if (isUnitRsc(rsc)) {
    return toEventTreeRoute("competition-tree_unit_result", { rsc });
  }
  return toEventTreeRoute("competition-tree");
};

const onNodeClick = (path: string[]) => {
  console.log(path);
};
</script>

<style lang="scss"></style>
