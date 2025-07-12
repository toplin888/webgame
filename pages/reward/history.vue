<template>
    <main class="p-[40px_0]">
        <div
            class="p-[24px] ring-1 ring-white/20 rounded-[20px] max-w-[1644px] mx-auto bg-[linear-gradient(180deg,rgba(26,23,38,1)_0%,rgba(26,23,38,0.3)_100%))]">
            <div class="text-white text-xl font-medium font-['Inter']">活动记录</div>
            <div>
            </div>
            <div class="flex justify-center ">
                <PaginatedTable :columns="columns" :data="tableData" class="w-full" />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import { NuxtImg } from '#components'
const UIcon = resolveComponent('UIcon')
const UPopover = resolveComponent('UPopover')

const total = 10

const tableData: TableRowType[] = Array.from({ length: total }, (_, i) => ({
    id: `B1008${100 + i}`,
    // type有6种情况
    type: Math.floor(Math.random() * 6) + 1, // 随机生成1-6之间的数字
    amount: 100000000,
    start: '2021/10/12 18:11:15',
    // status true or false 
    status: Math.random() > 0.5 // 随机生成true或false
}))
type TableRowType = {
    id: string
    type: Number,
    amount: Number
    status: Boolean
    start: string
}

const typeList = [
    { label: '全部', value: 'all', id: 0 },
    { label: '签到', value: 'sign', id: 1 },
    { label: '充值', value: 'deposit', id: 2 },
    { label: '提现', value: 'withdraw', id: 3 },
    { label: '游戏下注', value: 'bet', id: 4 },
    { label: '游戏中奖', value: 'win', id: 5 },
    { label: '活动奖励', value: 'reward', id: 6 }
]

const selectedType = ref(1)

const popoverOpen = ref(false)
function onTypeChange(value: number) {
    selectedType.value = value
    console.log(value)
    popoverOpen.value = false
    nextTick(() => {
        popoverOpen.value = false
    })

    // 这里可以重新请求数据或过滤本地 data
    // 比如：fetchData({ type: value })
}

const columns: TableColumn<TableRowType>[] = [
    {
        accessorFn: (row: TableRowType) => row.type,
        id: 'type',
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
                // h(typeList.map(item =>
                //     h('div', {
                //         class: [
                //             'px-8 py-4 text-white text-base font-normal cursor-pointer',
                //             selectedType.value === item.id ? 'bg-[#3A3A46]' : 'hover:bg-[#23232B]'
                //         ],
                //         onClick: () => onTypeChange(item.id)
                //     }, item.label)
                // ))
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
                h('span', 'Type'),
                h(UIcon, { name: 'i-lucide-filter', class: '' })
            ])
        }),
        cell: ({ row }) => {
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, typeList.find(k => k.id === row.getValue('type'))?.label)
        }
    },
    {
        accessorFn: (row: TableRowType) => row.amount,
        id: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const value = row.getValue('amount')
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
        accessorFn: (row: TableRowType) => row.status,
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const value = row.getValue('status')
            return h('span', { class: `justify-start text-sm font-normal font-Inter ${value ? 'text-[rgba(123,255,209,1)]' : 'text-[rgba(255,55,55,1)]'}` }, value ? 'Success' : 'Failed')
        }
    },
    {
        accessorFn: (row: TableRowType) => row.start,
        id: 'start',
        header: 'Start',
        // cell: ({ row }) => {
        //   return new Date(row.getValue('start')).toLocaleString('en-US', {
        //     day: 'numeric',
        //     month: 'short',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     hour12: false
        //   })
        // }
    }
]
</script>

<style scoped></style>