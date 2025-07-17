<template>
    <main>
        <div
            class="banner mb-[15px] flex items-center justify-between max-w-[1200px] mx-auto relative after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-[300px] after:h-[300px] after:bg-[radial-gradient(circle,rgba(48,0,131,0.5)_0%,_rgba(48,0,131,0.15)_50%,transparent_100%))] after:z-10 after:rounded-full">
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
        <div class="mb-[24px] max-w-[1200px] mx-auto p-[34px_58px] ring-1 ring-white/10 rounded-2xl">
            <div class="flex items-center justify-between mb-[30px]">
                <div>
                    <div class="mb-[10px] text-neutral-200 text-xl font-normal font-['Microsoft_YaHei']">每日签到</div>
                    <div class="text-neutral-400 text-sm font-normal font-['Microsoft_YaHei']">已连续签到<span
                            class="text-indigo-400">{{ signDay }}</span>天</div>
                </div>
                <div @click="toHistory">
                    <NuxtImg src="/images/reward/history.svg" class="w-[20px] h-[20px]" />
                </div>
            </div>
            <div class="grid grid-cols-7 gap-[13px]">
                <!-- bg-gradient-to-b from-violet-400 via-violet-300 to-violet-300 -->
                <div class="flex flex-col items-center justify-center w-full p-[15px] rounded-2xl border border-dashed border-white/20"
                    :class="index == 6 ? 'bgLight' : 'bg-[rgba(8, 9, 16, 1)]'" v-for="(item, index) in signList"
                    :key="item.id">
                    <div class=" text-sm mb-[20px]"
                        :class="[index == 6 ? 'text-[#6C2993] font-bold' : 'text-white/50 font-normal']">{{
                            `第${item.day_index}天` }}</div>
                    <div>
                        <div v-if="index != 6"
                            class="relative mb-[15px] after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-[80px] after:h-[80px] after:bg-[radial-gradient(circle,rgba(14,16,232,0.2)_0%,_rgba(14,16,232,0.2)_40%,rgba(14,16,232,0.1)_60%,rgba(180,29,255,0)_100%))] after:rounded-full">
                            <NuxtImg src="/images/lcx.png" class="w-[38px] h-[38px]" />
                        </div>
                        <div v-else class="relative mb-[15px] " style="filter: drop-shadow(0 0 24px 8px #A377F0)">
                            <NuxtImg src="/images/reward/reward2.png"
                                class="w-[38px] h-[40px] drop-shadow-[0_0_24px_#A377F0]"
                                style="filter: drop-shadow(1px 1px 150px #000);" />
                        </div>
                    </div>
                    <!-- ,0_0_48px_16px_#CAB5FF,0_0_80px_32px_#B7A8F4 -->
                    <div class=" font-bold font-['DIN_Next_LT_Pro'] mb-[15px]"
                        :class="[index == 6 ? 'text-[#7B3F9F] text-base' : 'text-white text-lg']">{{
                            index == 6 ? $t('reward.sign7dayName') : item.reward_amount / 10000
                        }}
                    </div>
                    <UButton v-if="item.day_index === signDay && !signStatus" @click="signHandler(item)" color="lucky"
                        class="w-[92px] h-[42px] justify-center rounded-xl">签到
                    </UButton>
                    <div v-if="item.day_index === signDay && signStatus"
                        class="w-24 h-10 relative flex items-center justify-center rounded-xl bg-[rgba(38,39,98,1)] text-white/20 text-sm font-normal">
                        已签
                    </div>
                    <div v-if="item.day_index > signDay"
                        class="w-24 h-10 relative bg-[rgba(41,43,66,0.5)] rounded-xl backdrop-blur-[1.25px] flex items-center justify-center">
                        <NuxtImg src="/images/reward/lock-disable.svg" class="w-[16x] h-[16px]" />
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-[1200px] mb-[50px] mx-auto p-[28px_32px] bg-linear-default rounded-2xl ring-1 ring-white/10">
            <div class="flex gap-[20px] h-12">
                <div v-for="(item, index) in tabList" @click="selectTab(index)"
                    :class="['font-medium cursor-pointer', activeTab === index ? 'text-white text-xl font-medium' : 'text-white/50 text-base']">
                    {{ item.label }}</div>
            </div>
            <div>
                <Transition name="fade">
                    <div class="list flex flex-col gap-[16px] rounded-2xl mt-[20px]" v-if="activeTab === 0">
                        <div class="item flex justify-between p-[20px] rounded-[10px] items-center bg-[rgba(255,255,255,0.04)]"
                            v-for="(item, index) in taskList" :key="index">
                            <div class="flex items-center gap-[12px]">
                                <div>
                                    <NuxtImg src="/images/reward/avtar1.svg" class="w-[46px] h-[46px]" />
                                </div>
                                <div class="">
                                    <div class="text-white/50 text-xl font-normal font-['Inter'] mb-[5px]">{{
                                        item.activity.title
                                    }}
                                    </div>
                                    <div class="text-white/50 text-sm font-normal font-['Inter']">{{
                                        item.activity.content }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-[32px]">
                                <div
                                    class="flex gap-[8px] items-center text-white text-sm font-bold font-['DIN_Alternate']">
                                    <NuxtImg src="/images/lcx.png" class="w-[32px] h-[32px]" />
                                    <span>{{ formatLcx(item.activity.reward_amount) }}LCX</span>
                                </div>
                                <div class="">
                                    <template v-if="item.lock">
                                        <div
                                            class="w-24 h-10 relative bg-[rgba(41,43,66,0.5)] rounded-xl backdrop-blur-[1.25px] flex items-center justify-center">
                                            <NuxtImg src="/images/reward/lock-disable.svg" class="w-[16x] h-[16px]" />
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div v-if="item.status === 1"
                                            class="w-24 h-10 relative flex items-center justify-center rounded-xl bg-[rgba(38,39,98,1)] text-white/20 text-sm font-normal">
                                            已领取
                                        </div>
                                        <UButton @click="openModal(item)" v-else-if="item.status === 2" color="lucky"
                                            class="w-[92px] h-[42px] justify-center rounded-xl">
                                            领取
                                        </UButton>
                                        <div v-else @click="toDoTask(item)"
                                            class="w-24 h-10 relative flex items-center justify-center bg-transparent text-[#7779FF] text-sm font-normal ring-1 ring-[#7779FF] rounded-xl">
                                            去完成
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>

                <Transition name="fade">

                    <!-- 限时活动 -->
                    <div class="list grid grid-cols-3 gap-[16px] mt-[20px]" v-if="activeTab === 1">
                        <div v-for="(item, index) in activityList" :key="index"
                            class="item flex gap-[16px] justify-between items-center p-[13px_19px] ring-1 ring-white/10 rounded-2xl bg-[rgba(255,255,255,0.04)]">
                            <div>
                                <NuxtImg :src="item.icon" class="w-[122px] h-[138px] rounded-2xl" />
                            </div>
                            <div class="">
                                <div class="text-white text-lg font-normal font-['Inter'] mb-[6px]">{{ item.name }}
                                </div>
                                <div class="mb-[24px] text-white/50 text-xs font-normal font-['Inter'] leading-none">
                                    {{ item.desc }}
                                </div>
                                <div>
                                    <UButton color="lucky" class="w-[160px] justify-center rounded-[10px]"
                                        @click="confirmModal2">领取
                                    </UButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
        <UModal v-model:open="showModal" :ui="{
            content: 'bg-[linear-gradient(180deg,#1A1726_0%,#0C0B14_100%)] ring-white/20 rounded-2xl',
            overlay: 'bg-[rgba(0,0,0,0.8)]',
        }">
            <template #content>
                <div class="p-[40px_45px] relative">
                    <div class="absolute top-4 right-4 cursor-pointer">
                        <NuxtImg src="/images/close.svg" alt="" class="w-[24px] h-[24px]" @click="showModal = false" />
                    </div>
                    <div class="text-white text-2xl font-normal font-['Inter'] mb-[40px]">如何将网页链接添加到桌面</div>
                    <div class="mb-[30px]">
                        <UStepper :highlight="false" :disabled="true" :ui="{
                            trigger: 'mt-2.5 w-[26px] h-[26px] ring-1 ring-[rgba(193,123,255,1)] bg-transparent text-[rgba(193,123,255,1)] group-data-[state=active]:bg-[rgba(193,123,255,1)]',
                            separator: 'border-dashed border-l-1 border-white/20 bg-transparent text-white/20',
                            title: 'text-white/50 text-base font-normal mb-[16px]',
                            description: 'text-white/20 text-sm font-normal',
                        }" orientation="vertical" :items="items" class="w-full" />
                    </div>
                    <UButton class="w-full justify-center" color="lucky" @click="confirmModal">确定</UButton>
                </div>
            </template>
        </UModal>
        <UModal v-model:open="showModal2" :ui="{
            content: 'bg-[linear-gradient(180deg,#1A1726_0%,#0C0B14_100%)] ring-white/20 rounded-2xl',
            overlay: 'bg-[rgba(0,0,0,0.8)]',
        }">
            <template #content>
                <div
                    class="p-[40px_45px] relative after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-[300px] after:h-[300px] after:bg-[radial-gradient(circle,rgba(48,0,131,0.5)_0%,_rgba(48,0,131,0.15)_50%,transparent_100%))]">
                    <div class="absolute top-4 right-4 cursor-pointer">
                        <NuxtImg src="/images/close.svg" alt="" class="w-[24px] h-[24px]" @click="showModal2 = false" />
                    </div>
                    <div class="text-white text-center text-2xl font-semibold font-['Inter'] mb-[40px]">恭喜你完成任务</div>
                    <div class="mb-[65px] flex justify-center items-center">
                        <div>
                            <NuxtImg src="/images/lcx.png" class="w-[76px] h-[76px] drop-shadow-[0_0_24px_#A377F0]" />
                        </div>
                        <div
                            class="text-white text-3xl font-bold font-['DIN_Alternate'] leading-7 ml-[15px] relative z-10">
                            +{{
                                rewardValue }} LCX
                        </div>
                    </div>
                    <UButton class="w-full justify-center h-[48px] relative z-10" color="lucky"
                        @click="showModal2 = false">确定
                    </UButton>
                </div>
            </template>
        </UModal>
    </main>
