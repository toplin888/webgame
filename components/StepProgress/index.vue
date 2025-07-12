<template>
    <div class="w-full flex flex-col items-center">
        <div class="flex space-x-4">
            <template v-for="(step, index) in steps" :key="index">
                <div class="flex flex-col items-center" :class="getStepClass(index)">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        :class="getStepHighlight(index)">
                        {{ index + 1 }}
                    </div>
                    <div class="mt-2 text-sm" :style="getTextColor(index)">
                        {{ step.label }}
                    </div>
                </div>
            </template>
        </div>

        <!-- 进度条 -->
        <div class="relative w-full h-2 mt-6">
            <div class="absolute inset-0 bg-[rgba(38,38,61,1)] rounded-full"></div>
            <div class="absolute top-0 left-0 h-full rounded-full"
                :style="`width: ${progressWidth}%; background-color: rgba(225,195,154,1)`"></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    steps: {
        type: Array,
        default: () => [
            { label: '注册' },
            { label: '认证' },
            { label: '登记' },
            { label: '完成' }
        ]
    },
    currentStep: {
        type: Number,
        default: 1 // 当前第几步（从 1 开始）
    },
    progressValue: {
        type: Number,
        default: 1.5 // 例如 1.5 表示处于第二步一半
    }
})

// 半高亮判断
const getStepClass = (index) => {
    if (props.progressValue > index + 1) return 'font-bold'
    if (props.progressValue >= index + 0.5) return 'opacity-100'
    return 'opacity-50'
}

// 自定义颜色逻辑
const getTextColor = (index) => {
    return props.progressValue >= index + 0.5
        ? { color: 'rgba(93, 68, 38, 1)' }
        : { color: 'rgba(38, 38, 61, 1)' }
}

const getStepHighlight = (index) => {
    return props.progressValue >= index + 0.5
        ? 'bg-gradient-to-b from-[#eed9a5] to-[#eed9a5]'
        : 'bg-[rgba(38,38,61,1)]'
}

// 进度条计算（每步占 100/steps.length）
const progressWidth = Math.min(
    100,
    (props.progressValue / props.steps.length) * 100
)
</script>