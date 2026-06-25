<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { type Contributor, contributors as allContributors } from '../../core/contributors'

const props = defineProps<{
  contributors: string[]
}>()

const filteredContributors = computed(() =>
  allContributors.filter((c: Contributor) => props.contributors.includes(c.name))
)

const avatarUrls = ref<Record<string, string>>({})

onMounted(() => {
  for (const c of filteredContributors.value) {
    if (c.discordId && c.discordId !== 'none') {
      avatarUrls.value[c.name] = `https://avatar-cyan.vercel.app/api/pfp/${c.discordId}/image`
    } else if (c.github !== 'none') {
      avatarUrls.value[c.name] = `${c.github}.png`
    }
  }
})
</script>

<template>
  <div v-if="filteredContributors.length > 0" class="flex items-center gap-3">
    <div v-for="c in filteredContributors" :key="c.name" class="flex items-center gap-1.5">
      <span class="lowercase opacity-80">by</span>
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
