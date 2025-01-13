<template>
  <ul ref="container">
    <CompetitionTreeNode
      v-for="childNode in sortedRootNodeList"
      :key="childNode.Rsc"
      :sort-prop
      :rsc-path="[childNode.Rsc]"
      :node="childNode"
      :node-path
      :selected-key
      @node-click="emit('nodeClick', $event)"
    >
      <template
        #default="{
          slotProps
        }: {
          slotProps: {
            node: ICompStructItem;
            isActive: boolean;
            depth: number;
          };
        }"
      >
        <slot :slot-props></slot>
      </template>
    </CompetitionTreeNode>
  </ul>
</template>

<script setup lang="ts">
import { sortBy } from "lodash-es";
import { computed, onMounted, useTemplateRef } from "vue";

import { ICompStructItem } from "../interfaces/compstruct.interface";
import CompetitionTreeNode from "./CompetitionTreeNode.vue";

const props = withDefaults(
  defineProps<{
    rootNode?: ICompStructItem[];
    selectedKey?: string;
    nodePath?: string[];
    sortProp?: string;
    autoScroll?: boolean;
  }>(),
  {
    rootNode: undefined,
    selectedKey: undefined,
    nodePath: () => ["Phases", "Units", "Subunits"],
    sortProp: "ListIndex",
    autoScroll: true
  }
);

const container = useTemplateRef("container");

const sortedRootNodeList = computed(() =>
  props.sortProp ? sortBy(props.rootNode, props.sortProp) : props.rootNode
);

const scrollToActiveTreeNode = () => {
  container.value
    ?.querySelector(".x--active")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
};

onMounted(() => {
  if (props.autoScroll) {
    scrollToActiveTreeNode();
  }
});

const emit = defineEmits<{
  (e: "nodeClick", path: string[]): void;
}>();
</script>

<style></style>
