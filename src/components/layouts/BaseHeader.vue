<template>
  <header class="header">
    <router-link to="/">
      <img
        alt="logo"
        class="logo"
        src="/logo.webp"
      >
    </router-link>

    <nav class="header__actions">
      <BaseTypography
        color="white"
        size="sm"
        tag="span"
        weight="medium"
      >
        <FontAwesomeIcon :icon="faUserGroup" />
        Organization
      </BaseTypography>
      <BaseTypography
        color="white"
        size="sm"
        tag="span"
        weight="medium"
      >
        <FontAwesomeIcon :icon="faGear" />
        Settings
      </BaseTypography>
      <div class="header__actions-user">
        <img
          alt="avatar"
          class="header__actions-user-avatar"
          src="/user.webp"
        >
        <BaseTypography
          color="white"
          size="sm"
          tag="span"
          weight="medium"
        >
          Katherine Ellis
        </BaseTypography>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import BaseTypography from '@/components/ui/BaseTypography.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faUserGroup } from '@fortawesome/free-solid-svg-icons'

</script>

<style lang="scss" scoped>
@use '@/css/variables/background.scss' as vars;

.header {
  height: 70px;
  display: flex;
  align-items: center;
  background: vars.$gradient-primary;
}

.logo {
  height: 1.5rem;
}

.header__actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__actions-user {
  background: vars.$theme-color;
  padding: 1.25rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__actions-user-avatar {
  height: 1.875rem;
}
</style>
