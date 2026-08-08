<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Single tooltip instance, teleported to <body> so table overflow/clipping
// can never cut it off. Delegated pointer events spread over document.
const tipText = ref('')
const tipStyle = ref<Record<string, string>>({})
const visible = ref(false)
const popupEl = ref<HTMLDivElement>()
let hideTimer: ReturnType<typeof setTimeout> | undefined
let currentTip: HTMLElement | null = null

const findTip = (target: EventTarget | null): HTMLElement | null => {
  const node = target as HTMLElement | null
  if (!node || typeof node.closest !== 'function') return null
  return node.closest('.marker-tip')
}

const showTip = (e: PointerEvent) => {
  const host = findTip(e.target)
  if (!host || host === currentTip) return
  currentTip = host
  const label = host.getAttribute('data-tip')
  if (!label) return
  clearTimeout(hideTimer)
  tipText.value = label
  visible.value = true
  requestAnimationFrame(() => position(host))
}

const position = (host: HTMLElement) => {
  const el = popupEl.value
  if (!el) return
  const rect = host.getBoundingClientRect()
  const width = el.offsetWidth
  const height = el.offsetHeight
  // Prefer above the icon; flip below when there is no headroom
  let top = rect.top - height - 10
  if (top < 8) top = rect.bottom + 10
  let left = rect.left + rect.width / 2 - width / 2
  left = Math.max(8, Math.min(left, window.innerWidth - width - 8))
  el.style.left = `${left}px`
  el.style.top = `${top}px`
}

const hideTip = () => {
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    visible.value = false
    currentTip = null
  }, 80)
}

onMounted(() => {
  if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) return
  document.addEventListener('pointerover', showTip)
  document.addEventListener('pointerout', hideTip)
  document.addEventListener('scroll', hideTip, true)
  window.addEventListener('resize', hideTip)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerover', showTip)
  document.removeEventListener('pointerout', hideTip)
  document.removeEventListener('scroll', hideTip, true)
  window.removeEventListener('resize', hideTip)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-show="visible"
      ref="popupEl"
      class="marker-popup"
      role="tooltip"
    >
      <span class="marker-popup-text" v-text="tipText" />
    </div>
  </Teleport>
</template>

<style>
/* Hover card for marker icons — fixed-position, body-teleported */
.marker-popup {
  position: fixed;
  z-index: 2147483000;
  max-width: 260px;
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  backdrop-filter: blur(8px);
  color: var(--vp-c-text-1);
  font-size: 12.5px;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.24);
  transition: opacity 0.12s ease;
}

.marker-popup-text {
  position: relative;
}

/* Little caret pointing at the icon */
.marker-popup::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-top-color: var(--vp-c-divider);
  border-bottom: 0;
  transform: translateX(-50%);
}
</style>