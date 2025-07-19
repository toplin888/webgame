<template>
  <div class="min-h-screen dark:bg-gray-900">
    <!-- 导航栏 -->
    <Navbar></Navbar>

    <!-- 主要内容区域 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- <Footer /> -->

  </div>
</template>

<script setup lang="ts">

const mobileMenuOpen = ref(false)

// 监听路由变化，关闭移动端菜单
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>