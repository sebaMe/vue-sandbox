<template>
  <li>
    <div class="cursor-pointer" @click="emit('nodeClick', path)">
      <slot :slot-props="{ node, depth }"></slot>
    </div>
    <Transition appear name="slide-in">
      <ul v-if="sortedChildNodeList?.length > 0 && isActive">
        <CompetitionTreeNode
          v-for="childNode in sortedChildNodeList"
          :key="childNode.Rsc"
          :node="childNode"
          :path="[...path, childNode.Rsc]"
          :active-keys
          :sort-prop
          :depth="depth + 1"
          @node-click="($event) => emit('nodeClick', $event)"
        >
          <template #default="{ slotProps }">
            <slot :slot-props></slot>
          </template>
        </CompetitionTreeNode>
      </ul>
    </Transition>
  </li>
</template>

<script setup lang="ts">
import { sortBy } from "lodash-es";
import { computed } from "vue";

import { ICompStructItem } from "../interfaces/compstruct.interface";

const props = withDefaults(
  defineProps<{
    activeKeys?: string[];
    path?: string[];
    node: ICompStructItem;
    sortProp?: string;
    depth?: number;
  }>(),
  {
    activeKeys: () => [],
    path: () => [],
    node: undefined,
    sortProp: "ListIndex",
    depth: 0
  }
);

const isActive = computed(() => props.activeKeys.includes(props.node?.Rsc));

const nodePath = ["Phases", "Units", "Subunits"];
const childNodeProp = computed(() => nodePath[props.depth]);
const childNodeList = computed<ICompStructItem[]>(() =>
  Object.values(props.node?.[childNodeProp.value] ?? {})
);

const sortedChildNodeList = computed(() =>
  props.sortProp
    ? sortBy(childNodeList.value, props.sortProp)
    : childNodeList.value
);

const emit = defineEmits<{
  (e: "nodeClick", path: string[]): void;
}>();
</script>

<style lang="scss">
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-in-enter-active {
  transition: all 0.3s ease-out;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-5px);
  opacity: 0;
}
</style>
