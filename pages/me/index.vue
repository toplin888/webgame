<template>
    <main>
        <div class="max-w-[1691px] mx-auto py-[40px] ">
            <div class="flex gap-[20px] h-12">
                <div v-for="(item, index) in tabList" @click="selectTab(index)"
                    :class="['font-medium cursor-pointer', activeTab === index ? 'text-white text-xl font-medium' : 'text-white/50 text-base']">
                    {{ item.label }}</div>
            </div>
            <div class="">
                <Transition :name="transitionName" mode="out-in" @after-enter="initClipboard">
                    <div :key="activeTab">
                        <div class="bg-linear-default ring-default py-[40px] min-h-[calc(100vh_-_300px)]"
                            v-if="activeTab === 0">
                            <div class="max-w-[900px] mx-auto">
                                <div class="flex gap-[16px] items-stretch mb-[40px]">
                                    <div class="relative flex items-center">
                                        <NuxtImg src="/images/user/avatar.svg" alt="User Avatar"
                                            class="w-[48px] h-[54px] rounded-full" />
                                    </div>
                                    <div class="mb-[6px] flex flex-col justify-center">
                                        <div class="text-white text-base font-normal font-['Inter']">UID</div>
                                        <div
                                            class="flex gap-[20px] items-center text-white/50 text-sm font-normal font-['Inter']">
                                            <div>{{ globalStore.userInfo.user_id }}</div>
                                            <UIcon name="i-lucide-copy" class="text-white cursor-pointer copy-btn"
                                                :data-clipboard-text="globalStore.userInfo.user_id" />
                                        </div>
                                    </div>
                                    <div class="flex items-center ml-1">
                                        <UButton color="lucky" @click="disconnectHandle">断开连接</UButton>
                                    </div>
                                </div>
                                <div class="pb-[22px] border-b-1 border-white/20 mb-6">
                                    <div class="mb-[10px]">钱包地址</div>
                                    <div
                                        class="flex gap-[20px] items-center justify-between text-white/50 text-sm font-normal font-['Inter']">
                                        <div>{{ globalStore.userInfo.address }}</div>
                                        <UIcon name="i-lucide-copy" class="text-white cursor-pointer copy-btn"
                                            :data-clipboard-text="globalStore.userInfo.address" />
                                    </div>
                                </div>
                                <div class="pb-[22px] border-b-1 border-white/20 mb-6">
                                    <div class="mb-[10px]">昵称</div>
                                    <div
                                        class="flex gap-[20px] items-center justify-between text-white/50 text-sm font-normal font-['Inter']">
                                        <div>{{ globalStore.userInfo.user_name || '--' }}</div>
                                        <div class="text-[#4B4DEF] text-sm cursor-pointer">Edit</div>
                                    </div>
                                </div>
                                <div class="pb-[22px] border-b-1 border-white/20 mb-6">
                                    <div class="mb-[10px]">邮箱</div>
                                    <div class="text-white/50 text-sm font-normal font-['Inter']">
                                        <div
                                            class="flex gap-[20px] items-center justify-between text-white/50 text-sm font-normal font-['Inter']">
                                            <div>{{ globalStore.userInfo.email || '--' }}</div>
                                            <div class="text-[#4B4DEF] text-sm cursor-pointer">Edit</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- bg-linear-default -->
                        <div class="py-[40px]" v-if="activeTab === 1">
                            <div class="flex gap-[22px] items-stretch mb-[24px]">
                                <!-- 左边 -->
                                <div class="flex-1 h-full">
                                    <div
                                        class="rounded-2xl bg-[linear-gradient(to_left,rgba(23,22,26,0.92)_0%,rgba(53,47,54,1)_100%)] p-[21px_38px] relative ">
                                        <div class="flex gap-[120px] relative z-1 ">
                                            <!-- 顶部左侧 -->
                                            <div
                                                class="flex-1 py-[17px] relative after:absolute after:h-full after:w-[1px] after:bg-[rgba(255,255,255,0.1)] after:rounded-2xl after:-right-[60px] after:top-0">
                                                <div class="flex items-center gap-[14px] mb-[30px]">
                                                    <div class="">
                                                        <NuxtImg :src="globalStore.userInfo.avatar"
                                                            class="w-[72px] h-[72px]" />
                                                    </div>
                                                    <div>
                                                        <div class="mb-[12px]">{{ globalStore.userInfo.uid }}</div>
                                                        <!-- 等级 -->
                                                        <div
                                                            class="flex justify-center items-center p-[2.5px_3.5px] rounded-xl bg-[linear-gradient(to_bottom,rgba(238,217,165,1)_0%,rgba(212,174,143,1)_100%)]">
                                                            <NuxtImg
                                                                :src="`/images/user/svip${globalStore.userInfo.promo_level}.svg`"
                                                                class="w-[39px] h-[15px]" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-[21px]">
                                                    <div class="w-24 justify-start"><span
                                                            class="text-white text-xl font-normal font-['DIN_Next_LT_Pro']">{{
                                                                currentLevelData.value / 10000 }}</span><span
                                                            class="text-white text-sm font-normal font-['DIN_Next_LT_Pro']">/</span><span
                                                            class="text-white/50 text-base font-normal font-['DIN_Next_LT_Pro']">{{
                                                                currentLevelData.maxNumber / 10000 }}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="mb-[14px]">
                                                        <UProgress v-model="currentLevelData.progress"
                                                            :max="currentLevelData.maxNumber / 10000" :ui="{
                                                                root: 'bg-transparent h-[6px]',
                                                                base: 'bg-[rgba(80,70,64,1)]',
                                                                indicator: 'bg-[rgba(242,202,171,1)]',
                                                            }" />
                                                    </div>
                                                    <div
                                                        class="flex justify-between text-white text-sm font-bold font-['DIN_Next_LT_Pro'] leading-none">
                                                        <div>SVIP{{ globalStore.userInfo.promo_level }}</div>
                                                        <div>SVIP{{ globalStore.userInfo.promo_level + 1 }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 顶部右侧 -->
                                            <div class="flex-2 ">
                                                <div class="py-[26px]">
                                                    <div class="mb-[5px]">
                                                        <div
                                                            class="w-28 h-3.5 justify-center text-neutral-200/50 text-sm font-normal font-['Inter'] leading-none">
                                                            邀请码</div>
                                                    </div>
                                                    <div class="flex items-center gap-[10px] mb-[15px]">
                                                        <div
                                                            class="flex gap-[10px] items-center justify-between text-white/50 text-sm font-normal font-['Inter']">
                                                            <div
                                                                class="text-neutral-200 text-lg font-normal font-['Inter'] leading-snug">
                                                                {{ user.inviteCode }}</div>
                                                            <UIcon name="i-lucide-copy"
                                                                class="text-white cursor-pointer hover:cursor-pointer copy-btn"
                                                                :data-clipboard-text="user.inviteCode" />
                                                        </div>
                                                    </div>
                                                    <div class="mb-[15px]">
                                                        <div
                                                            class="w-28 h-3.5 justify-center text-neutral-200/50 text-sm font-normal font-['Inter'] leading-none">
                                                            邀请链接</div>
                                                    </div>
                                                    <div class="flex items-center gap-[10px] mb-[29px]">
                                                        <div
                                                            class="flex gap-[10px] items-center justify-between text-white/50 text-sm font-normal font-['Inter']">
                                                            <div
                                                                class="text-neutral-200 text-lg font-normal font-['Inter'] leading-snug">
                                                                {{ user.inviteLink }}</div>
                                                            <UIcon name="i-lucide-copy"
                                                                class="text-white cursor-pointer hover:cursor-pointer copy-btn"
                                                                :data-clipboard-text="user.inviteLink" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <UButton class="w-[118px] h-[42px] justify-center rounded-xl"
                                                            color="lucky">生成邀请海报</UButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <span class="absolute inset-0 rounded-2xl" style="
                                            padding:2px;
                                            background:linear-gradient(to left,rgba(80,66,53,0.5) 0%,rgba(223,200,171,0.5) 50%,rgba(85,74,69,0.5) 100%);
                                            -webkit-mask:
                                                linear-gradient(#fff 0 0) content-box, 
                                                linear-gradient(#fff 0 0);
                                            -webkit-mask-composite: xor;
                                            mask-composite: exclude;
                                            box-sizing: border-box;
                                            display:block;
                                            "></span>
                                    </div>
                                </div>
                                <!-- 右边 -->
                                <div class="w-[376px] h-full">
                                    <div class="">
                                        <div class="bg-linear-default ring-default rounded-2xl">
                                            <NuxtImg src="/images/user/welfare.png" alt=""
                                                class="w-[376px] h-[274px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-[22px] items-stretch">
                                <!-- 下左边 -->
                                <div class="flex-1 h-full">
                                    <div class="rounded-2xl bg-linear-default ring-default p-[40px] relative ">
                                        <div class="grid grid-cols-4 relative gap-[20px]">
                                            <div
                                                class="p-[25px_30px] bg-[rgba(255,255,255,0.04)] ring-1 ring-white/10 rounded-2xl">
                                                <div class="flex items-center gap-[10px] mb-[24px]">
                                                    <div class="">
                                                        <NuxtImg src="/images/user/userCard1.png"
                                                            class="w-[40px] h-[40px]" />
                                                    </div>
                                                    <div class="text-white text-base font-thin font-['Inter']">有效邀请/待激活
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        class="justify-center text-white text-2xl font-bold font-['DIN_Alternate']">
                                                        {{ formatLcx(detail?.valid_invite_count || 0) }}/{{
                                                            formatLcx(detail?.pending_invite_count || 0) }}</div>
                                                </div>
                                            </div>
                                            <div
                                                class="p-[25px_30px] bg-[rgba(255,255,255,0.04)] ring-1 ring-white/10 rounded-2xl">
                                                <div class="flex items-center gap-[10px] mb-[24px]">
                                                    <div class="">
                                                        <NuxtImg src="/images/user/userCard2.png"
                                                            class="w-[40px] h-[40px]" />
                                                    </div>
                                                    <div class="text-white text-base font-thin font-['Inter']">团队下注量
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="justify-center "><span
                                                            class="text-white text-2xl font-bold font-['DIN_Alternate']">{{
                                                                0 }}
                                                        </span><span
                                                            class="text-white text-lg font-['DIN_Alternate']">USDT
                                                            / </span><span
                                                            class="text-white/50 text-lg font-['DIN_Alternate']">{{
                                                                formatLcx(detail.team_bet_amount) }}
                                                            LCX</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="p-[25px_30px] bg-[rgba(255,255,255,0.04)] ring-1 ring-white/10 rounded-2xl">
                                                <div class="flex items-center gap-[10px] mb-[24px]">
                                                    <div class="">
                                                        <NuxtImg src="/images/user/userCard1.png"
                                                            class="w-[40px] h-[40px]" />
                                                    </div>
                                                    <div class="text-white text-base font-thin font-['Inter']">直推奖励
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="w-56 h-9 justify-center"><span
                                                            class="text-white text-2xl font-bold font-['DIN_Alternate']">{{
                                                                formatLcx(detail.direct_invite_reward) }}
                                                        </span><span
                                                            class="text-white text-lg font-['DIN_Alternate']">LCX</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="p-[25px_30px] bg-[rgba(255,255,255,0.04)] ring-1 ring-white/10 rounded-2xl">
                                                <div class="flex items-center gap-[10px] mb-[24px]">
                                                    <div class="">
                                                        <NuxtImg src="/images/user/userCard1.png"
                                                            class="w-[40px] h-[40px]" />
                                                    </div>
                                                    <div class="text-white text-base font-thin font-['Inter']">下注奖励
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="justify-center "><span
                                                            class="text-white text-2xl font-bold font-['DIN_Alternate']">{{
                                                                0 }}
                                                        </span><span
                                                            class="text-white text-lg font-['DIN_Alternate']">USDT
                                                            / </span><span
                                                            class="text-white/50 text-lg font-['DIN_Alternate']">{{
                                                                formatLcx(detail.bet_reward) }}
                                                            LCX</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="pt-[40px]">
                                            <div class="text-white text-xl font-medium mb-[22px]">邀请统计</div>
                                            <div>
                                                <PaginatedTable ref="tableRef" :columnVisibility="{}" :data="tableData"
                                                    :columns="columns" :page="pagination.page"
                                                    :pageSize="pagination.pageSize" :total="total"
                                                    @update:page="onPageChange" @update:pageSize="onPageSizeChange"
                                                    class="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 下右边 -->
                                <div class="w-[376px] h-full basis-[376px] flex-shrink-0">
                                    <div class="">
                                        <div class="bg-linear-default ring-default rounded-2xl flex justify-center">
                                            <Step :steps="stepList" :currentStep="globalStore.userInfo.promo_level"
                                                :halfProgress="halfProgress" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-[40px]" v-if="activeTab === 2">
                            <!-- 游戏记录 -->
                            <div class="ring-default bg-linear-default rounded-2xl p-[40px]">
                                <PaginatedTable ref="gameTableRef" :data="gameTableData" :columns="gameColumns"
                                    :page="gamePagination.page" :pageSize="gamePagination.pageSize" :total="gameTotal"
                                    :columnVisibility="{}" @update:page="onGamePageChange"
                                    @update:pageSize="onGamePageSizeChange" class="w-full" />

                            </div>
                        </div>
                        <div class="py-[40px]" v-if="activeTab === 3">
                            <div class="">
                                <div class="grid grid-cols-7 gap-6" v-if="favoriteGame?.length > 0">
                                    <div v-for="(game, idx) in favoriteGame" :key="idx"
                                        class="flex flex-col items-center">
                                        <NuxtImg :src="game.thumbnail"
                                            class="w-[210px] h-[240px] rounded-xl object-cover mb-3" />
                                        <div class="text-white text-base font-semibold truncate w-full mb-2">
                                            {{ game.name }}</div>
                                        <div class="flex justify-start gap-2 mb-1 w-full">
                                            <!-- <span v-for="(type, tIdx) in game.types" :key="tIdx"
                                                class="bg-[#23232B] text-gray-600 text-sm px-3 py-1 rounded-lg">{{ type
                                                }}</span> -->
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <NotData />
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Me',
    middleware: ['auth-client']
})
import ClipboardJS from 'clipboard'
import type { TableColumn, TableRow } from '@nuxt/ui'
import { NuxtImg } from '#components'
const UIcon = resolveComponent('UIcon')
const UPopover = resolveComponent('UPopover')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')
import { useDisconnect } from '@wagmi/vue'
import { useGlobalStore } from '#imports'
import { getMyRomoteList, getMyRomoteDetail } from '~/composables/apiServices'

const { disconnectAsync } = useDisconnect()
const globalStore = useGlobalStore()

// const uid = 100032
const uid = null


const user = ref({
    address: '0x8213sdslasdasdasdsadsadasfkewopriopewrewr',
    avatar: '/images/ranking/ranking1.svg',
    level: 1,
    progress: 3000,
    inviteCode: '0X1232',
    inviteLink: 'https://www.hshdh.com/?regihtcode=0X1232'
})



const tabList = [
    { label: '基础资料', value: 1 },
    { label: '邀请好友', value: 2 },
    { label: '游戏记录', value: 3 },
    { label: '我的收藏', value: 4 }
]

const activeTab = ref(0)
const lastTab = ref(0)
const transitionName = computed(() =>
    activeTab.value > lastTab.value ? 'slide-left' : 'slide-right'
)

const disconnectHandle = async () => {
    await disconnectAsync()
    globalStore.logout()
    navigateTo('/')
}

const selectTab = (index: number) => {
    lastTab.value = activeTab.value
    activeTab.value = index
    // 这里可以添加切换标签页的逻辑
    if (index === 2) {
        fetchTableData()
    }
    else if (index === 3) {
        getGameHistoryHandle()
    }
    else if (index === 4) {
        getFavoriteGameHandle()
    }
}

let clipboard: ClipboardJS | null = null

function initClipboard() {
    if (clipboard) {
        clipboard.destroy()
        clipboard = null
    }
    clipboard = new ClipboardJS('.copy-btn')
    clipboard.on('success', (e) => {
    })
}

onMounted(() => {
    initClipboard()
})

const detail = ref<TableRowType | null>(null)
const currentLevelData = ref({
    level: 1,
    maxNumber: 0,
    minNumber: 0,
    value: 0,
    progress: 0,
    preMaxNumber: 0
})

const halfProgress = computed(() => {
    const res = (currentLevelData.value.value * 100 / 10000) / (currentLevelData.value.maxNumber / 10000)
    return res
})


const stepList = computed(() => {
    if (detail.value?.list && detail.value?.list?.length > 0) {
        return detail.value.list.map((item: any) => ({
            level: item.level,
            range: `${item.upgrade_min / 10000} - ${item.upgrade_max / 10000}`,
            rebate: item.bet_rebate_self / 10000,
            direct: item.register_reward / 10000,
            reward: item.bet_rebate_sub / 10000,
        }))
    }
    return []
})

const getMyRomoteDetailHandle = async () => {
    try {
        const res = await getMyRomoteDetail({
            userid: uid || globalStore.uid,
        })
        detail.value = res.data ?? null
        if (res.data.list && res.data.list.length > 0) {
            let curIndex = res.data?.list?.findIndex((item: any) => item.level === globalStore.userInfo.promo_level)
            // 获取当前项和上一个项
            let curData = null
            let prevData = null
            if (curIndex !== undefined && curIndex > -1) {
                curData = res.data.list[curIndex]
                prevData = curIndex > 0 ? res.data.list[curIndex - 1] : null
            }
            currentLevelData.value = {
                level: (curData as { level: number }).level,
                maxNumber: curData.upgrade_max,
                minNumber: curData.upgrade_min,
                value: res.data.team_bet_amount,
                progress: res.data.team_bet_amount / 10000,
                preMaxNumber: prevData ? prevData.upgrade_max : 0
            }

            console.log('currentLevelData', currentLevelData.value)
        }
        console.log('getMyRomoteDetailHandle', res)
        // tableData.value = res.data.list ?? []
        // total.value = res.data.total ?? 0
    } catch (err) {
        detail.value = null
        currentLevelData.value = {
            level: 1,
            maxNumber: 0,
            minNumber: 0,
            value: 0,
            progress: 0,
            preMaxNumber: 0
        }
        console.error('获取推广详情失败:', err)
    }

}
await getMyRomoteDetailHandle()

const pagination = ref({ page: 1, pageSize: 1 })
const total = ref(0)
const tableData = ref<TableRowType[]>([])
const fetchTableData = async () => {
    try {
        const res = await getMyRomoteList({
            page: pagination.value.page,
            limit: pagination.value.pageSize,
            userid: uid || globalStore.uid,
            // type: selectedType.value
        })
        tableData.value = res.data.list.map((item: { promo: TableRowType }) => {
            return { ...item.promo, user_name: item.user_name, self_bet_amount: item.self_bet_amount }
        })
        console.log('fetchTableData', tableData.value)
        total.value = res.data.total ?? 0
    } catch (err) {
        tableData.value = []
        total.value = 0
    }

}
await fetchTableData()

const onPageSizeChange = (newPageSize: number) => {
    pagination.value.pageSize = newPageSize
    // 这里可以添加分页大小变化的逻辑
    fetchTableData()
}

const onPageChange = (newPage: number) => {
    pagination.value.page = newPage // 调整为从0开始
    // 这里可以添加页码变化的逻辑
    fetchTableData()
}

type TableRowType = {
    type: String,
    amount: Number
    status: Boolean
    start: string
    invitee: string
    inviteeAddress: string
    count: number
    downCount: number
    usdt?: string
    lcx?: string
    remark?: string
    list?: any[] // Add this line to allow 'list' property
    created_at?: string // Add this line to fix the error
    register_parent_amount?: number // Add this line to fix the error
    bet_rebate_amount?: number // Add this line to fix the error
    self_bet_amount?: number
    user_id?: number
    activate: boolean
    valid_invite_count?: number // Add this line to fix the error
    pending_invite_count?: number // Add this line to fix the error
}

const statusList = [
    { label: '有效', value: 1, id: 1 },
    { label: '待激活', value: 0, id: 0 },
]

const selectedStatus = ref(0)

const popoverOpen = ref(false)
function onTypeChange(value: number) {
    selectedStatus.value = value
    popoverOpen.value = false
    nextTick(() => {
        popoverOpen.value = false
    })

    // 这里可以重新请求数据或过滤本地 data
    // 比如：fetchData({ type: value })
}

const columns: TableColumn<TableRowType>[] = [
    {
        accessorFn: (row: TableRowType) => row.user_id,
        id: 'user_id',
        header: ({ column }) => getHeader(column, '受邀人UID', popoverInviteeOpen),
        cell: ({ row }) => {
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.getValue('user_id') || '--')
        }
    },
    {
        accessorFn: (row: TableRowType) => row.inviteeAddress,
        id: 'inviteeAddress',
        header: ({ column }) => getHeader(column, '受邀人地址', popoverInviteeAddressOpen),
        cell: ({ row }) => {
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.original.user_id || '--')
        }
    },
    {
        accessorFn: (row: TableRowType) => row.type,
        id: 'type',
        header: '推广代数',
        cell: ({ row }) => {
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, '直推一代')
        }
    },
    {
        accessorFn: (row: TableRowType) => row.downCount,
        id: 'downCount',
        header: '下注量',
        // 每个数据除以10000
        cell: ({ row }) => {
            const usdt = row.original.usdt ?? 0
            const lcx = row.original.self_bet_amount ?? 0
            // 千分位格式化
            const format = (v: number | string) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return h('div', { class: 'text-white justify-center text-sm flex items-center' }, [
                h('span', { class: 'text-white' }, format(usdt)),
                h('span', { class: 'text-white/50 text-sm mx-1' }, 'USDT/'),
                h('span', { class: 'text-white text-sm' }, format(lcx)),
                h('span', { class: 'text-white/50 text-sm mx-1' }, 'LCX'),
            ])
        }
    },
    {
        header: '下注奖励',
        // 每个数据除以10000
        cell: ({ row }) => {
            const usdt = row.original.usdt ?? 0
            const lcx = row.original.bet_rebate_amount ?? 0
            // 千分位格式化
            const format = (v: number | string) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return h('div', { class: 'text-white justify-center text-sm flex items-center' }, [
                h('span', { class: 'text-white' }, formatLcx(Number(usdt))),
                h('span', { class: 'text-white/50 text-sm mx-1' }, 'USDT/'),
                h('span', { class: 'text-white text-sm' }, formatLcx(lcx)),
                h('span', { class: 'text-white/50 text-sm mx-1' }, 'LCX'),
            ])
        }
    },
    {
        accessorFn: (row: TableRowType) => row.register_parent_amount,
        id: 'register_parent_amount',
        header: '直推奖励',
        cell: ({ row }) => {
            const value = row.getValue('register_parent_amount') || 0
            return h('div', { class: 'flex gap-[10px] items-center justify-center' }, value + ' LCX')
        }
    },
    {
        accessorFn: (row: TableRowType) => row.created_at,
        id: 'created_at',
        header: '邀请时间(UTC)',
        cell: ({ row }) => {
            const value = row.getValue('created_at')
            console.log(value)
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, formatTime(value as string))
        }
    },
    {
        accessorFn: (row: TableRowType) => row.activate,
        id: 'activate',
        header: () => h(UPopover, {
            open: popoverOpen.value,
            'onUpdate:open': (val: boolean) => (popoverOpen.value = val),
            // 'v-model:open': popoverOpen,
            ui: {
                trigger: 'click',
                content: 'flex flex-col ring-0 rounded-2xl overflow-hidden text-xs bg-transparent'
            }
        }, {
            trigger: () => h('div', { class: 'flex bg-red-500 items-center gap-2 cursor-pointer' },
            ),
            content: () => h('div', { class: 'text-xs bg-[#2B2B36] flex flex-col' }, statusList.map(item =>
                h('div', {
                    class: [
                        'px-2 py-4 text-white text-xs font-normal cursor-pointer',
                        selectedStatus.value === item.id ? 'bg-[#3A3A46]' : 'hover:bg-[#23232B]'
                    ],
                    onClick: () => onTypeChange(item.id)
                }, item.label)
            )),
            default: () => h('div', {
                class: 'flex rounded-2xl items-center gap-2 cursor-pointer justify-center mx-auto'
            }, [
                h('span', '状态'),
                h(UIcon, { name: 'i-lucide-filter', class: '' })
            ])
        }),
        cell: ({ row }) => {
            const value = row.getValue('status')
            return h('span', { class: `justify-start text-sm font-normal font-Inter ${value ? 'text-white' : 'text-[rgba(255,55,55,1)]'}` }, value ? '有效' : '待激活')
        }
    },
    {
        accessorFn: (row: TableRowType) => row,
        id: 'action',
        header: '操作',
        cell: ({ row }) => {
            // 备注弹窗开关和内容
            const showRemark = ref(false)
            const remark = ref(row.original.remark || '')

            return h('div', { class: 'flex items-center justify-center' }, [
                h(UButton, {
                    color: 'primary',
                    variant: 'ghost',
                    class: 'text-[#474CFF] text-sm font-normal px-0',
                    onClick: () => showRemark.value = true
                }, '备注'),
                showRemark.value && h(UPopover, {
                    open: showRemark.value,
                    'onUpdate:open': (val: boolean) => (showRemark.value = val),
                    ui: {
                        content: 'w-[300px] ring-0 rounded-2xl overflow-hidden text-xs bg-[#23232B]'
                    }
                }, {
                    default: () => h('div', { class: 'flex items-center justify-center gap-2 cursor-pointer' }, [
                        h('span', '备注')
                    ]),
                    content: () => h('div', { class: 'p-4 flex flex-col gap-4' }, [
                        h('input', {
                            class: 'w-full h-[40px] bg-[#2B2B36] rounded-2xl px-[20px] text-white/80 text-sm font-normal outline-none border-none',
                            placeholder: '请输入备注',
                            value: remark.value,
                            onInput: (e: any) => (remark.value = e.target.value)
                        }),
                        h('div', { class: 'flex gap-2 justify-end' }, [
                            h(UButton, {
                                color: 'neutral',
                                variant: 'ghost',
                                onClick: () => showRemark.value = false
                            }, '取消'),
                            h(UButton, {
                                color: 'primary',
                                onClick: () => {
                                    // 保存逻辑
                                    // row.original.remark = remark.value
                                    // showRemark.value = false
                                }
                            }, '保存')
                        ])
                    ])
                })
            ])
        }
    },
]


