<template>
    <div class="relative max-w-[1112px] mx-auto text-white pt-[100px]">
        <div
            class="relative m-auto mb-[145px] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-bold text-6xl w-[737px] text-center">
            {{ $t('documentation.developTitle') }}
        </div>
        <div class="relative max-w-[1080px] min-h-[900px] py-20">

            <!-- SVG 路径 -->
            <svg class="absolute left-0 top-0 w-full h-full pointer-events-none" :width="svgWidth" :height="svgHeight"
                :viewBox="`0 0 ${svgWidth} ${svgHeight}`">
                <defs>
                    <linearGradient id="roadmap-gradient" x1="950" y1="120" x2="950" y2="780"
                        gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="#691FE0" />
                        <stop offset="100%" stop-color="#C97CF9" />
                    </linearGradient>
                </defs>
                <path :d="svgPath" stroke="url(#roadmap-gradient)" stroke-width="2" fill="none" />
                <circle v-for="(point, i) in points" :key="i" :cx="point.x" :cy="point.y" r="6" fill="#A855F7" />
            </svg>
            <!-- 卡片内容 -->

            <div v-for="(item, i) in items" :key="item.year" :class="['roadmap-card', { 'fade-in': visible[i] }]"
                :style="cardStyles[i]" :ref="cardRefs[i]" @click="onCardClick(i)">

                <div>
                    <div class="year text-white/50 mb-[10px] text-sm">{{ item.year }}</div>
                    <div class="title max-w-[305px] mb-[10px] text-lg">{{ item.title }}</div>
                    <div class="desc text-white/50 text-sm">{{ item.desc }}</div>
                </div>

            </div>
        </div>
    </div>

    <UModal :open="modalState" :overlay="true" :content="{
        disableOutsidePointerEvents: false,
        onInteractOutside: () => {
            modalState = false
        }
    }">
        <template #content>
            <div class="bg-[#0D0A17] relative">
                <div class="absolute top-4 right-4 cursor-pointer">
                    <NuxtImg src="/images/ico/close.svg" alt="" class="w-[24px] h-[24px]" @click="modalState = false" />
                </div>
                <div v-if="currentData" class="p-6">
                    <div class="text-white/50 text-sm">{{ currentData.year }}</div>
                    <h2 class="text-xl text-white mb-4">{{ currentData.title }}</h2>
                    <p class="text-gray-300">{{ currentData.desc }}</p>
                    <div class="mb-[38px]" v-html="currentData.content"></div>
                    <div class="flex justify-between w-full max-w-[320px] m-auto">
                        <NuxtImg src="/images/ico/arrowleft.svg" alt="" class="w-[20px] h-[20px] cursor-pointer"
                            @click="next" />
                        <NuxtImg src="/images/ico/arrowright.svg" alt="" class="w-[20px] h-[20px] cursor-pointer"
                            @click="prev" />
                    </div>
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, type CSSProperties } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const modalState = ref(false)

const items = [
    {
        id: 1,
        year: 2025,
        title: 'Ecosystem integration and comprehensive commercialization',
        desc: 'Complete the development and launch of the official website and Slots game ...',
        content: `// 🚀 Launch 5+ original slots + co-branded games (IP cooperation)
            <br/>💡 Launch "Game Farming" mechanism: Hold NFT or LUCKY to participate in specific profit activities
            <br/>📈 LCX lands on centralized exchanges (CEX) or DEX to achieve on-chain circulation
            <br/>🛠️ Open multi-chain wallet support: such as support for BSC, Arbitrum, Polygon, etc.
            <br/>🧩 Launch developer SDK and introduce third-party mini-game development
            <br/>📊 Launch platform data visualization function to strengthen user asset ownership
            <br/>👥 Users exceed one million, daily active users exceed 100,000 target ... Collapse`
    },
    {
        id: 2,
        year: 2026,
        title: 'Ecosystem expansion and in-depth gamification',
        desc: '5+ original slots + co-branded games (IP cooperation) launched...',
        content: `// 🚀 Launch 5+ original slots + co-branded games (IP cooperation)
            <br/>💡 Launch "Game Farming" mechanism: Hold NFT or LUCKY to participate in specific profit activities
            <br/>📈 LCX lands on centralized exchanges (CEX) or DEX to achieve on-chain circulation
            <br/>🛠️ Open multi-chain wallet support: such as support for BSC, Arbitrum, Polygon, etc.
            <br/>🧩 Launch developer SDK and introduce third-party mini-game development
            <br/>📊 Launch platform data visualization function to strengthen user asset ownership
            <br/>👥 Users exceed one million, daily active users exceed 100,000 target ... Collapse`
    },
    {
        id: 3,
        year: 2027,
        title: 'Governance system and platform decentralization',
        desc: 'Launch DAO governance mechanism, LCX can be used for voting and proposals (such as new games, dividend mechanism...',
        content: `// 🚀 Launch 5+ original slots + co-branded games (IP cooperation)
            <br/>💡 Launch "Game Farming" mechanism: Hold NFT or LUCKY to participate in specific profit activities
            <br/>📈 LCX lands on centralized exchanges (CEX) or DEX to achieve on-chain circulation
            <br/>🛠️ Open multi-chain wallet support: such as support for BSC, Arbitrum, Polygon, etc.
            <br/>🧩 Launch developer SDK and introduce third-party mini-game development
            <br/>📊 Launch platform data visualization function to strengthen user asset ownership
            <br/>👥 Users exceed one million, daily active users exceed 100,000 target ... Collapse`
    },
    {
        id: 4,
        year: 2028,
        title: 'Ecosystem integration and comprehensive commercialization',
        desc: 'Open platform asset pledge/lending service (LCX pledge to obtain income...',
        content: `// 🚀 Launch 5+ original slots + co-branded games (IP cooperation)
            <br/>💡 Launch "Game Farming" mechanism: Hold NFT or LUCKY to participate in specific profit activities
            <br/>📈 LCX lands on centralized exchanges (CEX) or DEX to achieve on-chain circulation
            <br/>🛠️ Open multi-chain wallet support: such as support for BSC, Arbitrum, Polygon, etc.
            <br/>🧩 Launch developer SDK and introduce third-party mini-game development
            <br/>📊 Launch platform data visualization function to strengthen user asset ownership
            <br/>👥 Users exceed one million, daily active users exceed 100,000 target ... Collapse`
    }
]

