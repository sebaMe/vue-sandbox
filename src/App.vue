<template>
  <div
    class="bg-content bg-secondary flex min-h-screen flex-col overflow-hidden font-content"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
