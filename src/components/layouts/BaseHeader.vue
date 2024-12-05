<template>
  <header class="header">
    <router-link to="/">
      <img
        alt="logo"
        class="logo"
        src="/logo.webp"
      >
    </router-link>
  </header>
</template>

<style lang="scss" scoped>
@use '../../css/variables/background.scss' as vars;

.header {
  height: 70px;
  display: flex;
  align-items: center;
  background: vars.$gradient-primary;
}

.logo {
  height: 25px;
}
</style>
