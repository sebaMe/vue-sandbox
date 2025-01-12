<template>
  <div>
    <span v-if="isEventRsc(event)">Event - </span>
    <span v-if="isPhaseRsc(phase)">Phase - </span>
    <span v-if="isUnitRsc(unit)">Unit - </span>
    <span>Results</span>
  </div>
  <div>{{ event }} {{ phase }} {{ unit }}</div>
</template>

<script setup lang="ts">
import { isEventRsc, isPhaseRsc, isUnitRsc } from "../utils/rsc.utils";

withDefaults(
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
</script>

<style lang="scss"></style>
