<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { type Contributor, contributors as allContributors } from '../../core/contributors'

const props = defineProps<{
  contributors: (string | number)[]
}>()

// Frontmatter uses contributor IDs (e.g. [1320]) — fall back to name matching
// for legacy frontmatter that still lists names.
const filteredContributors = computed(() =>
  allContributors.filter((c: Contributor) =>
    props.contributors.some((id) => String(id) === c.id || id === c.name)
  )
)

const avatarFor = (c: Contributor): string => {
  if (c.pfp && c.pfp !== 'none') return c.pfp
  if (c.discordId && c.discordId !== 'none') {
    return `https://avatar-cyan.vercel.app/api/pfp/${c.discordId}/image`
  }
  if (c.github && c.github !== 'none') {
    const username = c.github
      .replace(/^https?:\/\/github\.com\//, '')
      .replace(/\/+$/, '')
    if (username) return `https://github.com/${username}.png`
  }
  return ''
}

const avatarUrls = ref<Record<string, string>>({})

onMounted(() => {
  for (const c of filteredContributors.value) {
    const url = avatarFor(c)
    if (url) avatarUrls.value[c.name] = url
  }
})
</script>

<template>
  <div v-if="filteredContributors.length > 0" class="inline-flex items-center gap-3">
    <div v-for="c in filteredContributors" :key="c.name" class="inline-flex items-center gap-1.5">
      <img
        v-if="avatarUrls[c.name]"
        :src="avatarUrls[c.name]"
        :alt="c.name"
        class="w-4 h-4 rounded-full border border-div object-cover"
      />
      <a v-if="c.discord !== 'none'" :href="c.discord" target="_blank" rel="noopener" class="font-medium text-text hover:text-primary transition-colors">
        {{ c.name }}
      </a>
      <span v-else class="font-medium text-text">{{ c.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.contributors-container {
  display: flex;
  flex-direction: column;
}
</style>
