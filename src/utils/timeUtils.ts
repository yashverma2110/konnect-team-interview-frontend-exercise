export function getDurationSince(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < 1000 * 60) {
    return `${Math.floor(diff / 1000)}s`
  }

  if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60 * 60))}h`
  }

  return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d`
}
