import type { ServiceStatus } from '@/types/IService'

export function humanizeServiceStatus(status?: ServiceStatus) {
  switch (status) {
    case 'published':
      return 'Published to portal'
    case 'unpublished':
      return 'Unpublished'
    default:
      return 'In Progress'
  }
}

export function humanizeNumberUsingAbbreviation(number: number) {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(0)}M`
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(0)}K`
  }
  return number.toString()
}
