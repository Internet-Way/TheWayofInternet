<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Contributor } from '../../core/contributors'

const props = defineProps<{
  contributor: Contributor
}>()

const avatarUrl = ref('')

onMounted(() => {
  if (props.contributor.pfp && props.contributor.pfp !== 'none') {
    avatarUrl.value = props.contributor.pfp
  } else if (props.contributor.discordId && props.contributor.discordId !== 'none') {
    avatarUrl.value = `https://avatar-cyan.vercel.app/api/pfp/${props.contributor.discordId}/image`
  } else if (props.contributor.github && props.contributor.github !== 'none') {
    avatarUrl.value = `${props.contributor.github}.png`
  }
})
</script>

<template>
  <div class="contributor-card group relative p-5 bg-bg-soft border-2 border-solid border-div rounded-xl flex gap-6 items-start hover:border-primary transition-all duration-300">
    <!-- Left: Avatar + AKA -->
    <div class="flex flex-col items-center gap-2 shrink-0">
      <div v-if="avatarUrl" class="avatar-container relative">
        <img 
          :src="avatarUrl" 
          :alt="contributor.name"
          class="w-20 h-20 rounded-full border-2 border-div object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div 
          class="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded bg-primary text-white border border-div shadow-sm z-10"
        >
          {{ contributor.type }}
        </div>
      </div>
      
      <div v-if="contributor.aka !== 'none'" class="text-[12px] font-bold text-text group-hover:text-primary transition-colors duration-300 italic text-center leading-tight max-w-[85px] break-words mt-2">
        aka {{ contributor.aka }}
      </div>
    </div>
    
    <!-- Right: Name + Description + Socials -->
    <div class="flex-1 flex flex-col min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h3 class="text-xl font-bold text-text group-hover:text-primary transition-colors duration-300 truncate">
          {{ contributor.name }}
        </h3>
      </div>
      
      <div class="flex-1">
        <p v-if="contributor.description !== 'none'" class="text-[14px] text-text-2 leading-snug opacity-90 block">
          {{ contributor.description }}
        </p>
      </div>
      
      <!-- Socials at Bottom Right -->
      <div class="flex gap-3 mt-3 justify-end items-center">
        <a v-if="contributor.discord !== 'none'" :href="contributor.discord" target="_blank" rel="noopener" class="text-text-2 hover:text-primary transition-all hover:scale-110" title="Discord">
          <div class="i-simple-icons:discord w-5 h-5" />
        </a>
        <a v-if="contributor.github !== 'none'" :href="contributor.github" target="_blank" rel="noopener" class="text-text-2 hover:text-primary transition-all hover:scale-110" title="GitHub">
          <div class="i-simple-icons:github w-5 h-5" />
        </a>
        <a v-if="contributor.portfolio !== 'none'" :href="contributor.portfolio" target="_blank" rel="noopener" class="text-text-2 hover:text-primary transition-all hover:scale-110" title="Portfolio">
          <div class="i-heroicons-solid:globe-alt w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contributor-card {
  min-height: 140px;
  background-color: var(--vp-c-bg-soft);
}

.contributor-card:hover {
  background-color: var(--vp-c-bg-elv);
}
</style>
