<template>
  <router-link
    class="base-link"
    :to="to"
  >
    <slot />
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<style lang="scss" scoped>
.base-link {
  text-decoration: none;
  color: inherit;
}
</style>
