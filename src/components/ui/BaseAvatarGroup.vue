<template>
  <div class="avatar-group">
    <div
      v-if="remainingCount > 0"
      class="avatar-wrapper avatar-remaining"
      :style="{ zIndex: visibleAvatars.length + 2, left: '0px' }"
    >
      <BaseTypography
        color="secondary"
        size="sm"
        tag="span"
        weight="semibold"
      >
        +{{ remainingCount }}
      </BaseTypography>
    </div>
    <div
      v-for="(avatar, index) in visibleAvatars"
      :key="avatar.src"
      class="avatar-wrapper"
      :style="{ zIndex: visibleAvatars.length - index + 1, left: `${(index + 1) * 16}px` }"
    >
      <img
        :alt="avatar.alt"
        class="avatar"
        :src="avatar.src"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseTypography from '@/components/ui/BaseTypography.vue'

const props = defineProps<{
  avatars: { src: string; alt: string }[]
}>()

const visibleAvatars = computed(() => props.avatars.slice(0, 2))
const remainingCount = computed(() => Math.max(0, props.avatars.length - 2))
</script>

<style scoped lang="scss">
@use '@/css/variables/typography.scss' as typography;
@use '@/css/variables/background.scss' as background;
@use '@/css/variables/colors.scss' as colors;

.avatar-group {
  display: flex;
  align-items: center;
  position: relative;
  height: 2.25rem;
  width: 3rem;
}

.avatar-wrapper {
  position: absolute;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-remaining {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: background.$gray-secondary;
  border: 1px solid colors.$white
}
</style>