const svgWidth = 1080
const svgHeight = 900

// 路径点（大弧形，整体更圆润）
const points = [
    { x: 950, y: 120 },   // 2025 右上
    { x: 600, y: 142 },   // 2026 右中
    { x: 50, y: 450 },   // 2027 左下
    { x: 600, y: 758 },   // 2028 右下
]
// 大弧形贝塞尔曲线路径
// 用一个大弧形的 cubic-bezier 曲线
const svgPath = `M 950 120 C -250 120, -250 780, 950 780`;

const yData: Record<0 | 1 | 2 | 3, number> = {
    0: 0,
    1: -145,
    2: -100,
    3: -190
}

const cardStyles = computed(() =>
    points.map((p, i) => {
        const alignLeft = i === 0 || i === 1
        const alignY: number = yData[i as 0 | 1 | 2 | 3] || 0
        return {
            position: 'absolute' as const,
            left: alignLeft ? `${p.x - i * 120 - 250}px` : `${p.x + 50 - (i % 2) / 2 * 50}px`,
            top: `${p.y + alignY}px`,
            width: '320px',
            cursor: 'pointer',
            zIndex: 2,
            transition: 'box-shadow 0.2s',
        } as CSSProperties
    })
)

// 淡入动画
const visible = ref([false, false, false, false])
const cardRefs = Array.from({ length: 4 }, () => ref<HTMLElement | null>(null))

onMounted(() => {
    nextTick(() => {
        cardRefs.forEach((refEl, i) => {
            useIntersectionObserver(refEl, ([{ isIntersecting }]) => {
                if (isIntersecting) visible.value[i] = true
            })
        })
    })
})

const currentData = ref<null | { id: number; year: number; title: string; desc: string; content: string }>(null)
function onCardClick(i: number) {
    const item = items[i]
    console.log(items[i])
    currentData.value = item
    modalState.value = true
}
const prev = () => {
    if (currentData.value && currentData.value.id > 1) {
        currentData.value = items[currentData.value.id - 2]
    }
}
const next = () => {
    if (currentData.value && currentData.value.id < items.length) {
        currentData.value = items[currentData.value.id]
    }
}
</script>

<style scoped>
.roadmap-card {
    border-radius: 16px;
    padding: 32px 32px 24px 32px;
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(.4, 0, .2, 1), transform 0.8s cubic-bezier(.4, 0, .2, 1);
    pointer-events: auto;
}

.roadmap-card:hover {
    background: rgba(24, 18, 36, 0.7);
    border-radius: 16px;
    box-shadow: 0 4px 32px 0 rgba(168, 85, 247, 0.08);
    pointer-events: auto;
}

.roadmap-card.fade-in {
    opacity: 1;
    transform: translateY(0);
}

.roadmap-card .year {
    /* font-size: 20px;
    color: #bfaaff; */
    margin-bottom: 8px;
    font-family: 'Inter', sans-serif;
}

.roadmap-card .title {
    /* font-size: 22px;
    font-weight: 600; */
    /* margin-bottom: 10px; */
    color: #fff;
}

.roadmap-card .desc {
    /* font-size: 16px;
    color: #bdbdbd;
    line-height: 1.6; */
}
</style>
