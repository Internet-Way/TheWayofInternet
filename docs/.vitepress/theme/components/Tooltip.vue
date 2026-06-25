<script setup lang="ts">
import { computed } from 'vue'
// @ts-ignore
import { tooltipRegistry } from 'virtual:tooltip-registry'

const props = defineProps<{
  id: string
  type?: string
}>()

const content = computed(() => {
  if (!tooltipRegistry) return ''
  return tooltipRegistry[props.id] || ''
})

const iconClass = computed(() => {
  if (props.type === 'resource') {
    return 'i-lucide-boxes' // Lucide boxes icon
  }
  return 'i-lucide-badge-info' // Lucide badge-info icon
})
</script>

<template>
  <ClientOnly>
    <VTooltip
        v-if="content"
        class="inline-block align-middle cursor-help"
        theme="tooltip"
        popper-class="fmhy-custom-popper"
        :triggers="['click']"
        :distance="10"
        :delay="{ show: 0, hide: 150 }"
        auto-hide
    >
      <span :class="[iconClass, 'text-[var(--vp-c-brand-1)] outline-none text-[1.1rem] drop-shadow-[0_0_8px_var(--vp-c-brand-soft)] transition-transform hover:scale-110']" />

      <template #popper>
        <div
            class="tooltip-content p-4 text-sm text-[var(--vp-c-text-1)]"
            v-html="content"
        ></div>
      </template>
    </VTooltip>
    <span v-else class="text-red-500 text-xs font-bold" title="Missing tooltip definition">[?!]</span>
  </ClientOnly>
</template>

<style>
/* Custom Floating Vue Theme */
.fmhy-custom-popper .v-popper__inner {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
  padding: 0;
  backdrop-filter: blur(8px);
}

.dark .fmhy-custom-popper .v-popper__inner {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 8px 10px -6px rgba(0, 0, 0, 0.6);
}

.fmhy-custom-popper .v-popper__arrow-container {
  display: none;
}

/* Basic styling to ensure markdown lists and text look good inside the tooltip without full prose overhead */
.tooltip-content h1,
.tooltip-content h2,
.tooltip-content h3,
.tooltip-content h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tooltip-content h3 {
  font-size: 1.1rem;
}

.tooltip-content p {
  margin-top: 0;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.tooltip-content ul {
  margin: 0;
  padding-left: 1.25rem;
  list-style-type: disc;
}

.tooltip-content li {
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

/* Remove bottom margin from last element to keep padding even */
.tooltip-content > :last-child {
  margin-bottom: 0;
}
</style>
