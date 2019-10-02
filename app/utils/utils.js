
export function secondsToMinutes(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds - (mins * 60)

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}