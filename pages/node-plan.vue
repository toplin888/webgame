<template>
  <main>
    <DaoPlan1 :title="$t('plan.plan1Title')" :desc="$t('plan.plan1Desc')" />
    <PlanPlan1></PlanPlan1>
    <PlanDifference />
    <PlanLuckyxNode />
    <PlanMap />
  </main>

</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Node plan',
  ogTitle: 'Node plan',
  description: 'Node plan page',
  ogDescription: 'Node plan page'
})
</script>
