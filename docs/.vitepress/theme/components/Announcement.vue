<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <a
    v-if="frontmatter.hero.announcement"
    :href="frontmatter.hero.announcement.link"
    class="mb-3 inline-flex items-center rounded-lg px-4 py-1 text-sm font-semibold transition-all duration-200 hover:opacity-80"
    :style="{
      background: 'color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent)',
      color: 'var(--vp-c-brand-1)',
      border: '1px solid color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent)'
    }"
  >
    {{ frontmatter.hero.announcement.title }}
  </a>
</template>
