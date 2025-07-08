<template>
    <main class="max-w-[1200px] m-auto">
        <div class="flex justify-center gap-[24px] mt-[40px]">
            <div v-for="(card, idx) in cards" :key="idx" class="relative flex-1 min-w-0 max-w-[370px]">
                <div
                    class="flex flex-col items-center justify-start w-full relative z-10 p-[40px_30px_20px_30px] box-border card">
                    <div class="text-[24px] mb-[10px] text-start w-full">{{ card.title }}</div>
                    <div class="text-[16px] text-[#9893B8] mb-[15px] text-start">{{ card.desc }}</div>
                    <div class="w-full flex flex-col items-center pt-[20px]">
                        <div class="w-full h-[1px] plan-gradient-line mb-[20px] rounded-full"></div>
                        <NuxtImg :src="card.img" :alt="card.title" width="220px"
                            class="max-w-[220px] max-h-[220px] object-contain" loading="eager" fetchpriority="high" />
                    </div>
                </div>
                <span class="absolute inset-0 rounded-[10px] p-[2px] plan-gradient-border"></span>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const cards = [
    {
        title: t('plan.cardTitle1'),
        desc: t('plan.cardDesc1'),
        img: '/images/plan/plan1.svg',
    },
    {
        title: t('plan.cardTitle2'),
        desc: t('plan.cardDesc2'),
        img: '/images/plan/plan2.svg',
    },
    {
        title: t('plan.cardTitle3'),
        desc: t('plan.cardDesc3'),
        img: '/images/plan/plan3.svg',
    },
]
</script>

<style scoped lang="scss">
.card {
    background: radial-gradient(29.47% 53.61% at 13.52% 10.21%, #241C36 0%, #0D0A17 100%);
    transition: border-color 0.2s, box-shadow 0.2s;
    border-radius: 10px;
    height: 100%;
}

@keyframes bgChange {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0);
    }
}

.plan-gradient-border {
    background: linear-gradient(180deg, rgba(48, 48, 48, 1) 0%, #4e267e 100%);
    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    box-sizing: border-box;
    z-index: 20;
    display: block;
    /* 标准属性兼容 */
    // mask:
    //     linear-gradient(#fff 0 0) content-box,
    //     linear-gradient(#fff 0 0);
}

.plan-gradient-line {
    height: 1px;
    background: linear-gradient(90deg, #545454 0%, #1A1A3B 0%, #A68BEE 49%, #1A1A3B 100%);
    border: none;
    border-radius: 999px;
}


.card:hover {
    background: radial-gradient(29.47% 53.61% at 33.52% 30.21%, #241C36 0%, #0D0A17 290%);
}

.card:hover~.plan-gradient-border,
.card:has(~ .plan-gradient-border:hover)~.plan-gradient-border {
    background: linear-gradient(180deg, rgba(48, 48, 48, 1) 0%, #7D4FC9 1%, #4e267e 100%);
}
</style>
