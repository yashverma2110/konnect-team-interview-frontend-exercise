<template>
  <div class="dropdown">
    <button
      class="dropdown__button"
      @click="isOpen = !isOpen"
    >
      <BaseTypography
        :size="props.size"
        tag="span"
        weight="semibold"
      >
        {{ title }}:
      </BaseTypography>
      <BaseTypography
        :size="props.size"
        tag="span"
        weight="regular"
      >
        {{ selectedOption }}
      </BaseTypography>

      <FontAwesomeIcon
        class="dropdown__button-icon"
        :class="{ open: isOpen }"
        :icon="faCaretDown"
      />
    </button>

    <ul
      v-if="isOpen"
      class="dropdown__options"
      :class="dropdownDirection"
    >
      <li
        v-for="(option, index) in options"
        :key="option.value"
        class="dropdown__option"
        tabindex="0"
      >
        <button
          @click="handleSelect(option.value, index)"
          @keydown.enter="handleSelect(option.value, index)"
          @keydown.space.prevent="handleSelect(option.value, index)"
        >
          <BaseTypography
            :size="props.size"
            tag="div"
            weight="regular"
          >
            {{ option.label }}
          </BaseTypography>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseTypography from '@/components/ui/BaseTypography.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

interface IOption<T> {
  label: string | number
  value: T
}
interface IDropdownProps<T> {
  title: string
  options: IOption<T>[]
  size: 'xs' | 'sm' | 'base' | 'xl' | 'lg'
  direction?: 'top' | 'bottom'
  selectedOption?: number
}

const props = withDefaults(defineProps<IDropdownProps<string | number>>(), {
  size: 'base',
  direction: 'bottom',
  selectedOption: 0,
})

const emit = defineEmits<{
  <T extends string | number>(e: 'select', value: T): void
}>()

const isOpen = ref(false)
const selectedOptionIndex = ref(props.selectedOption)

const dropdownDirection = computed(() => {
  return props.direction === 'top' ? 'dropdown__options_top' : 'dropdown__options_bottom'
})

const selectedOption = computed(() => {
  const selectedOptionLabel = props.options[selectedOptionIndex.value]?.label ?? props.options[0]?.label

  return selectedOptionLabel
})

function handleSelect(value: string | number, index: number) {
  selectedOptionIndex.value = index
  emit('select', value)
  isOpen.value = false
}
</script>

<style scoped lang="scss">
@use '@/css/variables/background.scss' as vars;
@use '@/css/variables/colors.scss' as colors;

.dropdown {
  position: relative;
}

.dropdown__button {
  height: 100%;
  background: vars.$white;
  border: 1px solid colors.$border-color;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown__options_top {
  bottom: 100%;
}

.dropdown__options_bottom {
  top: 100%;
}

.dropdown__options {
  position: absolute;
  left: 0;
  background: vars.$white;
  margin: 0;
  padding: 0;
  min-width: 100%;
  width: fit-content;
  border: 1px solid colors.$border-color;
  border-radius: 0.25rem;
}

.dropdown__option {
  list-style: none;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    min-width: 100%;
    width: fit-content;
    padding: 0.75rem 1rem;
  }

  &:hover {
    background: vars.$gray;
  }
}

.dropdown__button-icon {
  transition: transform 0.1s ease-in-out;
  margin-left: 0.5rem;

  &.open {
    transform: rotate(180deg);
  }
}
</style>
