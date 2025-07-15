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
                                            <div>{{ user.address }}</div>
                                            <UIcon name="i-lucide-copy" class="text-white cursor-pointer copy-btn"
                                                :data-clipboard-text="user.address" />
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
                                        <div>{{ user.address }}</div>
                                        <UIcon name="i-lucide-copy" class="text-white cursor-pointer copy-btn"
                                            :data-clipboard-text="user.address" />
                                    </div>
                                </div>
                                <div class="pb-[22px] border-b-1 border-white/20 mb-6">
                                    <div class="mb-[10px]">昵称</div>
                                    <div
                                        class="flex gap-[20px] items-center justify-between text-white/50 text-sm font-normal font-['Inter']">
                                        <div>JACK</div>
                                        <div class="text-[#4B4DEF] text-sm cursor-pointer">Edit</div>
                                    </div>
                                </div>
                                <div class="pb-[22px] border-b-1 border-white/20 mb-6">
                                    <div class="mb-[10px]">邮箱</div>
                                    <div class="text-white/50 text-sm font-normal font-['Inter']">
                                        <div
                                            class="flex gap-[20px] items-center justify-between text-white/50 text-sm font-normal font-['Inter']">
                                            <div>0x8213sdslasd@163.com</div>
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
                                                        <NuxtImg :src="user.avatar" class="w-[72px] h-[72px]" />
                                                    </div>
                                                    <div>
                                                        <div class="mb-[12px]">0x32194</div>
                                                        <!-- 等级 -->
                                                        <div
                                                            class="flex justify-center items-center p-[2.5px_3.5px] rounded-xl bg-[linear-gradient(to_bottom,rgba(238,217,165,1)_0%,rgba(212,174,143,1)_100%)]">
                                                            <NuxtImg :src="`/images/user/svip${user.level}.svg`"
                                                                class="w-[39px] h-[15px]" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-[21px]">
                                                    <div class="w-24 justify-start"><span
                                                            class="text-white text-xl font-normal font-['DIN_Next_LT_Pro']">3000</span><span
                                                            class="text-white text-sm font-normal font-['DIN_Next_LT_Pro']">/</span><span
                                                            class="text-white/50 text-base font-normal font-['DIN_Next_LT_Pro']">30000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="mb-[14px]">
                                                        <UProgress v-model="user.progress" :max="6000" :ui="{
                                                            root: 'bg-transparent h-[6px]',
                                                            base: 'bg-[rgba(80,70,64,1)]',
                                                            indicator: 'bg-[rgba(242,202,171,1)]',
                                                        }" />
                                                    </div>
                                                    <div
                                                        class="flex justify-between text-white text-sm font-bold font-['DIN_Next_LT_Pro'] leading-none">
                                                        <div>SVIP1</div>
                                                        <div>SVIP2</div>
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
                                                        145/243</div>
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
                                                            class="text-white text-2xl font-bold font-['DIN_Alternate']">5,243
                                                        </span><span
                                                            class="text-white text-lg font-['DIN_Alternate']">USDT
                                                            / </span><span
                                                            class="text-white/50 text-lg font-['DIN_Alternate']">8243
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
                                                    <div class="text-white text-base font-thin font-['Inter']">有效邀请/待激活
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="w-56 h-9 justify-center"><span
                                                            class="text-white text-2xl font-bold font-['DIN_Alternate']">3,243
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
                                                    <div class="text-white text-base font-thin font-['Inter']">有效邀请/待激活
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="justify-center "><span
                                                            class="text-white text-2xl font-bold font-['DIN_Alternate']">5,243
                                                        </span><span
                                                            class="text-white text-lg font-['DIN_Alternate']">USDT
                                                            / </span><span
                                                            class="text-white/50 text-lg font-['DIN_Alternate']">8243
                                                            LCX</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="pt-[40px]">
                                            <div class="text-white text-xl font-medium mb-[22px]">邀请统计</div>
                                            <div>
                                                <PaginatedTable :columns="columns" :data="tableData" class="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 下右边 -->
                                <div class="w-[376px] h-full basis-[376px] flex-shrink-0">
                                    <div class="">
                                        <div class="bg-linear-default ring-default rounded-2xl flex justify-center">
                                            <Step />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-[40px]" v-if="activeTab === 2">
                            <div class="ring-default bg-linear-default rounded-2xl p-[40px]">
                                <PaginatedTable :columns="columns3" :data="tableData3" class="w-full" />
                            </div>
                        </div>
                        <div class="py-[40px]" v-if="activeTab === 3">
                            <div class="">
                                <div class="grid grid-cols-7 gap-6">
                                    <div v-for="(game, idx) in gamesData" :key="idx" class="flex flex-col items-center">
                                        <NuxtImg :src="game.icon"
                                            class="w-[210px] h-[240px] rounded-xl object-cover mb-3" />
                                        <div class="text-white text-base font-semibold truncate w-full mb-2">
                                            {{ game.name }}</div>
                                        <div class="flex justify-start gap-2 mb-1 w-full">
                                            <span v-for="(type, tIdx) in game.types" :key="tIdx"
                                                class="bg-[#23232B] text-gray-600 text-sm px-3 py-1 rounded-lg">{{ type
                                                }}</span>
                                        </div>
                                    </div>
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
const { disconnectAsync } = useDisconnect()
const globalStore = useGlobalStore()

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

}

let clipboard: ClipboardJS | null = null

function initClipboard() {
    if (clipboard) {
        clipboard.destroy()
        clipboard = null
    }
    clipboard = new ClipboardJS('.copy-btn')
    clipboard.on('success', (e) => {
        console.log('Address copied to clipboard:', e.text)
    })
}

