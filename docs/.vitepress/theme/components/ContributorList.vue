<script setup lang="ts">
import { contributors } from '../../core/contributors'
import ContributorCard from './ContributorCard.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    <ContributorCard 
      v-for="contributor in contributors" 
      :key="contributor.name" 
      :contributor="contributor" 
    />
  </div>
</template>