const popoverInviteeOpen = ref(false)
const popoverInviteeAddressOpen = ref(false)

function getHeader(column: any, label: string, popoverOpen: Ref<boolean>) {
    const inputValue = ref('')
    const popContent = () => h('div', {
        class: 'bg-[#23232B] rounded-xl p-[24px] flex flex-col items-center w-[312px]'
    }, [
        h('div', {
            class: 'w-full mb-[24px]'
        }, [
            h('input', {
                class: 'w-full h-[40px] bg-[#2B2B36] rounded-2xl px-[20px] text-white/20 text-sm font-normal font-["Inter"] outline-none border-none',
                placeholder: '请输入',
                value: inputValue.value,
                onInput: (e: any) => (inputValue.value = e.target.value)
            })
        ]),
        h('div', { class: 'flex w-full gap-[24px] justify-center' }, [
            h('button', {
                class: 'flex-1 h-[36px] text-white/90 rounded-lg border border-[#5B5B6B] text-sm font-normal font-["Inter"]',
                onClick: () => popoverOpen.value = false
            }, '取消'),
            h('button', {
                class: 'flex-1 h-[36px] rounded-lg bg-[#474CFF] text-white text-sm font-normal font-["Inter"]',
                onClick: () => {
                    // 这里可以处理确认逻辑
                    popoverOpen.value = false
                }
            }, '确认')
        ])
    ])
    return h(
        UPopover,
        {
            open: popoverOpen.value,
            'onUpdate:open': (val: boolean) => (popoverOpen.value = val),
            ui: {
                trigger: 'click',
                content: 'w-[312px] ring-0 rounded-2xl overflow-hidden text-xs bg-transparent'
            }
        },
        {
            trigger: () => h('div', {
                class: 'flex items-center gap-2 cursor-pointer text-white/50 text-base font-normal'
            }),
            default: () => h('div', { class: 'flex items-center justify-center gap-2 cursor-pointer' }, [
                h('span', label),
                h(UIcon, { name: 'i-lucide-filter', class: 'text-white/50 w-[14px] h-[14px]' })
            ]),
            content: popContent
        }
    )
}

