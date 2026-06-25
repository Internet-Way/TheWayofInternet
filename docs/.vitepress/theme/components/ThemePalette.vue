<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentThemeName = ref('Indigo')
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const standardThemes = [
  { name: 'Swarm', color: '#0ea5e9', vars: { '--vp-c-brand-1': '#0ea5e9', '--vp-c-brand-2': '#0284c7', '--vp-c-brand-3': '#0369a1', '--vp-c-brand-soft': 'rgba(14, 165, 233, 0.14)' } },
  { name: 'Meadow', color: '#22c55e', vars: { '--vp-c-brand-1': '#22c55e', '--vp-c-brand-2': '#16a34a', '--vp-c-brand-3': '#15803d', '--vp-c-brand-soft': 'rgba(34, 197, 94, 0.14)' } },
  { name: 'Carnation', color: '#f43f5e', vars: { '--vp-c-brand-1': '#f43f5e', '--vp-c-brand-2': '#e11d48', '--vp-c-brand-3': '#be123c', '--vp-c-brand-soft': 'rgba(244, 63, 94, 0.14)' } },
  { name: 'Merlin', color: '#eab308', vars: { '--vp-c-brand-1': '#eab308', '--vp-c-brand-2': '#ca8a04', '--vp-c-brand-3': '#a16207', '--vp-c-brand-soft': 'rgba(234, 179, 8, 0.14)' } },
  { name: 'Lime', color: '#84cc16', vars: { '--vp-c-brand-1': '#84cc16', '--vp-c-brand-2': '#65a30d', '--vp-c-brand-3': '#4d7c0f', '--vp-c-brand-soft': 'rgba(132, 204, 22, 0.14)' } },
  { name: 'Rose', color: '#fb7185', vars: { '--vp-c-brand-1': '#fb7185', '--vp-c-brand-2': '#f43f5e', '--vp-c-brand-3': '#e11d48', '--vp-c-brand-soft': 'rgba(251, 113, 133, 0.14)' } },
]

const applyTheme = (theme: { name: string; vars: Record<string, string> }) => {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value)
  }
  currentThemeName.value = theme.name
  localStorage.setItem('docs-theme-color', JSON.stringify(theme))
  window.dispatchEvent(new CustomEvent('theme-color-updated', { detail: theme }))
}

const selectTheme = (theme: { name: string; vars: Record<string, string> }) => {
  applyTheme(theme)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const handleThemeUpdate = (event: Event) => {
  const customEvent = event as CustomEvent
  if (!customEvent.detail) return
  const theme = customEvent.detail
  const matched = standardThemes.find((t) => t.name === theme.name)
  if (matched) {
    currentThemeName.value = matched.name
  } else if (theme?.name) {
    currentThemeName.value = theme.name
  }
}

onMounted(() => {
  const saved = localStorage.getItem('docs-theme-color')
  if (saved) {
    try {
      const theme = JSON.parse(saved)
      const matched = standardThemes.find((t) => t.name === theme.name)
      if (matched) {
        applyTheme(matched)
      } else if (theme?.vars) {
        applyTheme(theme)
      }
    } catch (e) {
      console.error('Failed to load theme', e)
    }
  }
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('theme-color-updated', handleThemeUpdate)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('theme-color-updated', handleThemeUpdate)
})
</script>

<template>
  <div ref="dropdownRef" class="theme-palette">
    <button class="theme-palette-toggle" type="button" @click="isOpen = !isOpen">
      <span class="theme-palette-dot" />
      <span class="theme-palette-label">Theme</span>
    </button>
    <div v-if="isOpen" class="theme-palette-menu">
      <button
        v-for="theme in standardThemes"
        :key="theme.name"
        class="theme-palette-item"
        :title="theme.name"
        @click="selectTheme(theme)"
      >
        <span class="theme-palette-swatch" :style="{ backgroundColor: theme.color }" />
        <span class="theme-palette-name">{{ theme.name }}</span>
        <span v-if="theme.name === currentThemeName" class="theme-palette-check">✓</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.theme-palette {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.theme-palette-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.theme-palette-toggle:hover {
  background: var(--vp-c-bg-alt);
}

.theme-palette-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
}

.theme-palette-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  padding: 6px;
  z-index: 100;
}

.theme-palette-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: transparent;
  border: none;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--vp-c-text-1);
  text-align: left;
}

.theme-palette-item:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
}

.theme-palette-swatch {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
}

.theme-palette-name {
  flex: 1;
}

.theme-palette-check {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>
