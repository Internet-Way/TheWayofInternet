<script setup lang="ts">
import { computed } from 'vue'
import { emojiMap } from '../../plugins/markdown/icon-transformer'

const props = defineProps<{
  icon?: string
  title: string
  subtitle?: string
}>()

const iconClass = computed(() => {
  if (!props.icon) return ''
  if (props.icon.startsWith('i-')) return props.icon
  const mapped = emojiMap[props.icon]
  return mapped ? `i-twemoji-${mapped}` : ''
})
</script>

<template>
  <div class="page-title-wrap">
    <h1 class="page-title">
      <span v-if="iconClass" :class="[iconClass, 'title-icon']" aria-hidden="true" />
      <span>{{ title }}</span>
    </h1>
    <p v-if="subtitle || $slots.meta" class="page-subtitle">
      <template v-if="subtitle">{{ subtitle }}</template>
      <span v-if="subtitle && $slots.meta" class="page-subtitle-dot" aria-hidden="true">•</span>
      <span v-if="$slots.meta" class="page-title-meta"><slot name="meta" /></span>
    </p>
  </div>
</template>

<style scoped>
.page-title-wrap {
  margin-bottom: 2rem;
  padding-top: 1rem;
}

.page-title-wrap .page-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 0 0.5rem;
  font-size: 2.5rem;
  line-height: 2.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-title-wrap .title-icon {
  flex: none;
  width: 1.1em;
  height: 1.1em;
  display: inline-block;
  vertical-align: middle;
}

.page-title-wrap .page-subtitle {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--vp-c-text-2);
}

.page-title-wrap .page-subtitle-dot {
  margin: 0 0.55rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.page-title-wrap .page-title-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
</style>
