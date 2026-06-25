<script setup lang="ts">
import { useData } from 'vitepress'

const { page, frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.layout !== 'home' && frontmatter.layout !== 'page' && frontmatter.title" class="custom-page-header">
    <h1 class="page-title">{{ frontmatter.title }}</h1>
    <p v-if="frontmatter.description || frontmatter.subtitle" class="page-subtitle">
      {{ frontmatter.description || frontmatter.subtitle }}
    </p>
  </div>
</template>

<style scoped>
.custom-page-header {
  margin-bottom: 2rem;
  padding-top: 1rem;
}

.page-title {
  font-size: 2.5rem;
  line-height: 2.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>
