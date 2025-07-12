<template>
    <div class="flex flex-col gap-[32px] py-[32px]">
        <div v-for="(step, idx) in steps" :key="step.level" class="flex items-start relative">
            <!-- 左侧步骤条 -->
            <div class="flex flex-col items-center mr-[24px]">
                <!-- SVIP圆角标签 -->
                <div :class="[
                    'w-[64px] h-[32px] flex items-center justify-center rounded-[18px] mb-[8px] text-base font-bold',
                    idx === currentStep
                        ? 'bg-gradient-to-b from-[rgba(238,217,165,1)] to-[rgba(238,217,165,1)] text-[rgba(93,68,38,1)]'
                        : 'bg-[rgba(38,38,61,1)] text-white/70'
                ]">
                    SVIP{{ step.level }}
                </div>
                <!-- 进度条 -->
                <div v-if="idx < steps.length - 1" class="w-[4px] h-[120px] rounded-full overflow-hidden relative">
                    <div :style="{
                        height: progressHeight(idx),
                        background: idx < currentStep
                            ? 'rgba(225,195,154,1)'
                            : idx === currentStep
                                ? `linear-gradient(to bottom, rgba(225,195,154,1) 0%, rgba(225,195,154,1) ${halfProgress}%, rgba(38,38,61,1) ${halfProgress}%, rgba(38,38,61,1) 100%)`
                                : 'rgba(38,38,61,1)'
                    }" class="absolute left-0 top-0 w-full h-full transition-all"></div>
                </div>
            </div>
            <!-- 右侧内容 -->
            <div class="flex-1">
                <div class="text-white text-xl font-medium mb-[8px]">团队下注量${{ step.range }}</div>
                <div class="text-white/60 mb-[4px]">权益：</div>
                <div class="mb-[2px]">
                    <span class="text-white/60">返水：</span>
                    <span :class="idx === currentStep ? 'text-[rgba(93,68,38,1)] font-medium' : 'text-white'">{{
                        step.rebate }}</span>
                </div>
                <div class="mb-[2px]">
                    <span class="text-white/60">直推奖：</span>
                    <span :class="idx === currentStep ? 'text-[rgba(93,68,38,1)] font-medium' : 'text-white'">{{
                        step.direct }}</span>
                </div>
                <div>
                    <span class="text-white/60">直推下注奖励：</span>
                    <span :class="idx === currentStep ? 'text-[rgba(93,68,38,1)] font-medium' : 'text-white'">{{
                        step.reward }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const steps = [
    {
        level: 1,
        range: '0~10,000',
        rebate: '0.2%',
        direct: '50LCX',
        reward: '0.6%'
    },
    {
        level: 2,
        range: '0~10,000',
        rebate: '0.2%',
        direct: '50LCX',
        reward: '0.6%'
    },
    {
        level: 3,
        range: '0~10,000',
        rebate: '0.2%',
        direct: '50LCX',
        reward: '0.6%'
    },
    {
        level: 4,
        range: '0~10,000',
        rebate: '0.2%',
        direct: '50LCX',
        reward: '0.6%'
    }
]

// 当前进度（高亮到第几个步骤，0为第一个，1为第二个...）
const currentStep = 0 // 可动态设置

// 步骤条高亮一半的百分比
const halfProgress = 50

function progressHeight(idx: number) {
    if (idx < currentStep) return '100%';
    if (idx === currentStep) return '100%';
    return '100%';
}
</script>

<style scoped></style>