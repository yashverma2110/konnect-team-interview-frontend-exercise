import type { SortKey } from '@/types/AppTypes'

export const VALID_SORT_KEYS: SortKey[] = ['name', 'metrics:uptime', 'metrics:latency', 'metrics:requests', 'metrics:errors']

export const SORT_ORDER: { label: string; value: 'asc' | 'desc' }[] = [
  {
    label: 'Ascending',
    value: 'asc',
  },
  {
    label: 'Descending',
    value: 'desc',
  },
]