<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Announcement from '../components/Announcement.vue'
import HeadingFeedback from '../components/HeadingFeedback.vue'
import PageHeader from '../components/PageHeader.vue'
import SettingsMenu from '../components/SettingsMenu.vue'
import MarkerTip from '../components/MarkerTip.vue'
import StatsInfo from '../stats/StatsInfo.vue'

const { Layout } = DefaultTheme
const { page } = useData()
const route = useRoute()

/** Page types with no "On this page" content panel. */
const HIDE_ASIDE_TYPES = ['blog', 'utility']

watch(
  () => route.path,
  () => {
    if (HIDE_ASIDE_TYPES.includes(page.value.frontmatter.type)) {
      page.value.frontmatter.aside = false
      page.value.frontmatter.outline = false
    }
  },
  { immediate: true }
)

const timeAgo = (timestamp: number): string => {
  const diff = Math.floor(Date.now() / 1000) - timestamp
  const units = [
    { n: 31536000, s: "year" },
    { n: 2592000, s: "month" },
    { n: 604800, s: "week" },
    { n: 86400, s: "day" },
    { n: 3600, s: "hour" },
    { n: 60, s: "min" }
  ]
  for (const { n, s } of units) {
    const v = Math.floor(diff / n)
    if (v >= 1) return `${v} ${s}${v > 1 ? "s" : ""}`
  }
  return "a few seconds"
}

let timer: ReturnType<typeof setInterval> | undefined

const updateLastEdited = () => {
  const el = document.querySelector<HTMLElement>('#last-edited')
  if (!el) return
  const iso = el.getAttribute('datetime')
  const ts = iso ? Date.parse(iso) / 1000 : 0
  el.textContent = ts ? timeAgo(ts) : "some time"
}

onMounted(() => {
  updateLastEdited()
  timer = setInterval(updateLastEdited, 60000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <Layout>
    <template #layout-top>
      <HeadingFeedback />
      <StatsInfo />
      <MarkerTip />
    </template>
    <template #nav-bar-content-after>
      <SettingsMenu />
    </template>
    <template #home-hero-info-before>
      <Announcement />
    </template>
    <template #doc-before>
      <PageHeader />
    </template>

    <Content />
  </Layout>
</template>
