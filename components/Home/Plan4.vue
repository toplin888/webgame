<template>
    <main>
        <section class="relative md:p-[110px] ">
            <div class="line-bg h-[200px]"></div>
            <div class="m-container">
                <div class="flex justify-center">
                    <div
                        class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-bold text-[50px] max-w-[700px] text-center">
                        {{ $t('home.tradingPlatformsTitle') }}
                    </div>
                </div>
            </div>
            <div class="max-w-[1118px] mx-auto mt-[50px]">
                <NuxtImg class="w-full" src="/images/network.png" alt="" />
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">

</script>
<style scoped>
.line-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(143, 14, 177, 0.2) 100%);
}
</style>