const gameTableData = ref<GameRecordRowType[]>([])
const gameTotal = ref(0)
const gamePagination = ref({ page: 1, pageSize: 10 })
const onGamePageSizeChange = (newPageSize: number) => {
    gamePagination.value.pageSize = newPageSize
    // 这里可以添加分页大小变化的逻辑
    getGameHistoryHandle()
}
const onGamePageChange = (newPage: number) => {
    gamePagination.value.page = newPage // 调整为从0开始
    // 这里可以添加页码变化的逻辑
    getGameHistoryHandle()
}

const getGameHistoryHandle = async () => {
    try {
        const res = await getGameHistory({
            page: pagination.value.page,
            limit: pagination.value.pageSize,
            userid: globalStore.uid
        })
        gameTableData.value = res.data.list ?? []
        gameTotal.value = res.data.total ?? 0
    } catch (err) {
        gameTableData.value = []
        gameTotal.value = 0
    }
}

const gameColumns: TableColumn<TableRowType>[] = [
    {
        accessorFn: (row: TableRowType) => row.user_id,
        id: 'user_id',
        header: ({ column }) => getHeader(column, 'Play ID', popoverInviteeOpen),
        cell: ({ row }) => {
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.getValue('user_id') || '--')
        }
    },
    {
        id: 'game_name',
        accessorKey: 'game_name',
        header: 'Name'
    },
    {
        accessorKey: 'valid_bet',
        header: '下注量',
        cell: ({ row }) => {
            const value = row.getValue('valid_bet')
            return h('div', { class: 'flex gap-[10px] items-center justify-center' }, [
                h(
                    NuxtImg,
                    {
                        src: '/images/lcx.png',
                        class: 'w-[32px] h-[32px]'
                    }
                ),
                h('span', { class: 'text-white text-sm font-font-bold' }, (typeof value === 'string' || typeof value === 'number' ? formatLcx(Number(value)) : '') + ' LCX')
            ])
        }
    },
    {
        accessorKey: 'total_point',
        header: '倍数',
        cell: ({ row }) => {
            const value = row.getValue('total_point')
            return h('span', { class: 'bg-indigo-400 rounded-3xl text-white text-sm text-white/90 text-sm font-normal font-Inter capitalize leading-[10px] p-[7px_10px]' }, 'x' + formatLcx(Number(value)))
        }
    },
    {
        accessorKey: 'change_gb',
        header: '下注奖励',
        cell: ({ row }) => {
            const value = row.getValue('change_gb')
            return h('div', { class: 'flex gap-[10px] items-center justify-center' }, [
                h(
                    NuxtImg,
                    {
                        src: '/images/lcx.png',
                        class: 'w-[32px] h-[32px]'
                    }
                ),
                h('span', { class: 'text-white text-sm font-font-bold' }, (value as number > 0 ? value : '0') + ' LCX')
            ])
        }
    },
    {
        accessorKey: 'random_nums',
        header: '随机数',
        cell: ({ row }) => {
            const value = row.getValue('random_nums')
            return row.getValue('random_nums') ? (row.getValue('random_nums') || '--') : '--'
        }
    },
    {
        accessorKey: 'created_date',
        header: '开始时间(UTC)',
        cell: ({ row }) => {
            return row.getValue('created_date') ? formatTimeToHMS(row.getValue('created_date') || '--') : '--'
        }
    },
    {
        accessorKey: 'end_date',
        header: '结束时间(UTC)',
        cell: ({ row }) => {
            return formatTimeToHMS(row.getValue('end_date'))
        }
    }
]

