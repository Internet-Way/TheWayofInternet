<script setup lang="ts">
import Contributors from '../components/Contributors.vue'
import { useData } from 'vitepress'

const formatDate = (raw: string): string => {
  const date = new Date(raw)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const { frontmatter } = useData()
</script>

<template>
  <h1 class="mb-0">{{ frontmatter.title }}</h1>
  <div class="flex flex-wrap items-center gap-x-1.5 text-text-2 text-sm mb-4">
    <span>{{ frontmatter.description }}</span>
    <span class="opacity-50">•</span>
    <span>{{ formatDate(frontmatter.date) }}</span>
    <template v-if="frontmatter.contributors?.length">
      <span class="opacity-50">•</span>
      <Contributors :contributors="frontmatter.contributors" />
    </template>
  </div>
</template>
