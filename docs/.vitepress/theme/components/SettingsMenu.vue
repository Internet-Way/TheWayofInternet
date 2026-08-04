<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../themes/state'

const {
  mode,
  accent,
  preset,
  font,
  isPresetActive,
  setAccent,
  setPreset,
  setFont,
  toggleMode,
  accentOptions,
  presetOptions,
  fontOptions,
} = useTheme()

const open = ref(false)
const accentOpen = ref(false)
const presetOpen = ref(false)
const fontOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const locked = computed(() => isPresetActive.value)

const currentAccent = computed(() => accentOptions.find((a) => a.slug === accent.value))
const currentPreset = computed(() => presetOptions.find((p) => p.name === preset.value))
const currentFont = computed(() => fontOptions.find((f) => f.name === font.value))

const togglePanel = () => {
  open.value = !open.value
  if (!open.value) {
    accentOpen.value = false
    presetOpen.value = false
    fontOpen.value = false
  }
}

const selectAccent = (slug: string) => {
  setAccent(slug)
  accentOpen.value = false
}

const selectPreset = (name: string | null) => {
  setPreset(name)
  presetOpen.value = false
  accentOpen.value = false
}

const selectFont = (name: string) => {
  setFont(name)
  fontOpen.value = false
}

const onClickOutside = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false
    accentOpen.value = false
    presetOpen.value = false
    fontOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="rootRef" class="settings-menu">
    <button
      class="settings-trigger"
      type="button"
      :title="'Theme settings'"
      :aria-label="'Theme settings'"
      @click="togglePanel"
    >
      <svg
        class="gear"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        />
      </svg>
    </button>

    <Transition name="vp-settings">
      <div v-if="open" class="settings-panel">
        <div class="mode-accent">
          <button
            class="mode-btn"
            type="button"
            :class="{ locked }"
            :disabled="locked"
            :title="mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleMode"
          >
            <svg
              v-if="mode === 'dark'"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>

          <button
            class="accent-btn"
            type="button"
            :class="{ locked }"
            :disabled="locked"
            @click="accentOpen = !accentOpen"
          >
            <span class="accent-dot" :style="{ background: currentAccent?.hex ?? 'var(--vp-c-brand-1)' }" />
            <span class="accent-name">{{ currentAccent?.name ?? 'Accent' }}</span>
            <svg
              class="chevron"
              :class="{ open: accentOpen }"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        <Transition name="vp-settings">
          <div v-if="accentOpen && !locked" class="accent-menu">
            <button
              v-for="a in accentOptions"
              :key="a.slug"
              class="accent-item"
              type="button"
              @click="selectAccent(a.slug)"
            >
              <span class="accent-dot" :style="{ background: a.hex }" />
              <span>{{ a.name }}</span>
              <span v-if="a.slug === accent" class="accent-check">✓</span>
            </button>
          </div>
        </Transition>

        <div class="preset-select">
          <button
            class="preset-btn"
            type="button"
            @click="presetOpen = !presetOpen"
          >
            <span class="preset-label">{{ currentPreset?.displayName ?? 'None' }}</span>
            <svg
              class="chevron"
              :class="{ open: presetOpen }"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <Transition name="vp-settings">
            <div v-if="presetOpen" class="preset-menu">
              <button
                class="preset-item"
                type="button"
                @click="selectPreset(null)"
              >
                <span>None</span>
                <span v-if="preset === null" class="accent-check">✓</span>
              </button>
              <button
                v-for="p in presetOptions"
                :key="p.name"
                class="preset-item"
                type="button"
                @click="selectPreset(p.name)"
              >
                <span>{{ p.displayName }}</span>
                <span v-if="p.name === preset" class="accent-check">✓</span>
              </button>
            </div>
          </Transition>
        </div>

        <div class="preset-select">
          <button
            class="preset-btn"
            type="button"
            @click="fontOpen = !fontOpen"
          >
            <span class="preset-label">{{ currentFont?.label ?? 'Default' }}</span>
            <svg
              class="chevron"
              :class="{ open: fontOpen }"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <Transition name="vp-settings">
            <div v-if="fontOpen" class="preset-menu">
              <button
                v-for="f in fontOptions"
                :key="f.name"
                class="preset-item"
                type="button"
                @click="selectFont(f.name)"
              >
                <span :style="f.stack ? { fontFamily: f.stack } : undefined">{{ f.label }}</span>
                <span v-if="f.name === font" class="accent-check">✓</span>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.settings-menu {
  position: relative;
  display: flex;
  align-items: center;
}

.settings-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.25s, background-color 0.25s;
}

.settings-trigger:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-alt);
}

.settings-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 100;
  min-width: 208px;
  padding: 6px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.mode-accent {
  display: flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.mode-btn {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.25s, background-color 0.25s;
}

.mode-btn:hover:not(.locked) {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-alt);
}

.mode-btn.locked,
.accent-btn.locked {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.accent-btn {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  min-width: 0;
  padding: 0 8px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background-color 0.25s;
}

.accent-btn:hover:not(.locked) {
  background-color: var(--vp-c-bg-alt);
}

.accent-dot {
  flex: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
}

.accent-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 13px;
}

.chevron {
  flex: none;
  color: var(--vp-c-text-3);
  transition: transform 0.2s;
}

.chevron.open {
  transform: rotate(180deg);
}

.accent-menu,
.preset-menu {
  margin-top: 4px;
  padding: 4px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.accent-item,
.preset-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s;
}

.accent-item:hover,
.preset-item:hover {
  background-color: var(--vp-c-bg-elv);
  color: var(--vp-c-brand-1);
}

.accent-check {
  margin-left: auto;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.preset-select {
  margin-top: 6px;
}

.preset-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  height: 30px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background-color 0.25s;
}

.preset-btn:hover {
  background-color: var(--vp-c-bg-alt);
}

.preset-label {
  flex: 1;
  text-align: left;
  font-size: 13px;
}

.vp-settings-enter-active,
.vp-settings-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.vp-settings-enter-from,
.vp-settings-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
