<template>
    <main>
        <div class="flex items-center justify-center flex-col min-h-[100px] relative">
            <NuxtImg src="/images/error.svg" class="max-w-[210px] w-full h-full object-contain mb-[20px]" />
            <div class="text-white/50 text-xl">{{ msg || '出错啦！请联系管理员' }}</div>
        </div>
    </main>
</template>

<script setup lang="ts">
defineProps<{
    msg: string
}>();
</script>

<style scoped></style>