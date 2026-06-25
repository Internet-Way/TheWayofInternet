<script setup lang="ts">
import { nextTick, provide } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Announcement from '../components/Announcement.vue'
import Sidebar from '../components/SidebarCard.vue'
import ThemeDropdown from '../components/ThemeDropdown.vue'
import PageHeader from '../components/PageHeader.vue'
import { useTheme } from '../themes/state'

const { isDark } = useData()
const { setMode } = useTheme()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    // Sync with theme handler
    setMode(isDark.value ? 'dark' : 'light')
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await (document as any).startViewTransition(async () => {
    isDark.value = !isDark.value
    // Sync with theme handler
    setMode(isDark.value ? 'dark' : 'light')
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar-nav-after>
      <Sidebar />
    </template>
    <template #home-hero-info-before>
      <Announcement />
    </template>
    <template #nav-bar-content-before>
      <div class="custom-nav-theme">
        <ThemeDropdown />
      </div>
    </template>
    <template #doc-before>
      <PageHeader />
    </template>

    <Content />
  </Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>

<style scoped>
.custom-nav-theme {
  display: none;
}

@media (min-width: 768px) {
  .custom-nav-theme {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 8px;
    order: 2;
  }

  .custom-nav-theme::before {
    content: '';
    margin-right: 10px;
    margin-left: 10px;
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
  }

  :deep(.social-links) {
    order: 3;
  }
}
</style>
