import { ref } from 'vue'

const KEY = 'bitindex-stats-button'
const isBrowser = typeof window !== 'undefined'

const saved = isBrowser ? localStorage.getItem(KEY) : null

export const showStatsButton = ref(saved === null ? true : saved === '1')

export const setShowStatsButton = (value: boolean): void => {
  showStatsButton.value = value
  if (isBrowser) localStorage.setItem(KEY, value ? '1' : '0')
}
