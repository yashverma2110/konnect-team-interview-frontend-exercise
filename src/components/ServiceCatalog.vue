<template>
  <div class="service-catalog">
    <div class="service-catalog__header">
      <BaseTypography
        size="xl"
        tag="h1"
        weight="bold"
      >
        Service Hub
      </BaseTypography>
      <div class="service-catalog__header-actions">
        <BaseDropdown
          :options="sortByOptions"
          size="sm"
          title="Sort By"
          @select="handleSortBySelection"
        />
        <BaseDropdown
          :options="SORT_ORDER"
          size="sm"
          title="Sort Order"
          @select="handleSortOrderSelection"
        />
        <BaseInput
          v-model="searchQuery"
          data-testid="search-input"
          icon="search"
          placeholder="Search"
        >
          <template #leading-icon>
            <FontAwesomeIcon
              :icon="faSearch"
            />
          </template>
        </BaseInput>

        <BaseButton
          rounded="full"
          variant="primary"
        >
          <FontAwesomeIcon
            class="service-catalog__header-actions-button-icon"
            :icon="faPlus"
          />
          <BaseTypography
            color="white"
            size="base"
            tag="span"
            weight="semibold"
          >
            Service Package
          </BaseTypography>
        </BaseButton>
      </div>
    </div>
    <p>
      <BaseTypography
        size="base"
        tag="span"
        weight="regular"
      >
        Organize services, manage and track versioning and API service documentation.
      </BaseTypography>
      <BaseLink to="/learn-more">
        <BaseTypography
          color="accent"
          size="base"
          tag="span"
          weight="regular"
        >
          Learn more
        </BaseTypography>
      </BaseLink>
    </p>
    <ul
      v-if="servicesStore.servicesToDisplay.length > 0"
      class="catalog"
    >
      <li
        v-for="service in servicesStore.servicesToDisplay"
        :key="service.id"
        class="catalog__item"
      >
        <BaseLink :to="`/service/${service.id}`">
          <ServiceDetailsCard :service="service" />
        </BaseLink>
      </li>
    </ul>
    <div
      v-else
      data-testid="no-results"
    >
      No services
    </div>

    <div class="service-catalog__pagination">
      <BasePagination
        :page-number="servicesStore.paginationConfig.pageNumber"
        :records-per-page="servicesStore.paginationConfig.recordsPerPage"
        :total-records="servicesStore.totalServices"
        @next="servicesStore.nextPage"
        @page-click="servicesStore.setPageNumber"
        @previous="servicesStore.previousPage"
        @records-per-page-change="servicesStore.setRecordsPerPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseLink from '@/components/ui/BaseLink.vue'
import BaseTypography from '@/components/ui/BaseTypography.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import ServiceDetailsCard from '@/components/molecules/ServiceDetailsCard.vue'
import useServices from '@/composables/useServices'
import BasePagination from '@/components/ui/BasePagination.vue'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import useServicesStore from '@/stores/services'
import debounce from '@/utils/debounce'
import type { SortKey } from '@/types/AppTypes'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const searchQuery = ref('')

const { loading, fetchServices } = useServices()
const servicesStore = useServicesStore()

const sortByOptions = computed<{ label: string; value: SortKey }[]>(() => [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Uptime',
    value: 'metrics:uptime',
  },
  {
    label: 'Latency',
    value: 'metrics:latency',
  },
  {
    label: 'Requests',
    value: 'metrics:requests',
  },
  {
    label: 'Errors',
    value: 'metrics:errors',
  },
])

const SORT_ORDER: { label: string; value: 'asc' | 'desc' }[] = [
  {
    label: 'Ascending',
    value: 'asc',
  },
  {
    label: 'Descending',
    value: 'desc',
  },
]

onBeforeMount(async () => {
  await fetchAndStoreServices()
})

const debouncedFetchAndStoreServices = debounce(fetchAndStoreServices, 300)

watch(searchQuery, async () => {
  await debouncedFetchAndStoreServices()
})

async function fetchAndStoreServices() {
  const { success, data } = await fetchServices(searchQuery.value)

  if (success) {
    servicesStore.setAllServices(data)
  }
}

function handleSortBySelection(value: SortKey) {
  servicesStore.setSortKey(value)
}

function handleSortOrderSelection(value: typeof SORT_ORDER[number]['value']) {
  servicesStore.setSortDirection(value)
}
</script>

<style lang="scss" scoped>
@use '@/css/variables/typography.scss' as typography;

.service-catalog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-catalog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.service-catalog__header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.service-catalog__pagination {
  display: flex;
  justify-content: center;
}

.catalog {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0;
}

.service-catalog__header-actions-button-icon {
  font-size: typography.$font-size-base;
  margin-right: 0.5rem;
}
</style>
