<template>
  <div>
    <span v-if="isEventRsc(routeParams.at(-1) as string)">Event - </span>
    <span v-if="isPhaseRsc(routeParams.at(-1) as string)">Phase - </span>
    <span v-if="isUnitRsc(routeParams.at(-1) as string)">Unit - </span>
    <span>Results</span>
  </div>
  <div>{{ routeParams }}</div>
</template>

<script setup lang="ts">
import { isEmpty } from "lodash-es";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { isEventRsc, isPhaseRsc, isUnitRsc } from "../utils/rsc.utils";

const route = useRoute();

const routeParams = computed(() => {
  return Object.values(route.params ?? {}).filter((param) => !isEmpty(param));
});
</script>

<style lang="scss"></style>
