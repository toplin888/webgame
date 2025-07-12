<template>
    <main>
        <div class="max-w-[1644px] mx-auto py-[50px]">
            <div class="mb-[150px] relative">
                <div class="w-full flex justify-center items-center">
                    <UTabs :items="tabsItems" :content="false" class="" :ui="{
                        label: 'text-white text-base font-medium font-Inter',
                        list: 'bg-[rgba(15,18,31,1)] ring-1 ring-white/20 rounded-[20px] overflow-hidden ',
                        indicator: 'bg-[rgba(39,45,66,1)] rounded-full',
                    }" />
                </div>
                <div class="flex items-center justify-center gap-[15px] absolute top-1/2 right-0 -translate-y-1/2">
                    <span>时间</span>
                    <USelect v-model="currentTime" class="w-[264px]" :items="timeList" :ui="{
                        base: 'bg-[rgba(27,27,28,1)] text-[rgba(255,255,255,0.5)] ring-0',
                        content: 'bg-[rgba(27,27,28,1)] text-[rgba(255,255,255,0.5)] ring-0',
                        label: 'text-[rgba(255,255,255,0.5)]',
                        group: 'text-[rgba(255,255,255,0.5)]',
                        item: 'text-[rgba(255,255,255,0.5)]'
                    }" />
                </div>
            </div>
            <div class="flex gap-[19px] mb-50px">
                <div class="flex-1 relative" v-for="(item, index) in [tableData[1],tableData[0],tableData[2]]" :key="item.id" :class="index === 1 ? '-mt-[72px]' : ''">
                    <div class="flex flex-col items-center justify-center mb-[22px]">
                        <div class="mb-[20px]">
                            <NuxtImg :src="item.user.avatar" class="max-w-[180px] max-h-[180px] w-[130px] object-cover" style="" />
                        </div>
                        <div class="text-neutral-200 text-xl font-normal font-['Microsoft_YaHei']">{{item.user.name}}</div>
                    </div>
                    <div class="relative">
                        <NuxtImg src="/images/ranking/table.png" class="w-full object-cover" style="aspect-ratio: 1.74;" />
                        <div class="absolute top-[21px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-[10px]">
                            <NuxtImg :src="`/images/ranking/no${index+1}.svg`" class="w-[51px] object-cover mb-[18px]" />
                            <div class="text-neutral-200 text-xl font-bold font-['DIN_Alternate']">{{item.amount.toLocaleString()}}</div>
                            <div class="text-neutral-200 opacity-30 text-sm font-medium font-['Inter']">LCX</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mb-[40px]">
                <div class="w-80 h-12 px-2.5 py-4 bg-gradient-to-l from-neutral-900/25 to-gray-900/90 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white/10 inline-flex justify-center items-center gap-2.5">
                    <div class="text-center justify-center"><span class="text-white/50 text-base font-normal font-['Inter'] capitalize leading-[10px]">你的LCX为</span><span class="text-white text-base font-normal font-['Inter'] capitalize leading-[10px]"> 2500 </span><span class="text-white/50 text-base font-normal font-['Inter'] capitalize leading-[10px]"> 目前排名为 </span><span class="text-white text-base font-normal font-['Inter'] capitalize leading-[10px]">5名</span></div>
                </div>
            </div>
            <div class="bg-linear-default ring-default pd-[24px]">
                <div class="mt-[20px] grid grid-cols-3 gap-[16px] justify-between items-center p-[13px_19px]">
                    <div class="text-center">排名</div>
                    <div class="text-center">用户</div>
                    <div class="text-center">数量</div>
                </div>
                <div class="list flex-col gap-[16px] mt-[20px]">
                    <div v-for="(item, index) in tableData.slice(2, tableData.length)" :key="index"
                        class="item grid grid-cols-3 mb-[16px] gap-[16px] justify-between items-center p-[13px_19px] rounded-2xl bg-[rgba(255,255,255,0.04)]">
                        <div class="text-center">{{item.id}}</div>
                        <div class="flex flex-2 items-center gap-[12px] justify-center">
                            <div>
                                <NuxtImg :src="item.user.avatar" class="w-[46px] h-[46px] rounded-full" />
                            </div>
                            <div class="">
                                <div
                                    class="text-white/50 text-xl font-normal font-['Inter'] mb-[5px]">
                                    {{ item.user.name }}
                                </div>
                                <div
                                    class="text-white/50 text-xl font-normal font-['Inter'] mb-[5px]">
                                    {{ item.user.address }}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-2 items-center gap-[12px] justify-center">
                            <div>
                                <NuxtImg src="/images/lcx.png" class="w-[46px] h-[46px]" />
                            </div>
                            <div class="">
                                <div
                                    class="text-white/50 text-xl font-normal font-['Inter'] mb-[5px]">
                                    {{ item.amount }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
const tabsItems = ref<TabsItem[]>([
    {
        label: 'LCX下注榜',
        // icon: 'i-lucide-user',
        content: 'This is the account content.'
    },
    {
        label: 'LCX盈利榜',
        // icon: 'i-lucide-lock',
        content: 'This is the password content.'
    },
    {
        label: 'USD下注榜',
        // icon: 'i-lucide-lock',
        content: 'This is the password content.'
    },
    {
        label: 'USD盈利榜',
        // icon: 'i-lucide-lock',
        content: 'This is the password content.'
    }
])

const changeTime = (id: number) => {
    currentTime.value = id
    // timeList.value.forEach(item => {

    // })
}

const timeList = ref([
    { id: 1, label: '全部', value: 1, onSelect: () => changeTime(1) },
    { id: 2, label: '年', value: 2, onSelect: () => changeTime(2) },
    { id: 3, label: '月', value: 3, onSelect: () => changeTime(3) },
    { id: 4, label: '周', value: 4, onSelect: () => changeTime(4) },
    { id: 5, label: '日', value: 5, onSelect: () => changeTime(5) }
])

const currentTime = ref(1)

const list = ref([
    { id: 1, title: '用户1', amount: 1000, time: '2023-10-01' },
    { id: 2, title: '用户2', amount: 2000, time: '2023-10-02' },
    { id: 3, title: '用户3', amount: 3000, time: '2023-10-03' }
])

const avatarList = [
    '/images/ranking/ranking1.svg',
    '/images/ranking/ranking2.svg',
    '/images/ranking/ranking3.svg'
]

const tableData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    user: {
        name: i < 3 ? 'Skulldugger' : 'Jack',
        avatar: i < 3 ? avatarList[i] : '/images/nav/user.png',
        address: '0xwieaskdlskadwqoewqewqeqsadsadsad'
    },
    amount: 1000 * ((100 - i) * 13)
}))

</script>

<style scoped></style>