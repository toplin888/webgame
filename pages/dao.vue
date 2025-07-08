<template>
  <main>
    <DaoPlan1 :title="$t('dao.plan1Title')" :desc="$t('dao.plan1Desc')" />
    <DaoBanner />
    <DaoVision />
    <DaoJoin />

  </main>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Dao',
  ogTitle: 'Dao',
  description: 'Dao page',
  ogDescription: 'Dao page'
})
</script>
