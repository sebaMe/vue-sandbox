<template>
  <li :class="{ 'x--active': isActive }">
    <div class="cursor-pointer" @click="emit('nodeClick', rscPath)">
      <slot :slot-props="{ node, isActive, depth }"></slot>
    </div>
    <Transition appear name="slide-in">
      <ul v-if="sortedChildNodeList?.length > 0" v-show="isActive">
        <CompetitionTreeNode
          v-for="childNode in sortedChildNodeList"
          :key="childNode.Rsc"
          :node="childNode"
          :rsc-path="[...rscPath, childNode.Rsc]"
          :selected-key
          :sort-prop
          :node-path
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
import { getAncestorRscList } from "../utils/rsc.utils";

const props = withDefaults(
  defineProps<{
    node: ICompStructItem;
    selectedKey?: string;
    rscPath?: string[];
    nodePath?: string[];
    sortProp?: string;
    depth?: number;
  }>(),
  {
    node: undefined,
    selectedKey: undefined,
    rscPath: () => [],
    nodePath: () => [],
    sortProp: "ListIndex",
    depth: 0
  }
);

const activeKeys = computed(() => {
  return getAncestorRscList(props.selectedKey);
});
const isActive = computed(() => activeKeys.value.includes(props.node?.Rsc));

const childNodeProp = computed(() => props.nodePath[props.depth]);
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
