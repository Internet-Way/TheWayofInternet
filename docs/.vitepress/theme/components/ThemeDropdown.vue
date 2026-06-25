<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTheme } from '../themes/state'
import type { DisplayMode } from '../themes/theme-types'

const { mode, setMode, amoledEnabled, setAmoledEnabled } = useTheme()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

interface ModeChoice {
  mode: DisplayMode
  label: string
  icon: string
  isAmoled?: boolean
}

const baseModeChoices: ModeChoice[] = [
  { mode: 'light', label: 'Light', icon: 'i-ph-sun-duotone' },
  { mode: 'dark', label: 'Dark', icon: 'i-ph-moon-duotone' },
  { mode: 'dark', label: 'AMOLED', icon: 'i-ph-moon-stars-duotone', isAmoled: true }
]

const modeChoices = computed(() => baseModeChoices)

const currentChoice = computed(() => {
  const currentMode = mode.value
  if (currentMode === 'dark' && amoledEnabled.value) return baseModeChoices[2]
  return baseModeChoices.find(choice => choice.mode === currentMode && !choice.isAmoled) || baseModeChoices[0]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectMode = (choice: ModeChoice) => {
  if (choice.isAmoled) {
    setAmoledEnabled(true)
    setMode('dark')
  } else {
    setAmoledEnabled(false)
    setMode(choice.mode)
  }

  isOpen.value = false
}

const isActiveChoice = (choice: ModeChoice) => {
  if (choice.isAmoled) return mode.value === 'dark' && amoledEnabled.value
  return choice.mode === mode.value && !choice.isAmoled && !amoledEnabled.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="theme-dropdown">
    <button
      type="button"
      class="theme-dropdown-toggle"
      title="Theme mode"
      aria-label="Theme mode"
      @click="toggleDropdown"
    >
      <ClientOnly>
        <div :class="[currentChoice.icon, 'text-xl']" />
      </ClientOnly>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="theme-dropdown-menu">
        <button
          v-for="choice in modeChoices"
          :key="choice.label"
          class="theme-dropdown-item"
          :class="{ active: isActiveChoice(choice) }"
          @click="selectMode(choice)"
        >
          <div :class="[choice.icon, 'text-lg']" />
          <span>{{ choice.label }}</span>
          <div v-if="isActiveChoice(choice)" class="i-ph-check text-lg ml-auto" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.theme-dropdown {
  position: relative;
  display: inline-flex;
}

.theme-dropdown-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: color 0.25s, background 0.25s;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    color: var(--vp-c-text-1);
    background: color-mix(in srgb, var(--vp-c-bg-soft) 80%, transparent);
  }
}

.theme-dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: -8px;
  min-width: 185px;
  background: var(--vp-c-bg-elv);
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 12px;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.12);
  padding: 9px;
  z-index: 1000;
  backdrop-filter: blur(12px);

  .dark & {
    background: linear-gradient(
      155deg,
      color-mix(in srgb, var(--vp-c-bg-elv) 82%, #000 18%) 0%,
      color-mix(in srgb, var(--vp-c-bg-elv) 92%, #000 8%) 100%
    );
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
  }

  &::before {
    content: '';
    position: absolute;
    top: -7px;
    right: 18px;
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    background: inherit;
    border-top: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
    border-left: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  }
}

.theme-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 9px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-size: 14px;
  text-align: left;

  &:hover {
    background: color-mix(in srgb, var(--vp-c-bg-soft) 82%, transparent);
  }

  &.active {
    color: var(--vp-c-brand-1);
    font-weight: 600;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.16s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>
