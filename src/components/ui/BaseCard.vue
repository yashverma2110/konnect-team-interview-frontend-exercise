<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../../css/variables/background.scss' as vars;

.card {
  background: vars.$white;
  padding: 1.25rem;
  border-radius: 0.125rem;
}
</style>
