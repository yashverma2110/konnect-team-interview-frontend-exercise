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

export const AUTO_REFRESH_INTERVAL_OPTIONS: { label: string; value: number }[] = [
  {
    label: '5s',
    value: 10,
  },
  {
    label: '10s',
    value: 10,
  },
  {
    label: '20s',
    value: 20,
  },
  {
    label: '30s',
    value: 30,
  },
]