// 游戏记录表格类型
type GameRecordRowType = {
    id: string
    gameName: string
    betAmount: string
    betIcon: string
    multiplier: string
    reward: string
    rewardIcon: string
    random: string
    start: string
    end: string
}



const favoriteGame = ref([])
const getFavoriteGameHandle = async () => {
    try {
        const res = await getFavoriteGames({
            page: pagination.value.page,
            limit: pagination.value.pageSize,
            userid: globalStore.uid
        })
        gameTableData.value = res.data.list ?? []
        gameTotal.value = res.data.total ?? 0
    } catch (err) {
        gameTableData.value = []
        gameTotal.value = 0
    }
}

// 添加 tableData3 示例数据
// const tableData3: GameRecordRowType[] = Array.from({ length: 10 }, (_, i) => ({
//     id: `P${1000 + i}`,
//     gameName: gamesData[i % gamesData.length].name,
//     betAmount: (Math.floor(Math.random() * 10000) + 1000).toString(),
//     betIcon: '/images/lcx.png',
//     multiplier: `${(Math.random() * 10).toFixed(2)}x`,
//     reward: (Math.floor(Math.random() * 5000) + 500).toString(),
//     rewardIcon: 'i-lucide-gift',
//     random: (Math.random() * 100000).toFixed(0),
//     start: '2024/06/01 12:00:00',
//     end: '2024/06/01 12:05:00'
// }))

