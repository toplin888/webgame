<template>
    <main>
        <div class="max-w-[1644px] mx-auto py-[50px]">
            <div class="mb-[150px] relative">
                <div class="w-full flex justify-center items-center">
                    <UTabs :defaultValue="activeTab" @update:modelValue="changeTab" :items="tabsItems" :content="false"
                        class="" :ui="{
                            label: 'text-white text-base font-medium font-Inter',
                            list: 'bg-[rgba(15,18,31,1)] ring-1 ring-white/20 rounded-[20px] overflow-hidden ',
                            indicator: 'bg-[rgba(39,45,66,1)] rounded-full',
                        }" />
                </div>
                <div class="flex items-center justify-center gap-[15px] absolute top-1/2 right-0 -translate-y-1/2">
                    <span>时间</span>
                    <USelect @update:modelValue="changeTime" v-model="currentTime" class="w-[264px]" :items="timeList"
                        :ui="{
                            base: 'bg-[rgba(27,27,28,1)] text-[rgba(255,255,255,0.5)] ring-0',
                            content: 'bg-[rgba(27,27,28,1)] text-[rgba(255,255,255,0.5)] ring-0',
                            label: 'text-[rgba(255,255,255,0.5)]',
                            group: 'text-[rgba(255,255,255,0.5)]',
                            item: 'text-[rgba(255,255,255,0.5)]'
                        }" />
                </div>
            </div>
            <div class="flex gap-[19px] mb-50px">
                <div class="flex-1 relative" v-if="ranks.length" v-for="(item, index) in [ranks[1], ranks[0], ranks[2]]"
                    :key="item?.user_id || index" :class="index === 1 ? '-mt-[72px]' : ''">
                    <div class="flex flex-col items-center justify-center mb-[22px]">
                        <div class="mb-[20px]">
                            <NuxtImg v-if="item?.avatar" :src="item?.avatar"
                                class="max-w-[180px] max-h-[180px] w-[130px] object-cover" style="" />
                        </div>
                        <div class="text-neutral-200 text-xl font-normal font-['Microsoft_YaHei']">{{ item?.user_name ||
                            '--' }}
                        </div>
                    </div>
                    <div class="relative">
                        <NuxtImg src="/images/ranking/table.png" class="w-full object-cover"
                            style="aspect-ratio: 1.74;" />
                        <div
                            class="absolute top-[21px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-[10px]">
                            <NuxtImg :src="`/images/ranking/no${index + 1}.svg`"
                                class="w-[51px] object-cover mb-[18px]" />
                            <div class="text-neutral-200 text-xl font-bold font-['DIN_Alternate']">
                                {{ item?.amount?.toLocaleString() || 0 }}</div>
                            <div class="text-neutral-200 opacity-30 text-sm font-medium font-['Inter']">LCX</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mb-[40px]">
                <div
                    class="w-80 h-12 px-2.5 py-4 bg-gradient-to-l from-neutral-900/25 to-gray-900/90 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white/10 inline-flex justify-center items-center gap-2.5">
                    <div class="text-center justify-center"><span
                            class="text-white/50 text-base font-normal font-['Inter'] capitalize leading-[10px]">你的LCX为</span><span
                            class="text-white text-base font-normal font-['Inter'] capitalize leading-[10px]">
                            {{ mydata.mydata }}
                        </span><span
                            class="text-white/50 text-base font-normal font-['Inter'] capitalize leading-[10px]"> 目前排名为
                        </span><span
                            class="text-white text-base font-normal font-['Inter'] capitalize leading-[10px]">{{
                                mydata.myrank }}名</span>
                    </div>
                </div>
            </div>
            <div class="bg-linear-default ring-default pd-[24px]">
                <div class="mt-[20px] grid grid-cols-3 gap-[16px] justify-between items-center p-[13px_19px]">
                    <div class="text-center">排名</div>
                    <div class="text-center">用户</div>
                    <div class="text-center">数量</div>
                </div>
                <div class="list flex-col gap-[16px] mt-[20px]">
                    <div v-if="ranks.length > 3" v-for="(item, index) in ranks.slice(2, ranks.length)" :key="index"
                        class="item grid grid-cols-3 mb-[16px] gap-[16px] justify-between items-center p-[13px_19px] rounded-2xl bg-[rgba(255,255,255,0.04)]">
                        <div class="text-center">{{ item?.user_id }}</div>
                        <div class="flex flex-2 items-center gap-[12px] justify-center">
                            <div>
                                <NuxtImg :src="item?.avatar" class="w-[32px] h-[32px] rounded-full" />
                            </div>
                            <div class="">
                                <div class="text-white text-base font-normal font-['Inter'] mb-[5px]">
                                    {{ item?.user_name }}
                                </div>
                                <div class="text-white/60 text-sm font-normal font-['Inter']">
                                    {{ item?.address }}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-2 items-center gap-[12px] justify-center">
                            <div>
                                <NuxtImg src="/images/lcx.png" class="w-[32px] h-[32px]" />
                            </div>
                            <div class="">
                                <div class="text-white text-sm font-normal font-['Inter']">
                                    {{ item.count }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="p-[100px]">
                        <NotData />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { getRankList } from '~/composables/apiServices'

const globalStore = useGlobalStore()

const tabsItems = ref<TabsItem[]>([
    {
        label: 'LCX下注榜',
        value: 1,
        // icon: 'i-lucide-user',
        content: 'This is the account content.'
    },
    {
        label: 'LCX盈利榜',
        value: 2,

        // icon: 'i-lucide-lock',
        content: 'This is the password content.'
    },
])

const changeTime = (id: number) => {
    currentTime.value = id
    rankParams.ranktype = activeTab.value
    rankParams.datatype = currentTime.value
    getRankListHandler()
}

const timeList = ref([
    { id: 1, label: '日', value: 1 },
    { id: 2, label: '周', value: 2 },
    { id: 3, label: '月', value: 3 },
    { id: 4, label: '季度', value: 4 },
    { id: 5, label: '年', value: 5 },
    { id: 6, label: '全部', value: 6 }
])

const currentTime = ref(1)


const activeTab = ref(1)

let rankParams = { userid: globalStore.uid, ranktype: activeTab.value, datatype: currentTime.value }

interface RankItem {
    user_id?: number
    user_name?: string
    avatar?: string
    amount?: number
    count?: number
    rank?: number
    address?: string
}
const notDataList = [
    { user_id: 0, user_name: '', avatar: '', count: 0, rank: 1, address: '' },
    { user_id: 1, user_name: '', avatar: '', count: 0, rank: 2, address: '' },
    { user_id: 2, user_name: '', avatar: '', count: 0, rank: 3, address: '' },
]
const rankRes = await getRankList({ ...rankParams })
const ranks = ref<RankItem[]>([])
ranks.value = rankRes.data.list?.length
    ? rankRes.data.list
    : notDataList
console.log(ranks.value)

const mydata = ref({
    mydata: 0,
    myrank: 0
})
mydata.value = {
    mydata: rankRes.data.mydata,
    myrank: rankRes.data.myrank
}


const changeTab = (index: number | string) => {
    if (typeof index === 'string') {
        index = parseInt(index, 10)
    }
    activeTab.value = index
    rankParams.ranktype = activeTab.value
    rankParams.datatype = currentTime.value
    getRankListHandler()
}

const getRankListHandler = async () => {
    let params = { userid: globalStore.uid, ranktype: activeTab.value, datatype: currentTime.value }

    const res = await getRankList(params)
    ranks.value = res.data.list || notDataList
    mydata.value = {
        mydata: res.data.mydata,
        myrank: res.data.myrank
    }
}
</script>

<style scoped></style>