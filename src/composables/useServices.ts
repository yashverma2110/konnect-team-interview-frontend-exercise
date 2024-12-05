// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

import { onBeforeUnmount, ref } from 'vue'
import axios from 'axios'
import type { IService } from '@/types/IService'
import useServicesStore from '@/stores/services'


export default function useServices() {
  const loading = ref<any>(false)
  const error = ref<any>(false)
  const autoRefreshInterval = ref<number>(-1)
  const intervalId = ref<NodeJS.Timeout | null>(null)
  const servicesStore = useServicesStore()

  onBeforeUnmount(() => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
    }
  })

  const fetchServices = async (searchQuery: string = '', isBackgroundFetch = false): Promise<{
    success: boolean
    data: IService[]
  }> => {
    try {
      if (!isBackgroundFetch) {
        loading.value = true
      }

      const { data } = await axios.get('/api/services', {
        params: {
          q: searchQuery,
        },
      })

      return {
        success: true,
        data,
      }
    } catch (err: any) {
      error.value = true

      return {
        success: false,
        data: [],
      }
    } finally {
      loading.value = false
    }
  }

  function getServiceStatus(service: IService) {
    if (service.configured) {
      if (service.published) {
        return 'published'
      }
      return 'unpublished'
    }

    return 'in-progress'
  }

  function setAutoRefreshInterval(value: number) {
    autoRefreshInterval.value = value

    if (intervalId.value) {
      clearInterval(intervalId.value)
    }

    intervalId.value = setInterval(() => {
      fetchServices(servicesStore.searchQuery, true)
    }, autoRefreshInterval.value * 1000)
  }

  return {
    loading,
    error,
    fetchServices,
    getServiceStatus,
    autoRefreshInterval,
    setAutoRefreshInterval,
  }
}
