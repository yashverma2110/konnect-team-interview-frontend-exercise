import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IService } from '@/types/IService'
import type { SortKey } from '@/types/AppTypes'

export default defineStore('services', () => {
  const allServices = ref<IService[]>([])
  const searchQuery = ref<string>('')
  const sortKey = ref<SortKey>('name')
  const sortDirection = ref<'asc' | 'desc'>('asc')
  const paginationConfig = ref<{
    pageNumber: number
    recordsPerPage: number
  }>({
    pageNumber: 1,
    recordsPerPage: 10,
  })

  const servicesToDisplay = computed<IService[]>(() => {
    const sortedServices = allServices.value.sort((serviceA, serviceB) => {
      if (sortKey.value === 'metrics:uptime') {
        if (!serviceA.metrics?.uptime || !serviceB.metrics?.uptime) {
          return 0
        }

        if (sortDirection.value === 'asc') {
          return serviceA.metrics.uptime - serviceB.metrics.uptime
        }

        return serviceB.metrics.uptime - serviceA.metrics.uptime
      }

      if (sortKey.value === 'metrics:errors') {
        if (!serviceA.metrics?.errors || !serviceB.metrics?.errors) {
          return 0
        }

        if (sortDirection.value === 'asc') {
          return serviceA.metrics.errors - serviceB.metrics.errors
        }

        return serviceB.metrics.errors - serviceA.metrics.errors
      }

      if (sortKey.value === 'metrics:latency') {
        if (!serviceA.metrics?.latency || !serviceB.metrics?.latency) {
          return 0
        }

        if (sortDirection.value === 'asc') {
          return serviceA.metrics.latency - serviceB.metrics.latency
        }

        return serviceB.metrics.latency - serviceA.metrics.latency
      }

      if (sortKey.value === 'metrics:requests') {
        if (!serviceA.metrics?.requests || !serviceB.metrics?.requests) {
          return 0
        }

        if (sortDirection.value === 'asc') {
          return serviceA.metrics.requests - serviceB.metrics.requests
        }

        return serviceB.metrics.requests - serviceA.metrics.requests
      }

      if (sortDirection.value === 'desc') {
        return serviceB.name.localeCompare(serviceA.name)
      }

      return serviceA.name.localeCompare(serviceB.name)
    })

    return sortedServices.slice((paginationConfig.value.pageNumber - 1) * paginationConfig.value.recordsPerPage, paginationConfig.value.pageNumber * paginationConfig.value.recordsPerPage)
  })

  const totalServices = computed<number>(() => allServices.value.length)

  function setSortKey(key: SortKey) {
    sortKey.value = key
  }

  function setSortDirection(direction: 'asc' | 'desc') {
    sortDirection.value = direction
  }

  function setAllServices(services: IService[]) {
    allServices.value = services
  }

  function setPagination(pagination: {
    pageNumber: number
    recordsPerPage: number
  }) {
    paginationConfig.value = pagination
  }

  function setRecordsPerPage(recordsPerPage: number) {
    paginationConfig.value.recordsPerPage = recordsPerPage
  }

  function setPageNumber(pageNumber: number) {
    paginationConfig.value.pageNumber = pageNumber
  }

  function nextPage() {
    if (paginationConfig.value.pageNumber === Math.ceil(totalServices.value / paginationConfig.value.recordsPerPage)) {
      return
    }

    paginationConfig.value.pageNumber += 1
  }

  function previousPage() {
    if (paginationConfig.value.pageNumber === 1) {
      return
    }

    paginationConfig.value.pageNumber -= 1
  }

  function getServiceById(id: string) {
    return allServices.value.find(service => service.id === id)
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  return {
    // computed
    searchQuery,
    servicesToDisplay,
    sortKey,
    sortDirection,
    paginationConfig,
    totalServices,
    // actions
    setAllServices,
    setSearchQuery,
    setSortKey,
    setSortDirection,
    setPagination,
    setRecordsPerPage,
    setPageNumber,
    nextPage,
    previousPage,
    getServiceById,
  }
})