</template>

<script setup lang="ts">
import { UButton } from '#components';
import type { StepperItem } from '@nuxt/ui'
import { getActivityList, getSignList, signin } from '~/composables/apiServices'
import { formatLcx } from '~/utils';
const toast = useToast()
const globalStore = useGlobalStore()
const signDay = ref(0)
const signStatus = ref(false)
const signList = ref([
    { day: 1, status: true, name: 'Day 1', value: '50', lock: false },
    { day: 2, status: false, name: 'Day 2', value: '50', lock: false },
    { day: 3, status: false, name: 'Day 3', value: '50', lock: true },
    { day: 4, status: false, name: 'Day 4', value: '50', lock: true },
    { day: 5, status: false, name: 'Day 5', value: '50', lock: true },
    { day: 6, status: false, name: 'Day 6', value: '50', lock: true },
    { day: 7, status: false, name: 'Day 7', value: '大奖', lock: true }
])

const getSignListHandler = async () => {
    let params = { userid: globalStore.uid, language: globalStore.locale }
    const res = await getSignList(params)
    signList.value = res.data.list
    signDay.value = res.data.day
    signStatus.value = res.data.issign
    console.log('活动列表:', res.data)
}

await getSignListHandler()

const tabList = [{
    label: '新手福利',
    value: 'welfare',
    id: 1
}, {
    label: '限时活动',
    value: 'activity',
    id: 2
}]

