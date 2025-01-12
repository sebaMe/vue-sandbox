<template>
  <div
    class="bg-content bg-secondary absolute inset-0 flex flex-col overflow-hidden font-content"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
