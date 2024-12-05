<template>
  <component
    :is="props.tag"
    class="typography"
    :class="[fontSizeClass, fontWeightClass, textColorClass]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ITypographyProps {
  size: 'xl' | 'lg' | 'base' | 'sm' | 'xs';
  weight: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  color?: 'primary' | 'secondary' | 'accent' | 'accent-secondary' | 'white';
}
const props = withDefaults(defineProps<ITypographyProps>(), {
  size: 'base',
  weight: 'regular',
  tag: 'p',
  color: 'primary',
})

// #region computed
const fontSizeClass = computed(() => {
  switch (props.size) {
    case 'xl':
      return 'font-size-xl'
    case 'lg':
      return 'font-size-lg'
    case 'base':
    default:
      return 'font-size-base'
    case 'sm':
      return 'font-size-sm'
    case 'xs':
      return 'font-size-xs'
  }
})

const fontWeightClass = computed(() => {
  switch (props.weight) {
    case 'light':
      return 'font-weight-light'
    case 'regular':
      return 'font-weight-regular'
    case 'medium':
      return 'font-weight-medium'
    case 'semibold':
      return 'font-weight-semibold'
    case 'bold':
      return 'font-weight-bold'
    default:
      return 'font-weight-regular'
  }
})

const textColorClass = computed(() => {
  switch (props.color) {
    case 'secondary':
      return 'text-color-secondary'
    case 'accent':
      return 'text-color-accent'
    case 'accent-secondary':
      return 'text-color-accent-secondary'
    case 'white':
      return 'text-color-white'
    case 'primary':
    default:
      return 'text-color-primary'
  }
})
// #endregion
</script>

<style lang="scss" scoped>
@use '@/css/variables/typography.scss' as vars;
@use '@/css/variables/colors.scss' as colors;

.typography {
  font-family: vars.$font-family-sans;
  margin: 0;
}

.font-size-xl {
  font-size: vars.$font-size-xl;
  line-height: vars.$line-height-xl;
}

.font-size-lg {
  font-size: vars.$font-size-lg;
  line-height: vars.$line-height-lg;
}

.font-size-base {
  font-size: vars.$font-size-base;
  line-height: vars.$line-height-base;
}

.font-size-sm {
  font-size: vars.$font-size-sm;
  line-height: vars.$line-height-sm;
}

.font-size-xs {
  font-size: vars.$font-size-xs;
  line-height: vars.$line-height-xs;
}

.font-weight-light {
  font-weight: vars.$font-weight-light;
}

.font-weight-regular {
  font-weight: vars.$font-weight-regular;
}

.font-weight-medium {
  font-weight: vars.$font-weight-medium;
}

.font-weight-semibold {
  font-weight: vars.$font-weight-semibold;
}

.font-weight-bold {
  font-weight: vars.$font-weight-bold;
}

// Text colors
.text-color-primary {
  color: colors.$text-color-primary;
}

.text-color-secondary {
  color: colors.$text-color-secondary;
}

.text-color-accent {
  color: colors.$blue-primary;
}

.text-color-accent-secondary {
  color: colors.$blue-secondary;
}

.text-color-white {
  color: colors.$white;
}
</style>
