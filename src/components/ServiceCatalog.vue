<template>
  <div
    class="service-catalog"
  >
    <div class="service-catalog__header">
      <BaseTypography
        size="xl"
        tag="h1"
        weight="bold"
      >
        Service Hub
      </BaseTypography>
      <div class="service-catalog__header-actions">
        <div class="service-catalog__header-actions-sort-container">
          <BaseButton
            variant="white"
            @click="debouncedFetchAndStoreServices"
          >
            <FontAwesomeIcon
              class="service-catalog__header-actions-refresh-icon"
              :class="{ 'spin': loading }"
              :icon="faSync"
            />
            <BaseTypography
              size="sm"
              tag="span"
              weight="regular"
            >
              Refresh
            </BaseTypography>
          </BaseButton>
          <BaseDropdown
            :options="AUTO_REFRESH_INTERVAL_OPTIONS"
            size="sm"
            title="Auto Refresh"
            @select="handleAutoRefreshSelection"
          />
          <BaseDropdown
            :options="sortByOptions"
            :selected-option="selectedSortKeyOptionIndex"
            size="sm"
            title="Sort By"
            @select="handleSortBySelection"
          />
          <BaseDropdown
            :options="SORT_ORDER"
            :selected-option="selectedSortOrderOptionIndex"
            size="sm"
            title="Sort Order"
            @select="handleSortOrderSelection"
          />
        </div>

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
    <div
      v-if="loading"
      class="service-catalog__loading-icon-container"
    >
      <FontAwesomeIcon
        class="service-catalog__loading-icon"
        :icon="faSpinner"
      />
    </div>
    <ul
      v-else-if="servicesStore.servicesToDisplay.length > 0"
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
      <BaseCard>
        <BaseTypography
          color="secondary"
          size="base"
          tag="span"
          weight="regular"
        >
          <FontAwesomeIcon
            class="service-catalog__no-results-icon"
            :icon="faExclamationTriangle"
          />
          No services found
        </BaseTypography>
      </BaseCard>
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
import { useRoute, useRouter } from 'vue-router'
import { faExclamationTriangle, faPlus, faSearch, faSpinner, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
import BaseCard from '@/components/ui/BaseCard.vue'
import { AUTO_REFRESH_INTERVAL_OPTIONS, SORT_ORDER, VALID_SORT_KEYS } from '@/config/constants'

const searchQuery = ref('')

const { loading, fetchServices, setAutoRefreshInterval } = useServices()
const servicesStore = useServicesStore()
const route = useRoute()
const router = useRouter()

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

const selectedSortKeyOptionIndex = computed(() => {
  return sortByOptions.value.findIndex((option) => option.value === servicesStore.sortKey)
})

const selectedSortOrderOptionIndex = computed(() => {
  return SORT_ORDER.findIndex((option) => option.value === servicesStore.sortDirection)
})

onBeforeMount(async () => {
  const searchQueryFromRoute = route.query.search?.toString()

  const sortByFromRoute = route.query.sortBy?.toString()
  const sortOrderFromRoute = route.query.sortOrder?.toString()

  if (sortByFromRoute && VALID_SORT_KEYS.includes(sortByFromRoute as SortKey)) {
    servicesStore.setSortKey(sortByFromRoute as SortKey)
  }

  if (sortOrderFromRoute === 'asc' || sortOrderFromRoute === 'desc') {
    servicesStore.setSortDirection(sortOrderFromRoute)
  }

  if (searchQueryFromRoute) {
    searchQuery.value = searchQueryFromRoute
    return
  }


  await fetchAndStoreServices()

  setAutoRefreshInterval(5)
})

const debouncedFetchAndStoreServices = debounce(fetchAndStoreServices, 300)

watch(searchQuery, async () => {
  await debouncedFetchAndStoreServices()
})

async function fetchAndStoreServices() {
  const { success, data } = await fetchServices(searchQuery.value)

  if (success) {
    servicesStore.setAllServices(data)
    servicesStore.setSearchQuery(searchQuery.value)
    if (searchQuery.value) {
      appendQueryParam('search', searchQuery.value)
    } else {
      removeQueryParam('search')
    }
  }
}

function handleSortBySelection(value: SortKey) {
  servicesStore.setSortKey(value)
  appendQueryParam('sortBy', value)
}

function handleSortOrderSelection(value: typeof SORT_ORDER[number]['value']) {
  servicesStore.setSortDirection(value)
  appendQueryParam('sortOrder', value)
}

function appendQueryParam(key: string, value: string) {
  const currentQueryParams = route.query

  router.replace({ query: { ...currentQueryParams, [key]: value } })
}

function removeQueryParam(key: string) {
  const currentQueryParams = router.currentRoute.value.query

  router.replace({ query: { ...currentQueryParams, [key]: undefined } })
}

function handleAutoRefreshSelection(value: number) {
  setAutoRefreshInterval(value)
}
</script>

<style lang="scss" scoped>
@use '@/css/variables/colors.scss' as colors;
@use '@/css/variables/typography.scss' as typography;
@use '@/css/variables/breakpoints.scss' as breakpoints;

.service-catalog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-catalog__loading-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.service-catalog__loading-icon {
  animation: spin 1s linear infinite;
  color: colors.$text-color-secondary;
  font-size: typography.$font-size-xl;
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

.service-catalog__header-actions-search-container {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.service-catalog__header-actions-sort-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.service-catalog__no-results-icon {
  margin-right: 0.5rem;
}

.service-catalog__header-actions-refresh-icon {
  &.spin {
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: breakpoints.$breakpoint-md) {
  .catalog {
    grid-template-columns: 1fr;
  }

  .service-catalog__header {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .service-catalog__header-actions {
    flex-direction: column;
  }

  .service-catalog__header-actions-sort-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
}
</style>
