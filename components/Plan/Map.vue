<template>
    <main class="max-w-[1200px] m-auto">
        <section class="relative pb-[200px]">
            <div class="line-bg"></div>

            <div class="relative">
                <div class="flex justify-center">
                    <div
                        class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-medium text-[55px] max-w-[931px] text-center">
                        {{ $t('plan.mapTitle') }}
                    </div>
                </div>
            </div>
            <div class="map-box max-w-[1200px] w-full ring-1 ring-white/20 rounded-[48px]">
                <div class="flex justify-center relative">
                    <div class="flex justify-between w-full pt-[50px]">
                        <div class="w-[33%] flex flex-col items-center justify-center" v-for="item in mapList"
                            :key="item.id">
                            <div
                                class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-[#9faefd] to-purple-500 font-medium text-[55px] text-center mb-[14px]">
                                <!-- {{ item.num + '+' }} -->
                                <Counter :value="item.num" />+
                            </div>
                            <div class="text-[14px] max-w-[126px]">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-10px">
                    <img src="/images/plan/map.png" class="img-fluid rounded-[0_0_48px_48px]" format="webp" />
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
const { t } = useI18n()
const mapList = [
    {
        id: 1,
        title: t('plan.mapBoxTitle1'),
        num: 200
    },
    {
        id: 2,
        title: t('plan.mapBoxTitle2'),
        num: 200
    },
    {
        id: 3,
        title: t('plan.mapBoxTitle3'),
        num: 200
    },
]
</script>

<style scoped>
.line-bg {
    z-index: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background: url('~/assets/images/features-bg.svg') no-repeat center center;
}
</style>