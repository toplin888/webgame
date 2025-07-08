<template>
    <div>
        <section class="chain-section py-5 relative">
            <div
                class="pixel-grid w-[calc(16 * 70px)] h-[calc(8 * 70px)] grid grid-cols-[repeat(36,70px)] auto-rows-[70px]">
                <!-- 背景格子 -->
                <div v-for="(item, index) in grid" :key="index" class="pixel"
                    :class="{ active: activeCells.includes(index) }" />

                <!-- 中心区域内的竖线光柱 -->
                <div v-for="(line, i) in glowLines" :key="'glow-' + i" class="glow-line h-[100px] rounded-[13px]"
                    :style="{
                        left: line.left + '%',
                        top: line.top + '%'
                    }" />
            </div>
            <div class="content max-w-[1125px] ">
                <div
                    class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-bold text-[56px]">
                    {{ title }}
                </div>
                <div class="desc mt-[26px]">{{ desc }}</div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue'

const props = defineProps<{ title: string; desc: string }>()

// 可调整格子数量（行 × 列）和大小
const rows = 12
const cols = 24
const cellSize = 40 // px

const grid = Array(rows * cols).fill(0)
const activeCells = ref<number[]>([])
const glowLines = ref<{ left: number; top: number }[]>([])

let timer: ReturnType<typeof setInterval> | null = null

// 高亮随机格子
function randomActiveCells(count = 10) {
    const indices = new Set<number>()
    while (indices.size < count) {
        indices.add(Math.floor(Math.random() * grid.length))
    }
    activeCells.value = [...indices]
}

// 随机生成光柱，仅在中间区域
function generateGlowLines(count = 4) {
    const lines = []

    // 修正计算，确保在合理范围内
    const colStart = Math.floor(cols / 2)                // 从中间开始
    const colEnd = Math.min(cols - 1, Math.floor(cols / 2) + 6)  // 不超过总列数

    const rowStart = Math.floor(rows / 2) - 2
    const rowEnd = Math.min(rows - 1, Math.floor(rows / 2) + 2)  // 不超过总行数

    for (let i = 0; i < count; i++) {
        const colIndex = Math.floor(Math.random() * (colEnd - colStart + 1)) + colStart
        const rowIndex = Math.floor(Math.random() * (rowEnd - rowStart + 1)) + rowStart

        // 确保百分比不会超出范围
        const leftPercent = Math.min(99, (colIndex / cols) * 100)
        const topPercent = Math.min(99, (rowIndex / rows) * 100)

        lines.push({
            left: parseFloat(leftPercent.toFixed(2)),
            top: parseFloat(topPercent.toFixed(2)),
        })
    }

    glowLines.value = lines
}

onMounted(() => {
    randomActiveCells()
    generateGlowLines()
    timer = setInterval(() => {
        randomActiveCells()
        generateGlowLines()
    }, 3000)
})

onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
})
</script>

<style scoped>
.chain-section {

    width: 100%;
    min-height: 40rem;
    /* 或任意高度，建议用内容撑开 */
    height: auto;
    display: flex;
    justify-content: center;
    /* 内容横向居中 */
    align-items: center;
    /* 内容纵向居中（可选，若内容区需要垂直居中） */
    flex-direction: column;
    /* 内容垂直堆叠 */
}

.pixel-grid {
    position: absolute;
    top: 0;
    left: 0;
    /* width: calc(16 * 70px);
    height: calc(8 * 70px);
    display: grid;
    grid-template-columns: repeat(36, 70px);
    grid-auto-rows: 70px; */
    z-index: 0;
}

.pixel {
    border: 1px solid #0F0F0F;
    background-color: transparent;
    transition: background-color 0.5s ease;
}

.pixel.active {
    background-color: #130E1C;
}

.glow-line {
    position: absolute;
    width: 1px;
    /* 0.0625rem */
    /* 可改为 var(--pixel-height) * 2 */
    background: linear-gradient(180deg,
            rgba(191, 124, 193, 0.00) 0%,
            #e691fd 40.38%,
            #952dfb 73.56%,
            rgba(149, 45, 251, 0.00) 100%);
    opacity: 0.8;
    transition: all 0.4s ease;
}

.content {
    position: relative;
    text-align: center;
    z-index: 2;
    /* 可根据需求加padding、max-width等 */
    margin: 0 auto;

    .title {
        font-family: "Inter-Medium", sans-serif;
        font-size: 3.5rem;
        font-style: normal;
        font-weight: 500;
        /* 141.429% */
        letter-spacing: -0.09rem;
        background: linear-gradient(275deg, #6A82FC 19%, #FFECE0 36%, #FFF 64%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .desc {
        color: rgba(255, 255, 255, 0.50);
        font-family: "Inter-Regular", sans-serif;
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 300;
        /* 1.6875rem */
    }
}
</style>