<template>
  <button
    class="button"
    :class="[
      buttonVariant,
      { 'button_outlined': props.type === 'outlined' },
      { 'button_rounded-full': props.rounded === 'full' },
      { 'button_rounded-semi': props.rounded === 'semi' },
      { 'button_disabled': props.disabled },
    ]"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IBaseButtonProps {
  variant: 'primary' | 'secondary' | 'accent' | 'white' | 'transparent'
  type?: 'filled' | 'outlined'
  rounded?: 'base' | 'full' | 'semi'
  disabled?: boolean
}

const props = withDefaults(defineProps<IBaseButtonProps>(), {
  type: 'filled',
  rounded: 'base',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const buttonVariant = computed(() => {
  switch (props.variant) {
    case 'primary':
    default:
      return 'button_primary'
    case 'secondary':
      return 'button_secondary'
    case 'accent':
      return 'button_accent'
    case 'white':
      return 'button_white'
    case 'transparent':
      return 'button_transparent'
  }
})
</script>

<style lang="scss" scoped>
@use '@/css/variables/background.scss' as vars;
@use '@/css/variables/colors.scss' as colors;
@use '@/css/variables/typography.scss' as typography;
@use '@/css/variables/breakpoints.scss' as breakpoints;

.button {
  border-radius: 0.25rem;
  color: vars.$white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  min-width: 2rem;
  width: fit-content;

  &.button_rounded-full {
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;

    &.button_disabled {
      border: 1px solid colors.$border-color;
      color: colors.$text-color-secondary;
    }
  }

  &.button_rounded-semi {
    border-radius: 100px;
  }

  &.button_disabled {
    background: colors.$border-color;
    color: colors.$text-color-secondary;
  }
}

.button_primary {
  background: colors.$green-primary;

  &.button_outlined {
    background: transparent;
    border: 1px solid colors.$green-primary;
    color: colors.$green-primary;
  }
}

.button_secondary {
  background: colors.$blue-secondary;

  &.button_outlined {
    background: transparent;
    border: 1px solid colors.$blue-secondary;
    color: colors.$blue-secondary;
  }
}

.button_accent {
  background: colors.$blue-primary;

  &.button_outlined {
    background: transparent;
    border: 1px solid colors.$blue-primary;
    color: colors.$blue-primary;
  }
}

.button_white {
  background: colors.$white;
  color: colors.$text-color-primary;
  border: 1px solid colors.$border-color;

  &.button_outlined {
    background: transparent;
    border: 1px solid colors.$white;
    color: colors.$white;
  }
}

.button_transparent {
  background: transparent;
  padding: 0;
}

@media (max-width: breakpoints.$breakpoint-md) {
  .button {
    width: 100%;
  }
}
</style>
