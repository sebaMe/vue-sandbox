<template>
  <div class="flex overflow-hidden">
    <router-link :to="{ name: 'competition-tree' }">
      <template #default="{ isActive }">
        <div :class="{ 'bg-slate-200': isActive }">Test</div>
      </template>
    </router-link>
    <div class="overflow-auto">
      <CompetitionTree
        :root-node="compStruct"
        :active-keys="activeKeys"
        @node-click="onNodeClick"
      >
        <template #default="{ slotProps }">
          <div
            class="mt-1 px-2"
            :class="{
              'bg-blue-700 text-white': activeKeys.includes(slotProps.node?.Rsc)
            }"
            :style="{ marginLeft: `${slotProps.depth / 2}rem` }"
          >
            <span class="mr-2">{{ slotProps.depth }}</span>
            <span>{{ slotProps.node.Name ?? "Result" }}</span>
          </div>
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
import { computed, onMounted, ref } from "vue";

import compStructJson from "../assets/jsons/EXAMPLE_COMPSTRUCT_JSON.json";
import CompetitionTree from "../components/CompetitionTree.vue";
import { toEventTreeRoute } from "../router";
import { isEventRsc, isPhaseRsc, isUnitRsc } from "../utils/rsc.utils";

const props = withDefaults(
  defineProps<{
    event?: string;
    phase?: string;
    unit?: string;
  }>(),
  {
    event: undefined,
    phase: undefined,
    unit: undefined
  }
);

const compStruct = ref(compStructJson.Events);

const activeKeys = computed(() => {
  return [props.event, props.phase, props.unit];
});

onMounted(() => {
  document
    .querySelector(".x--active")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
});

const onNodeClick = (path: string[]) => {
  if (path.length > 0) {
    if (isEventRsc(path.at(-1))) {
      toEventTreeRoute("competition-tree_event_result", path);
    }
    if (isPhaseRsc(path.at(-1))) {
      toEventTreeRoute("competition-tree_phase_result", path);
    }
    if (isUnitRsc(path.at(-1))) {
      toEventTreeRoute("competition-tree_unit_result", path);
    }
  }
};
</script>

<style lang="scss"></style>
