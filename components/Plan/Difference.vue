<template>
    <main class="max-w-[1200px] m-auto">
        <section class="relative md:py-[200px]">
            <div class="relative">
                <div class="flex justify-center">
                    <div
                        class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-medium text-[55px] max-w-[1090px] text-center">
                        {{ $t('plan.differenceTitle') }}
                    </div>
                </div>
                <div class="flex justify-center relative pt-[55px]">
                    <NuxtImg src="/images/plan/report.svg" alt="Report"
                        class="max-h-[524px] max-w-[1200px] object-cover w-full" loading="eager" fetchpriority="high" />
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">

</script>
<style scoped>
.line-bg {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, 0);
    background: url('~/assets/images/economy-bg.png') no-repeat center center;
}
</style>