<template>
  <div
    class="pill"
    :class="[pillClass, {
      'rounded-full': props.rounded === 'full',
    }]"
  >
    <BaseTypography
      :color="textColorClass"
      :data-testid="props.testId"
      size="sm"
      tag="p"
      weight="semibold"
    >
      {{ props.label }}
    </BaseTypography>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseTypography from '@/components/ui/BaseTypography.vue'

const props = withDefaults(defineProps<{
  label: string
  variant?: 'primary' | 'secondary'
  rounded?: 'full' | 'base'
  testId?: string
}>(), {
  variant: 'primary',
  rounded: 'base',
})

const pillClass = computed(() => {
  switch (props.variant) {
    case 'primary':
    default:
      return 'pill-primary'
    case 'secondary':
      return 'pill-secondary'
  }
})

const textColorClass = computed(() => {
  switch (props.variant) {
    case 'primary':
    default:
      return 'accent'
    case 'secondary':
      return 'accent-secondary'
  }
})
</script>

<style lang="scss" scoped>
@use '@/css/variables/colors.scss' as colors;

.pill {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  width: fit-content;

  &.rounded-full {
    border-radius: 6.25rem;
  }
}
.pill-primary {
  background: colors.$blue-secondary;
}
.pill-secondary {
  background: colors.$blue-primary;
}
</style>