const activeTab = ref(0)
const selectTab = (index: number) => {
    activeTab.value = index
    // 这里可以添加切换标签页的逻辑
    console.log('Selected tab:', tabList[index].label)
}

const taskList = ref([
    { id: 1, name: '将网页添加到桌面', value: '100,000.00 LCX', status: 1, lock: false, desc: '文件描述' },
    { id: 2, name: '将网页添加到桌面', value: '100,000.00 LCX', status: 2, lock: false, desc: '文件描述' },
    { id: 3, name: '将网页添加到桌面', value: '100,000.00 LCX', status: 3, lock: false, desc: '文件描述' },
    { id: 4, name: '将网页添加到桌面', value: '100,000.00 LCX', status: 1, lock: true, desc: '文件描述' },
    { id: 5, name: '将网页添加到桌面', value: '100,000.00 LCX', status: 2, lock: true, desc: '文件描述' },
    { id: 6, name: '将网页添加到桌面', value: '100,000.00 LCX', status: 3, lock: true, desc: '文件描述' },
])

const getActivityListHandler = async () => {
    let params = { userid: globalStore.uid, language: globalStore.locale }
    const res = await getActivityList(params)
    taskList.value = res.data
    console.log('活动列表:', res.data)
}

await getActivityListHandler()

const rewardValue = ref(0)
const signHandler = (item: any) => {
    console.log(item)
    signin({
        userid: globalStore.uid,
        id: signDay.value,
    }).then((res: any) => {
        if (res.code === 200) {
            showModal2.value = true
            rewardValue.value = item.reward_amount / 10000
            signStatus.value = true
        } else if (res.code === 30001) {
            toast.add({
                title: res.msg || '已签到',
            })
        }
    }).catch((err: any) => {
        toast.add({
            title: '签到失败，请重新尝试',
        })
    })
}
// 弹窗
const showModal = ref(false)
const showModal2 = ref(false)


const openModal = (item: any) => {
    showModal.value = true
}

// 手动将完成到的步骤之前的icon都为check
const items = ref<StepperItem[]>([
    {
        title: '已完成的步骤',
        description: '提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字',
        icon: 'i-lucide-check'
    },
    {
        title: '进行中的步骤',
        description: '提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字',
    },
    {
        title: '未开始的步骤',
        description: '提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字'
    },
    {
        title: '未开始的步骤',
        description: '提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字'
    }
])

const confirmModal = () => {
    showModal.value = false
    showModal2.value = true
    console.log('确认操作')
}

const confirmModal2 = () => {
    showModal2.value = false
    console.log('确认操作')
}

const activityList = ref([
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame1.png'
    },
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame2.png'
    },
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame3.png'
    },
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame4.png'
    },
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame5.png'
    },
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame6.png'
    },
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame7.png'
    },
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame8.png'
    },
    {
        name: '新人冲冲冲',
        desc: '活动详情活动详情活动详情活动详情活动...',
        status: 0,
        icon: '/images/home/games/agame1.png'
    }
])

const toHistory = () => {
    // 跳转到活动记录页面
    navigateTo('/reward/history')
}

const toDoTask = (item: any) => {
    // 跳转到任务详情页面


}
</script>

<style scoped>
.bgLight {
    background: linear-gradient(to bottom, #A377F0 0%, #CAB5FF 25%, #A36BEC 75%, #B7A8F4 100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>