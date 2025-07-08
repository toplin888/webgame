<template>
    <main>
        <section class="relative md:p-[110px]">
            <div class="line-bg"></div>
            <div class="m-container relative ">
                <div class="flex justify-center">
                    <div
                        class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-bold text-[50px] max-w-[979px] text-center">
                        {{ $t('home.plan6GamesTitle') }}
                    </div>
                </div>
                <div class="flex justify-center relative pt-[25px] ">
                    <div class="max-w-[65%]">{{ $t('home.plan6GamesDesc') }}</div>
                </div>
                <div class="flex justify-center mt-[25px]">
                    <UButton color="lucky" class="h-[42px] text-[14px] px-10" @click="openGameLink">
                        {{ $t('home.plan6Btn') }}
                    </UButton>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
const openGameLink = () => {
    window.open('https://luckyx.games', '_blank');
};
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