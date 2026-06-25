<template>
  <div
    class="bg-$vp-c-bg hover:bg-$vp-c-bg/40 border-$vp-c-default-soft hover:border-primary transition-border relative z-0 rounded-lg border-2 border-solid p-5 duration-500"
  >
    <div class="align-center mb-4 flex justify-between">
      <div class="text-$vp-c-text-1 lh-relaxed text-sm font-bold">
        Emoji Legend
      </div>
    </div>
    <Field icon="i-twemoji-globe-with-meridians">Indexes</Field>
    <Field icon="i-twemoji-link">Storage Links</Field>
    <Field icon="i-twemoji-star">Recommended</Field>
    <Field icon="i-twemoji-glowing-star">Last You Need</Field>

    <div class="mt-4">
      <ColorPicker />
    </div>

    <div class="mt-6 pt-6 border-t border-$vp-c-divider">
      <ThemeSelector />
    </div>
  </div>
</template>

<script setup lang="ts">
import Field from './CardField.vue'
import ColorPicker from './ColorPicker.vue'
import ThemeSelector from './ThemeSelector.vue'
</script>
