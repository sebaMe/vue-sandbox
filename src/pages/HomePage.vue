<template>
  <div class="flex">
    <CompetitionTree
      :root-node="compStruct"
      :active-keys="activeKeys"
      @node-click="onNodeClick"
    >
      <template #default="{ slotProps }">
        <div
          class="mt-1 px-2"
          :class="{ 'bg-blue-700 text-white': slotProps.active }"
          :style="{ marginLeft: `${slotProps.depth / 2}rem` }"
        >
          {{ slotProps.node.Name ?? "Result" }}
        </div>
      </template>
    </CompetitionTree>
    <div class="flex-1">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from "lodash-es";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import compStructJson from "../assets/jsons/EXAMPLE_COMPSTRUCT_JSON.json";
import CompetitionTree from "../components/CompetitionTree.vue";

const router = useRouter();
const route = useRoute();

const compStruct = ref(compStructJson.Events);

const activeKeys = computed(() => {
  return Object.values(route.params ?? {}).filter((param) => !isEmpty(param));
});

const onNodeClick = (path: string[]) => {
  if (path.length > 0) {
    router.push(`/results/${path.join("/")}`);
  }
};
</script>

<style lang="scss"></style>
