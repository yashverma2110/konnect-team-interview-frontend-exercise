<template>
  <div class="pagination">
    <div class="pagination__buttons">
      <BaseButton
        :disabled="props.pageNumber === 1"
        rounded="full"
        type="outlined"
        variant="accent"
        @click="emit('previous')"
      >
        <FontAwesomeIcon :icon="faArrowLeft" />
      </BaseButton>

      <!-- List of pages -->
      <ul class="pagination__pages">
        <li
          v-for="page in listOfPages"
          :key="page"
        >
          <BaseButton
            :disabled="page === '...'"
            variant="white"
            @click="handlePageClick(page)"
          >
            <BaseTypography
              size="sm"
              tag="span"
              :weight="page === props.pageNumber ? 'bold' : 'regular'"
            >
              {{ page === '...' ? '...' : page }}
            </BaseTypography>
          </BaseButton>
        </li>
      </ul>

      <BaseButton
        :disabled="props.pageNumber === totalPages"
        rounded="full"
        type="outlined"
        variant="accent"
        @click="emit('next')"
      >
        <FontAwesomeIcon :icon="faArrowRight" />
      </BaseButton>
    </div>
    <BaseDropdown
      direction="top"
      :options="getRecordsPerPageOptions()"
      size="sm"
      title="Records per page"
      @select="handleRecordsPerPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import BaseTypography from '@/components/ui/BaseTypography.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import { computed } from 'vue'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface IPaginationProps {
  recordsPerPage: number
  totalRecords: number
  pageNumber: number
}
const props = defineProps<IPaginationProps>()

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'previous'): void
  (e: 'page-click', page: number): void
  (e: 'records-per-page-change', recordsPerPage: number): void
}>()

const recordsPerPageOptions = [10, 20, 30, 40, 50]

const totalPages = computed(() => Math.ceil(props.totalRecords / props.recordsPerPage))
const listOfPages = computed(() => {
  const pageList: (number | string)[] = []
  const currentPage = props.pageNumber
  const total = totalPages.value

  // Add the first page if currentPage is beyond 3
  if (currentPage > 3) {
    pageList.push(1)
  }

  // Add leading ellipsis if needed
  if (currentPage > 4) {
    pageList.push('...')
  }

  // Calculate the range of pages to show around the current page
  const rangeStart = Math.max(1, currentPage - 1)
  const rangeEnd = Math.min(total, currentPage + 1)

  // Add pages in the calculated range
  for (let page = rangeStart; page <= rangeEnd; page++) {
    pageList.push(page)
  }

  // Add trailing ellipsis if needed
  if (currentPage < total - 3) {
    pageList.push('...')
  }

  // Add the last page if currentPage is sufficiently far from the end
  if (currentPage < total - 2) {
    pageList.push(total)
  }

  return pageList
})

function getRecordsPerPageOptions() {
  return recordsPerPageOptions.map((option) => ({
    label: option,
    value: option,
  }))
}

function handlePageClick(page: number | string) {
  if (typeof page === 'number') {
    emit('page-click', page)
  }
}

function handleRecordsPerPageChange(recordsPerPage: number) {
  emit('records-per-page-change', recordsPerPage)
}
</script>

<style scoped lang="scss">
@use '@/css/variables/breakpoints.scss' as breakpoints;

.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pagination__pages {
  display: flex;
  align-items: center;
  list-style: none;
  padding-inline-start: 0;
}

.pagination__buttons {
  display: flex;
  gap: 1rem;
  height: 2.5rem;
}

@media (max-width: breakpoints.$breakpoint-md) {
  .pagination {
    flex-direction: column;
  }
}
</style>
