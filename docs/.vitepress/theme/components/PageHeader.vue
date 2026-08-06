<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import PageTitle from './PageTitle.vue'

const { frontmatter } = useData()

// Blog pages render their own header via <Post /> (BlogPost.vue) — skip here.
const show = computed(
  () =>
    frontmatter.value.layout !== 'home' &&
    frontmatter.value.layout !== 'page' &&
    (frontmatter.value.type === 'index' || frontmatter.value.type === 'utility') &&
    Boolean(frontmatter.value.title)
)
</script>

<template>
  <PageTitle
    v-if="show"
    :icon="frontmatter.icon"
    :title="frontmatter.title"
    :subtitle="frontmatter.description"
  />
</template>
