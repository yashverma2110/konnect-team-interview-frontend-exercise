<template>
  <div class="base-input__wrapper">
    <slot
      class="base-input__leading-icon"
      name="leading-icon"
    />
    <input
      class="base-input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="handleInput"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="scss">
@use '@/css/variables/background.scss' as vars;
@use '@/css/variables/colors.scss' as colors;
@use '@/css/variables/typography.scss' as typography;
@use '@/css/variables/breakpoints.scss' as breakpoints;

.base-input__wrapper {
  background: vars.$white;
  padding: 0.625rem 1rem 0.625rem 0.5rem;
  border: 1px solid colors.$border-color;
  border-radius: 0.25rem;
  color: colors.$text-color-secondary;
  font-size: typography.$font-size-sm;
}

.base-input {
  border: none;
  outline: none;
  margin-left: 0.4rem;
}

@media (max-width: breakpoints.$breakpoint-md) {
  .base-input__wrapper {
    width: 100%;
  }
}
</style>
