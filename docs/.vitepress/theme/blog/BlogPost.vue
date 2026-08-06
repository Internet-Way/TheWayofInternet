<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import PageTitle from '../components/PageTitle.vue'
import Contributors from '../components/Contributors.vue'

const { frontmatter } = useData()

const formatDate = (raw: unknown): string => {
  if (!raw) return ''
  const date = raw instanceof Date ? raw : new Date(String(raw))
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const dateLabel = computed(() => formatDate(frontmatter.value.date))
const contributors = computed(() => frontmatter.value.contributors ?? [])
const hasMeta = computed(
  () => Boolean(dateLabel.value) || (contributors.value as unknown[]).length > 0
)
</script>

<template>
  <PageTitle
    :title="frontmatter.title"
    :subtitle="frontmatter.description"
  >
    <template v-if="hasMeta" #meta>
      <time v-if="dateLabel" :datetime="String(frontmatter.date)">{{ dateLabel }}</time>
      <span v-if="dateLabel && contributors.length" class="meta-dot" aria-hidden="true">•</span>
      <Contributors v-if="contributors.length" :contributors="contributors" />
    </template>
  </PageTitle>
</template>

<style scoped>
.meta-dot {
  font-weight: 700;
  color: var(--vp-c-text-2);
}
</style>
