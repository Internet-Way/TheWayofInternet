<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Announcement from '../components/Announcement.vue'
import HeadingFeedback from '../components/HeadingFeedback.vue'
import Sidebar from '../components/SidebarCard.vue'
import PageHeader from '../components/PageHeader.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <HeadingFeedback />
    </template>
    <template #sidebar-nav-after>
      <Sidebar />
    </template>
    <template #home-hero-info-before>
      <Announcement />
    </template>
    <template #doc-before>
      <PageHeader />
    </template>

    <Content />
  </Layout>
</template>
