<template>
    <main class="p-[40px_0]">
        <div
            class="p-[24px] ring-1 ring-white/20 rounded-[20px] max-w-[1644px] mx-auto bg-[linear-gradient(180deg,rgba(26,23,38,1)_0%,rgba(26,23,38,0.3)_100%))]">
            <div class="text-white text-xl font-medium font-['Inter']">活动记录</div>
            <div>
            </div>
            <div class="flex justify-center ">
                <PaginatedTable ref="tableRef" :columnVisibility="{}" :data="tableData" :columns="columns"
                    :page="pagination.page" :pageSize="pagination.pageSize" :total="total" @update:page="onPageChange"
                    @update:pageSize="onPageSizeChange" class="w-full" />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Reward History',
    middleware: ['auth-client']
})
import type { TableColumn, TableRow } from '@nuxt/ui'
import { NuxtImg } from '#components'
import { getActivityHistory } from '~/composables/apiServices'
import { formatTime } from '~/utils'
const UIcon = resolveComponent('UIcon')
const UPopover = resolveComponent('UPopover')
const globalStore = useGlobalStore()

// const tableData: TableRowType[] = Array.from({ length: total }, (_, i) => ({
//     id: `B1008${100 + i}`,
//     // type有6种情况
//     type: Math.floor(Math.random() * 6) + 1, // 随机生成1-6之间的数字
//     amount: 100000000,
//     start: '2021/10/12 18:11:15',
//     // status true or false 
//     status: Math.random() > 0.5 // 随机生成true或false
// }))
type TableRowType = {
    id: string
    type: Number,
    reward_amount: Number
    status: Boolean
    start: string,
    title: string
}

const typeList = [
    { label: '全部', id: 0 },
    { label: '签到', id: 1 },
    { label: '新手福利', id: 2 },
    { label: '限时活动', id: 2 },
]

const selectedType = ref(0)

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

const pagination = ref({ page: 1, pageSize: 1 })
const total = ref(0)
const tableData = ref<TableRowType[]>([])
const fetchTableData = async () => {
    try {
        const res = await getActivityHistory({
            page: pagination.value.page,
            limit: pagination.value.pageSize,
            userid: globalStore.uid,
            type: selectedType.value
        })
        tableData.value = res.data.list ?? []
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
            const rowData = row.original
            // return h('div', { class: 'text-white text-sm font-normal font-Inter' }, typeList.find(k => k.id === row.getValue('type'))?.label)
            return h('div', { class: 'text-white text-sm font-normal font-Inter' }, rowData.title || '--')
        }
    },
    {
        accessorFn: (row: TableRowType) => row.reward_amount,
        id: 'reward_amount',
        header: 'Amount',
        cell: ({ row }) => {
            const value = row.getValue('reward_amount')
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
        accessorFn: (row: TableRowType) => row.updated_at,
        id: 'updated_at',
        header: 'Time(UTC)',
        cell: ({ row }) => {
            return formatTime(row.getValue('updated_at'))
        }
    }
]
</script>

<style scoped></style>