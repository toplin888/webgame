<template>
    <main>
        <div
            class="banner flex items-center justify-between max-w-[1200px] mx-auto relative after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-[300px] after:h-[300px] after:bg-[radial-gradient(circle,rgba(48,0,131,0.5)_0%,_rgba(48,0,131,0.15)_50%,transparent_100%))] after:z-10 after:rounded-full">
            <div class="">
                <div class="text-white text-6xl font-bold font-['Inter'] mb-[28px]">LCX领不停</div>
                <div class="text-white text-xl font-normal font-['Inter']">完成任務，即可获得<span
                        class="text-purple-400 text-xl font-normal font-['Inter']">LCX</span></div>
            </div>
            <div class="relative">
                <NuxtImg src="/images/reward/reward-banner.png"
                    class="h-[400px] rounded-2xl relative z-1 object-fill" />
            </div>
        </div>
        <!-- 每日签到 -->
        <div class="mb-[24px] max-w-[1200px] mx-auto p-[34px_58px]">
            <div class="flex items-center justify-between mb-[30px]">
                <div>
                    <div class="mb-[10px] text-neutral-200 text-xl font-normal font-['Microsoft_YaHei']">每日签到</div>
                    <div class="text-neutral-400 text-sm font-normal font-['Microsoft_YaHei']">已连续签到<span
                            class="text-indigo-400">{{ signDay }}</span>天</div>
                </div>
                <div>
                    <NuxtImg src="/images/reward/history.svg" class="w-[20px] h-[20px]" />
                </div>
            </div>
            <div class="grid grid-cols-7 gap-[13px]">
                <!-- bg-gradient-to-b from-violet-400 via-violet-300 to-violet-300 -->
                <div class="flex flex-col items-center justify-center w-full p-[15px] rounded-2xl border border-dashed border-white/20"
                    :class="index == 6 ? 'bgLight' : 'bg-[rgba(8, 9, 16, 1)]'" v-for="(item, index) in signList"
                    :key="index">
                    <div class=" text-sm mb-[20px]"
                        :class="[index == 6 ? 'text-[#6C2993] font-bold' : 'text-white/50 font-normal']">{{
                            item.name }}</div>
                    <div>
                        <div v-if="index != 6"
                            class="relative mb-[15px] after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-[80px] after:h-[80px] after:bg-[radial-gradient(circle,rgba(14,16,232,0.2)_0%,_rgba(14,16,232,0.2)_40%,rgba(14,16,232,0.1)_60%,rgba(180,29,255,0)_100%))] after:rounded-full">
                            <NuxtImg src="/images/lcx.png" class="w-[38px] h-[38px]" />
                        </div>
                        <div v-else class="relative mb-[15px] ">
                            <NuxtImg src="/images/reward/reward1.svg" class="w-[38px] h-[40px]" />
                        </div>
                    </div>
                    <div class=" font-bold font-['DIN_Next_LT_Pro'] mb-[15px]"
                        :class="[index == 6 ? 'text-[#7B3F9F] text-base' : 'text-white text-lg']">{{ item.value }}</div>
                    <UButton v-if="!item.status && !item.lock" color="lucky"
                        class="w-[92px] h-[42px] justify-center rounded-xl">签到
                    </UButton>
                    <div v-if="item.status"
                        class="w-24 h-10 relative flex items-center justify-center rounded-xl bg-[rgba(38,39,98,1)] text-white/20 text-sm font-normal">
                        已签
                    </div>
                    <div v-if="item.lock"
                        class="w-24 h-10 relative bg-[rgba(41,43,66,0.5)] rounded-xl backdrop-blur-[1.25px] flex items-center justify-center">
                        <NuxtImg src="/images/reward/lock-disable.svg" class="w-[16x] h-[16px]" />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="flex"></div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { UButton } from '#components';

const signDay = ref(0)
const signList = ref([
    { day: 1, status: true, name: 'Day 1', value: '50', lock: false },
    { day: 2, status: false, name: 'Day 2', value: '50', lock: false },
    { day: 3, status: false, name: 'Day 3', value: '50', lock: true },
    { day: 4, status: false, name: 'Day 4', value: '50', lock: true },
    { day: 5, status: false, name: 'Day 5', value: '50', lock: true },
    { day: 6, status: false, name: 'Day 6', value: '50', lock: true },
    { day: 7, status: false, name: 'Day 7', value: '大奖', lock: true }
])
</script>

<style scoped>
.bgLight {
    background: linear-gradient(to bottom, #A377F0 0%, #CAB5FF 25%, #A36BEC 75%, #B7A8F4 100%);
}
</style>