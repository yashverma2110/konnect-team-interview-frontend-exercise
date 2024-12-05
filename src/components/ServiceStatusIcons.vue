<template>
  <FontAwesomeIcon
    v-if="getServiceStatus(props.service) === 'published'"
    class="service-details-card__status-identifier-icon success"
    :class="props.size"
    :icon="faCheck"
  />
  <FontAwesomeIcon
    v-if="getServiceStatus(props.service) === 'unpublished'"
    class="service-details-card__status-identifier-icon draft"
    :class="props.size"
    :icon="faTimes"
  />
  <FontAwesomeIcon
    v-if="getServiceStatus(props.service) === 'in-progress'"
    class="service-details-card__status-identifier-icon loading"
    :class="props.size"
    :icon="faCircleNotch"
  />
</template>

<script setup lang="ts">
import useServices from '@/composables/useServices'
import type { IService } from '@/types/IService'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'

const props = withDefaults(defineProps<{
  service: IService
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
}>(), {
  size: 'base',
})

const { getServiceStatus } = useServices()
</script>

<style scoped lang="scss">
@use '@/css/variables/colors.scss' as colors;
@use '@/css/variables/typography.scss' as typography;

.service-details-card__status-identifier-icon {
  &.success {
    color: colors.$green-primary;
  }

  &.loading {
    color: colors.$yellow-primary;
  }

  &.draft {
    color: colors.$text-color-secondary;
  }

  &.xs {
    font-size: typography.$font-size-xs;
  }

  &.sm {
    font-size: typography.$font-size-sm;
  }

  &.base {
    font-size: typography.$font-size-base;
  }

  &.lg {
    font-size: typography.$font-size-lg;
  }

  &.xl {
    font-size: typography.$font-size-xl;
  }
}
</style>
