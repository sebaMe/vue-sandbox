<template>
  <ul>
    <CompetitionTreeNode
      v-for="childNode in sortedRootNodeList"
      :key="childNode.Rsc"
      :sort-prop
      :path="[childNode.Rsc]"
      :node="childNode"
      :active-keys
      @node-click="emit('nodeClick', $event)"
    >
      <template #default="{ slotProps }">
        <slot :slot-props></slot>
      </template>
    </CompetitionTreeNode>
  </ul>
</template>

<script setup lang="ts">
import { sortBy } from "lodash-es";
import { computed } from "vue";

import { ICompStructItem } from "../interfaces/compstruct.interface";
import CompetitionTreeNode from "./CompetitionTreeNode.vue";

const props = withDefaults(
  defineProps<{
    activeKeys?: string[];
    rootNode?: { [rsc: string]: ICompStructItem };
    sortProp?: string;
  }>(),
  {
    activeKeys: () => [],
    rootNode: undefined,
    sortProp: "ListIndex"
  }
);

const rootNodeList = computed(() => Object.values(props.rootNode ?? {}));
const sortedRootNodeList = computed(() =>
  props.sortProp
    ? sortBy(rootNodeList.value, props.sortProp)
    : rootNodeList.value
);

const emit = defineEmits<{
  (e: "nodeClick", path: string[]): void;
}>();
</script>

<style></style>
