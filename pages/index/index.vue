<template>
  <div>
    <!-- Plan 1 组件 -->
    <HomePlan1 class="" />

    <!--  -->
    <HomePlan2 class="" />

    <!--  -->
    <HomePlan3 class="" />

    <HomePlan4 class="" />

    <!-- <FeaturesGrid></FeaturesGrid> -->
    <HomePlan5 />

    <HomePlan6 />

    <HomePlan7 />
    <HomePlan8 />
  </div>
</template>

<script setup lang="ts">
import FeaturesGrid from '~/components/Home/FeaturesGrid.vue'


// 页面元数据
definePageMeta({
  title: 'Home'
})

// 获取当前语言信息
const { locale, locales } = useI18n()

const currentLocale = computed(() => {
  const current = locales.value.find((l: any) => l.code === locale.value)
  return current?.name || locale.value
})

const availableLocales = computed(() => {
  return locales.value.map((l: any) => l.name)
})

// 设置页面 SEO
useSeoMeta({
  title: 'Home',
  ogTitle: 'Home',
  description: 'Welcome to our multilingual website',
  ogDescription: 'Welcome to our multilingual website'
})

</script>
<style scoped>
/* 添加一些动画效果 */
.cursor-pointer:hover {
  filter: brightness(1.1);
}
</style>