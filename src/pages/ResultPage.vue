<template>
  <div>
    <span v-if="isEventRsc(rsc)">Event - </span>
    <span v-if="isPhaseRsc(rsc)">Phase - </span>
    <span v-if="isUnitRsc(rsc)">Unit - </span>
    <span>Results</span>
  </div>
  <div>{{ rsc }}</div>
</template>

<script setup lang="ts">
import { isEventRsc, isPhaseRsc, isUnitRsc } from "../utils/rsc.utils";

withDefaults(
  defineProps<{
    rsc?: string;
  }>(),
  {
    rsc: undefined
  }
);
</script>

<style lang="scss"></style>