onMounted(() => {
    initClipboard()
})

const total = 10

const tableData: TableRowType[] = Array.from({ length: total }, (_, i) => ({
    id: `B1008${100 + i}`,
    // type有6种情况
    type: '直推一代', // 随机生成1-6之间的数字
    amount: 100000000,
    start: '2021/10/12 18:11:15',
    // status true or false 
    status: Math.random() > 0.5, // 随机生成true或false
    invitee: `0XMSSHJUYI${i + 1}`,
    inviteeAddress: `0XINVITE${i + 1}${Math.floor(Math.random() * 1000)}`,
    count: Math.floor(Math.random() * 100) + 1,
    downCount: Math.floor(Math.random() * 10000) + 1000,
    usdt: (Math.floor(Math.random() * 100000) + 10000).toString(),
    lcx: (Math.floor(Math.random() * 100000) + 10000).toString(),
    remark: `备注信息 ${i + 1}`
}))
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
        accessorFn: (row: TableRowType) => row.invitee,
        id: 'invitee',
        header: ({ column }) => getHeader(column, '受邀人UID', popoverInviteeOpen),
        cell: ({ row }) => {
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.getValue('invitee'))
        }
    },
    {
        accessorFn: (row: TableRowType) => row.inviteeAddress,
        id: 'inviteeAddress',
        header: ({ column }) => getHeader(column, '受邀人地址', popoverInviteeAddressOpen),
        cell: ({ row }) => {
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, row.getValue('inviteeAddress'))
        }
    },
    {
        accessorFn: (row: TableRowType) => row.type,
        id: 'type',
        header: '推广代数',
    },
    {
        accessorFn: (row: TableRowType) => row.downCount,
        id: 'downCount',
        header: '下注量',
        // 每个数据除以10000
        cell: ({ row }) => {
            const usdt = row.original.usdt ?? 0
            const lcx = row.original.lcx ?? 0
            // 千分位格式化
            const format = (v: number | string) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return h('div', { class: 'text-white text-sm flex items-center' }, [
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
            const lcx = row.original.lcx ?? 0
            // 千分位格式化
            const format = (v: number | string) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return h('div', { class: 'text-white text-sm flex items-center' }, [
                h('span', { class: 'text-white' }, format(usdt)),
                h('span', { class: 'text-white/50 text-sm mx-1' }, 'USDT/'),
                h('span', { class: 'text-white text-sm' }, format(lcx)),
                h('span', { class: 'text-white/50 text-sm mx-1' }, 'LCX'),
            ])
        }
    },

    {
        accessorFn: (row: TableRowType) => row.amount,
        id: 'amount',
        header: '直推奖励',
        cell: ({ row }) => {
            const value = row.getValue('amount')
            return h('div', { class: 'flex gap-[10px] items-center justify-center' }, value + ' LCX')
        }
    },
    {
        accessorFn: (row: TableRowType) => row.start,
        id: 'start',
        header: '邀请时间(UTC)'
    },
    {
        accessorFn: (row: TableRowType) => row.status,
        id: 'status',
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
            return h('span', { class: `justify-start text-sm font-normal font-Inter ${value ? 'text-[rgba(123,255,209,1)]' : 'text-[rgba(255,55,55,1)]'}` }, value ? 'Success' : 'Failed')
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
                                    row.original.remark = remark.value
                                    showRemark.value = false
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


const gamesData = [
    {
        name: "YUCATAN'S MYSTERY",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame1.png"
    },
    {
        name: "Buffalo 50",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame2.png"
    },
    {
        name: "ALMIGHTY SPARTA",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame3.png"
    },
    {
        name: "Hammer of Vulcan",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame4.png"
    },
    {
        name: "Hammer of Vulcan",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame5.png"
    },
    {
        name: "Hammer of Vulcan",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame6.png"
    },
    {
        name: "TOMB OF MIRRORS",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame7.png"
    },
    {
        name: "BOOK OF TIRES",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame8.png"
    },
    {
        name: "ALMIGHTY SPARTA",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame1.png"
    },
    {
        name: "SCARAB TEMPLE",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame2.png"
    },
    {
        name: "Hammer of Vulcan",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame3.png"
    },
    {
        name: "TOMB OF MIRRORS",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame4.png"
    },
    {
        name: "Hammer of Vulcan",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame5.png"
    },
    {
        name: "Hammer of Vulcan",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame6.png"
    },
    {
        name: "YUCATAN'S MYSTERY",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame7.png"
    },
    {
        name: "Buffalo 50",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame8.png"
    },
    {
        name: "ALMIGHTY SPARTA",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame1.png"
    },
    {
        name: "Hammer of Vulcan",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame2.png"
    },
    {
        name: "TEARS OF TIME",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame3.png"
    },
    {
        name: "TOMB OF MIRRORS",
        types: ["Sports", "Leisure"],
        icon: "/images/home/games/agame4.png"
    }
]

// 添加 tableData3 示例数据
const tableData3: GameRecordRowType[] = Array.from({ length: 10 }, (_, i) => ({
    id: `P${1000 + i}`,
    gameName: gamesData[i % gamesData.length].name,
    betAmount: (Math.floor(Math.random() * 10000) + 1000).toString(),
    betIcon: '/images/lcx.png',
    multiplier: `${(Math.random() * 10).toFixed(2)}x`,
    reward: (Math.floor(Math.random() * 5000) + 500).toString(),
    rewardIcon: 'i-lucide-gift',
    random: (Math.random() * 100000).toFixed(0),
    start: '2024/06/01 12:00:00',
    end: '2024/06/01 12:05:00'
}))

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