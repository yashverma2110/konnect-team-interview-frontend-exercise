<template>
  <BaseHeader />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/layouts/BaseHeader.vue'
</script>

<style lang="scss">
@use '@/css/variables/background.scss' as vars;

// Unscoped styles for html and body
html,
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overscroll-behavior: none;
  height: 100vh;
  background: vars.$gray;
}

main {
  padding: 2.5rem;
}
</style>
