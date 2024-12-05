import { ref } from 'vue'
import axios from 'axios'
import type { IService } from '@/types/IService'

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices() {
  const loading = ref<any>(false)
  const error = ref<any>(false)

  const fetchServices = async (searchQuery: string = ''): Promise<{
    success: boolean
    data: IService[]
  }> => {
    try {
      loading.value = true

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

  return {
    loading,
    error,
    fetchServices,
    getServiceStatus,
  }
}