const columns3: TableColumn<GameRecordRowType>[] = [
    {
        accessorKey: 'id',
        header: 'Play ID',
        cell: ({ row }) => h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.original.id)
    },
    {
        accessorKey: 'gameName',
        header: '游戏名称',
        cell: ({ row }) => h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.original.gameName)
    },
    {
        accessorKey: 'betAmount',
        header: '下注量',
        cell: ({ row }) => {
            const value = row.getValue('betAmount')
            return h('div', { class: 'flex gap-[10px] items-center justify-center' }, [
                h(
                    NuxtImg,
                    {
                        src: '/images/lcx.png',
                        class: 'w-[32px] h-[32px]'
                    }
                ),
                h('span', { class: 'text-white text-sm font-font-bold' }, (typeof value === 'string' || typeof value === 'number' ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '') + ' LCX')
            ])
        }
    },
    {
        accessorKey: 'multiplier',
        header: '倍数',
        cell: ({ row }) => h('div', { class: 'text-white text-sm' }, row.original.multiplier)
    },
    {
        accessorKey: 'reward',
        header: '下注奖励',
        cell: ({ row }) => h('div', { class: 'flex items-center gap-2 text-white text-sm' }, [
            h(UIcon, { name: row.original.rewardIcon, class: 'text-white w-4 h-4' }),
            h('span', row.original.reward)
        ])
    },
    {
        accessorKey: 'random',
        header: '随机数',
        cell: ({ row }) => h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.original.random)
    },
    {
        accessorKey: 'start',
        header: '开始时间(UTC)',
        cell: ({ row }) => h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.original.start)
    },
    {
        accessorKey: 'end',
        header: '结束时间(UTC)',
        cell: ({ row }) => h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.original.end)
    }
]


</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
    transition: all 0.3s;
}

.slide-left-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-left-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-left-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.slide-left-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 0.3s;
}

.slide-right-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-right-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-right-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.slide-right-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>