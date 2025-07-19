<template>
    <main>
        <div class="max-w-[1691px] mx-auto pt-[40px] flex gap-[25px] items-stretch">
            <div class="left-box max-w-[1170px] flex-1">
                <div
                    class="p-[50px] w-full bg-[linear-gradient(180deg,rgba(26,23,38,1)_0%,rgba(26,23,38,0.3)_100%)] rounded-2xl ring-1 ring-white/20">
                    <div class="text-white text-base font-normal font-['Inter']">
                        总资产估值 (USDT)
                    </div>
                    <div class="flex justify-between mb-[34px]">
                        <div class="text-white text-5xl font-bold font-['DIN_Next_LT_Pro']">${{
                            formatLcx(tokenDetail.all_money) }}</div>
                        <div class="flex gap-4">
                            <UButton color="lucky" class="w-32 h-10 justify-center rounded-xl">添加资金</UButton>
                            <UButton color="transparent"
                                class="w-32 h-10 justify-center ring-1 ring-[rgba(255,255,255,1)] rounded-xl">
                                转出资金</UButton>
                        </div>
                    </div>
                    <div class="flex gap-[20px] mb-[40px]">
                        <div class="w-80 h-40 bg-white/5 rounded-2xl p-[25px_30px]">
                            <div class="flex items-center gap-[10px] mb-[22px]">
                                <div class="p-[12px] bg-[rgba(255,255,255,0.15)] rounded-full">
                                    <NuxtImg src="/images/data.svg" class="w-[16px] h-[16px]" />
                                </div>
                                <div class="text-white text-base font-thin font-['Inter']">可用金额</div>
                            </div>
                            <div class="text-white text-3xl font-medium font-['DIN_Next_LT_Pro']">
                                ${{ formatLcx(tokenDetail.usable_money) }} USD <span
                                    class="text-white/50 text-xl font-medium">≈$10.00</span>
                            </div>
                        </div>
                        <div class="w-80 h-40 bg-white/5 rounded-2xl p-[25px_30px]">
                            <div class="flex items-center gap-[10px] mb-[22px]">
                                <div class="p-[12px] bg-[rgba(255,255,255,0.15)] rounded-full">
                                    <NuxtImg src="/images/data.svg" class="w-[16px] h-[16px]" />
                                </div>
                                <div class="text-white text-base font-thin font-['Inter']">锁仓金额</div>
                            </div>
                            <div class="text-white text-3xl font-medium font-['DIN_Next_LT_Pro']">
                                ${{ formatLcx(tokenDetail.freeze_money) }} USD <span
                                    class="text-white/50 text-xl font-medium">≈$10.00</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex gap-[20px] h-12">
                            <div v-for="(item, index) in tabList" @click="selectTab(index)"
                                :class="['font-medium cursor-pointer', activeTab === index ? 'text-white text-xl font-medium' : 'text-white/50 text-base']">
                                {{ item.label }}</div>
                        </div>
                        <div>
                            <Transition name="fade">
                                <div v-if="activeTab === 0">
                                    <div class="flex">
                                        <div class="flex-1">Name</div>
                                        <div class="flex-1">数量</div>
                                        <div class="flex-1">链上地址</div>
                                        <div class="flex-1">操作</div>
                                    </div>
                                    <div class="list flex flex-col gap-[16px] rounded-2xl mt-[20px]">
                                        <div class="item flex justify-between p-[20px] rounded-[10px] items-center bg-[rgba(255,255,255,0.04)]"
                                            v-for="(item, index) in tokenList" :key="index">
                                            <div class="flex flex-1 items-center gap-[12px]">
                                                <div class="">
                                                    <NuxtImg :src="item.icon" class="w-[46px] h-[46px]" />
                                                </div>
                                                <div class="text-white text-sm font-normal font-['Inter']">
                                                    {{
                                                        item.name
                                                    }}
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <div class="text-white text-lg font-normal font-['DIN_Next_LT_Pro']">{{
                                                    formatLcx(item.wallet_amount) }}</div>
                                                <div class="text-white/50 text-sm font-normal font-['DIN_Next_LT_Pro']">
                                                    {{ `$${item.wallet_amount_sync ? formatLcx(item.wallet_amount_sync)
                                                        :
                                                        '--'}` }}</div>
                                            </div>
                                            <div class="flex-1">
                                                <div class="text-white text-lg font-normal font-['DIN_Next_LT_Pro']">{{
                                                    item.user_id || '--' }}</div>
                                            </div>
                                            <div class="flex-1 flex gap-[15px]">
                                                <div v-if="item.status === 1"
                                                    class="text-indigo-400 text-sm font-normal font-['Inter']">去激活</div>
                                                <template v-else>
                                                    <div class="text-indigo-400 text-sm font-normal font-['Inter']">添加
                                                    </div>
                                                    <div class="text-indigo-400 text-sm font-normal font-['Inter']">转出
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>

                            <Transition name="fade">

                                <!-- 限时活动 -->
                                <div v-if="activeTab === 1">
                                    <div class="mt-[20px] flex gap-[16px] justify-between items-center p-[13px_19px]">
                                        <div class="flex-2">系列</div>
                                        <div class="flex-1">数量</div>
                                    </div>
                                    <div class="list flex-col gap-[16px] mt-[20px]">
                                        <div v-for="(item, index) in nftList" :key="index"
                                            class="item flex mb-[16px] gap-[16px] justify-between items-center p-[13px_19px] rounded-2xl bg-[rgba(255,255,255,0.04)]">
                                            <div class="flex flex-2 items-center gap-[12px]">
                                                <div>
                                                    <NuxtImg :src="item.icon" class="w-[46px] h-[46px]" />
                                                </div>
                                                <div class="">
                                                    <div
                                                        class="text-white/50 text-xl font-normal font-['Inter'] mb-[5px]">
                                                        {{
                                                            item.type === 1 ? '普通系列' : '合伙人系列' }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <div class="text-white text-sm font-normal font-['Inter']">{{
                                                    item.value
                                                }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="right-box w-[496px] p-[41px_62px_45px_45px] bg-[linear-gradient(180deg,rgba(26,23,38,1)_0%,rgba(26,23,38,0.3)_100%)] rounded-2xl ring-1 ring-white/20 ">
                <div class="text-white text-4xl font-medium font-['Inter'] mb-[20px]">How does a self-custody vault
                    work?</div>
                <div class="text-white/50 text-base font-normal font-['Inter'] leading-loose mb-[50px]">Our
                    self-custodial vault
                    puts your
                    funds in your hands, with no account or KYC required - all data is securely recorded on-chain. We
                    are optimized
                    for staking on Layer-2 blockchains, providing verifiable fairness, instant on-chain settlement, and
                    100%
                    transparent and auditable public funds.</div>
                <div class="text-white text-base font-normal gap-[24px]">
                    <div v-for="(item, index) in yesList" :key="index" class="flex gap-[10px] mb-[10px] items-center">
                        <div
                            class="w-[24px] h-[24px] bg-[rgba(79,96,250,1)] rounded-full flex justify-center items-center">
                            <UIcon name="i-lucide-check" class="w-[24px] h-[24px]" />
                        </div>
                        <div>
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-[1691px] mx-auto py-[40px]">
            <div
                class="bg-[linear-gradient(180deg,rgba(26,23,38,1)_0%,rgba(26,23,38,0.3)_100%)] rounded-2xl ring-1 ring-white/20 p-[50px] w-full">
                <div class="text-white text-xl font-medium font-['Inter'] mb-[24px]">资金记录</div>
                <div class="flex justify-center ">
                    <PaginatedTable ref="tableRef" :data="tableData" :columns="columns" :page="pagination.page"
                        :pageSize="pagination.pageSize" :total="total" :columnVisibility="{}"
                        @update:page="onPageChange" @update:pageSize="onPageSizeChange" class="w-full" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import { NuxtImg } from '#components'
const UIcon = resolveComponent('UIcon')
const UPopover = resolveComponent('UPopover')
import { getBelonging, getBelongingList } from '~/composables/apiServices'
import { form } from 'viem/chains'

const globalStore = useGlobalStore()

type TokenItem = {
    name: string
    icon: string
    wallet_amount: number
    wallet_amount_sync?: number
    user_id?: string
    status?: number
    [key: string]: any
}

const tokenList = ref<TokenItem[]>([])
const tokenDetail = ref<Record<string, any>>({})
const getBelongingHandler = async () => {
    try {
        let params = { userid: globalStore.uid }
        const res = await getBelonging(params)
        tokenList.value = res.data.list.map((item: any) => ({
            ...item,
            name: 'LCX',
            icon: item.icon || '/images/lcx.png', // 默认图标
        }))
        tokenDetail.value = res.data
    } catch (err) {
        tokenList.value = []
        tokenDetail.value = {}
    }
}

await getBelongingHandler()

const typeList = [
    { label: '全部', value: 'all', id: 0 },
    { label: '充值', value: 'deposit', id: 1 },
    { label: '提现', value: 'withdraw', id: 2 },
    { label: '游戏下注', value: 'bet', id: 3 },
    { label: '游戏盈利', value: 'win', id: 4 },
    { label: '游戏额外奖励', value: 'reward', id: 5 },
    { label: '返水', value: 'reward', id: 6 },
    { label: '活动奖励-活动标题', value: 'reward', id: 7 },
    { label: '活动奖励-活动标题', value: 'reward', id: 8 },
    { label: '团队下注返佣', value: 'reward', id: 9 },
    { label: '直推奖励', value: 'reward', id: 10 },
    { label: '新人注册', value: 'reward', id: 11 },
]

const assetsType = [
    { id: 0, label: 'USDT' },
    { id: 1, label: 'LCX' },
    { id: 2, label: 'USDC' },
    { id: 3, label: 'SOL' },
]

const tableData = ref<TableRowType[]>([])
const pagination = ref({ page: 1, pageSize: 10 })
const total = ref(0)
type TableRowType = {
    id: string
    type: Number,
    amount: Number
    status: Boolean
    start: string
}
const getBelongingListHandler = async () => {
    try {
        let params = { userid: globalStore.uid, page: pagination.value.page, limit: pagination.value.pageSize }
        const res = await getBelongingList(params)
        tableData.value = res.data.list
    } catch (err) {
        tableData.value = []
    }
}

await getBelongingListHandler()

const onPageSizeChange = (newPageSize: number) => {
    pagination.value.pageSize = newPageSize
    // 这里可以添加分页大小变化的逻辑
    getBelongingListHandler()

}

const onPageChange = (newPage: number) => {
    pagination.value.page = newPage // 调整为从0开始
    // 这里可以添加页码变化的逻辑
    getBelongingListHandler()
}

const selectedType = ref(1)

const popoverOpen = ref(false)
function onTypeChange(value: number) {
    selectedType.value = value
    popoverOpen.value = false
    nextTick(() => {
        popoverOpen.value = false
    })

    // 这里可以重新请求数据或过滤本地 data
    // 比如：fetchData({ type: value })
}

const columns: TableColumn<TableRowType>[] = [
    {
        accessorFn: (row: TableRowType) => row.change_type,
        id: 'change_type',
        header: () => h(UPopover, {
            open: popoverOpen.value,
            'onUpdate:open': (val: boolean) => (popoverOpen.value = val),
            // 'v-model:open': popoverOpen,
            ui: {
                trigger: 'click',
                content: 'w-[150px] flex flex-col ring-0 rounded-2xl overflow-hidden text-xs bg-transparent'
            }
        }, {
            trigger: () => h('div', { class: 'flex bg-red-500 items-center gap-2 cursor-pointer' },
            ),
            content: () => h('div', { class: 'text-xs bg-[#2B2B36] flex flex-col' }, typeList.map(item =>
                h('div', {
                    class: [
                        'px-8 py-4 text-white text-xs font-normal cursor-pointer',
                        selectedType.value === item.id ? 'bg-[#3A3A46]' : 'hover:bg-[#23232B]'
                    ],
                    onClick: () => onTypeChange(item.id)
                }, item.label)
            )),
            default: () => h('div', {
                class: 'flex rounded-2xl w-[180px] items-center gap-2 cursor-pointer justify-center mx-auto'
            }, [
                h('span', '类型'),
                h(UIcon, { name: 'i-lucide-filter', class: '' })
            ])
        }),
        cell: ({ row }) => {
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, typeList.find(k => k.id === row.getValue('change_type'))?.label)
        }
    },
    {
        accessorFn: (row: TableRowType) => row.amount,
        id: 'change_amount',
        header: 'Token',
        cell: ({ row }) => {
            const value = row.getValue('change_amount')
            return h('div', { class: 'flex gap-[10px] items-center justify-center' }, [
                h(
                    NuxtImg,
                    {
                        src: '/images/lcx.png',
                        class: 'w-[32px] h-[32px]'
                    }
                ),
                h('span', { class: 'text-white text-sm font-font-bold' }, (typeof value === 'string' || typeof value === 'number' ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '') + ` ${assetsType.find(k => k.id === row.getValue('assetsType'))?.label}`)
            ])
        }
    },
    {
        accessorFn: (row: TableRowType) => row.status,
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const value = row.getValue('status')
            return h('span', { class: `justify-start text-sm font-normal font-Inter ${value ? 'text-[rgba(123,255,209,1)]' : 'text-[rgba(255,55,55,1)]'}` }, value ? 'Success' : 'Failed')
        }
    },
    {
        accessorFn: (row: TableRowType) => row.created_at,
        id: 'created_at',
        header: 'Date(UTC)',
        cell: ({ row }) => {
            return formatTime(row.getValue('created_at'))
        }
    }
]

const tabList = [{
    label: 'Token',
    value: 'token',
    id: 1
}, {
    label: 'NFT',
    value: 'nft',
    id: 2
}]

const activeTab = ref(0)
const selectTab = (index: number) => {
    activeTab.value = index
    // 这里可以添加切换标签页的逻辑
    console.log('Selected tab:', tabList[index].label)
}


const nftList = ref([
    {
        icon: '/images/lcx.png',
        type: 1,
        value: 200
    },
    {
        icon: '/images/lcx.png',
        type: 2,
        value: 200
    },

])

const yesList = [{
    name: '非监管'
}, {
    name: '链上账户'
}, {
    name: '资金透明可验证'
}, {
    name: '公布式节点公平开奖'
}, {
    name: '即时结算与支付'
}]
</script>

<style scoped></style>