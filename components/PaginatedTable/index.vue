<template>
    <div>
        <UTable ref="table" v-model:row-selection="rowSelection" :data="tableData" :columns="columns" :ui="{
            tbody: 'divide-none space-y-[20px] ',
            th: 'text-[rgba(255,255,255,0.50)] text-sm font-normal font-Inter bg-transparent text-center',
            tr: ' mb-[10px] rounded-[20px] overflow-hidden text-center',
            td: 'text-white/90 text-sm font-normal font-Inter',
            thead: 'text-indigo-200 text-sm font-normal font-Inter',
            separator: 'bg-transparent',
        }" @select="onSelect" />
        <div class="flex justify-end gap-4 items-center pt-4">
            <!-- <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" /> -->
            <UPagination v-model:page="pagination.page" :total="total" :ui="{
                list: 'border-0 ring-0 text-whitebg-transparent hover:text-white',
                item: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                prev: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                next: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                last: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                first: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                root: ' bg-transparent hover:text-white border-0 ring-0 rounded-full',
                label: 'text-white/50 text-sm font-normal font-Inter ring-0',
            }" />
            <div>共{{ total }}条</div>
            <div>
                <USelect v-model="pagination.pageSize" class="w-[100px]" :items="pageSizeList" :ui="{
                    base: 'bg-[rgba(27,27,28,1)] text-[rgba(255,255,255,0.5)] ring-0',
                    content: 'bg-[rgba(27,27,28,1)] text-[rgba(255,255,255,0.5)] ring-0',
                    label: 'text-[rgba(255,255,255,0.5)]',
                    group: 'text-[rgba(255,255,255,0.5)]',
                    item: 'text-[rgba(255,255,255,0.5)]'
                }" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import { NuxtImg } from '#components'
const UCheckbox = resolveComponent('UCheckbox')

// 表格
const table = useTemplateRef('table')
const pageSize = 10
const currentPage = ref(1)
const selected = ref<number[]>([])
// 模拟数据
const total = 10
const tableData: TableRowType[] = Array.from({ length: total }, (_, i) => ({
    id: `B1008${100 + i}`,
    name: '幸运777',
    amount: 100000000,
    multiplier: `${[5, 3, 1][i % 3]}`,
    icon: '/images/lcx.png',
    reward: '100,000.00 LCX',
    extra: '100,000.00 LCX',
    start: '2021/10/12 18:11:15',
    end: '2021/10/12 18:11:15',
    hash: i % 2 ? '0215...SDZ' : '待生成',
    op: '验证',
    status: i % 2
}))

type TableRowType = {
    id: string
    name: string
    amount: Number
    multiplier: string
    icon: string
    reward: string
    extra: string
    start: string
    end: string
    hash: string
    op: string
    status: number
}

const columns: TableColumn<TableRowType>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(UCheckbox, {
                color: 'lucky',
                modelValue: table.getIsSomePageRowsSelected()
                    ? 'indeterminate'
                    : table.getIsAllPageRowsSelected(),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                    table.toggleAllPageRowsSelected(!!value),
                'aria-label': 'Select all'
            }),
        cell: ({ row }) =>
            h(UCheckbox, {
                color: 'lucky',
                modelValue: row.getIsSelected(),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
                'aria-label': 'Select row'
            })
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'amount',
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
        accessorKey: 'multiplier',
        header: 'Multiplier',
        cell: ({ row }) => {
            const value = row.getValue('multiplier')
            return h('span', { class: 'bg-indigo-400 rounded-3xl text-white text-sm text-white/90 text-sm font-normal font-Inter capitalize leading-[10px] p-[7px_10px]' }, 'x' + value)
        }
    },
    {
        accessorKey: 'reward',
        header: 'Reward',
        cell: ({ row }) => {
            const value = row.getValue('reward')
            return h('div', { class: 'flex gap-[10px] items-center justify-center' }, [
                h(
                    NuxtImg,
                    {
                        src: '/images/lcx.png',
                        class: 'w-[32px] h-[32px]'
                    }
                ),
                h('span', { class: 'text-white text-sm font-font-bold' }, value + ' LCX')
            ])
        }
    },
    {
        accessorKey: 'extra',
        header: 'Extra',
        cell: ({ row }) => {
            const value = row.getValue('extra')
            return h('div', { class: 'flex gap-[10px] items-center justify-center' }, [
                h(
                    NuxtImg,
                    {
                        src: '/images/lcx.png',
                        class: 'w-[32px] h-[32px]'
                    }
                ),
                h('span', { class: 'text-white text-sm font-font-bold' }, value + ' LCX')
            ])
        }
    },
    {
        accessorKey: 'start',
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
    },
    {
        accessorKey: 'end',
        header: 'End',
        // cell: ({ row }) => {
        //   return new Date(row.getValue('end')).toLocaleString('en-US', {
        //     day: 'numeric',
        //     month: 'short',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     hour12: false
        //   })
        // }
    },
    {
        accessorKey: 'hash',
        header: 'Hash',
        cell: ({ row }) => {
            return h('span', {
                class: `${row.original.status === 1 ? 'text-indigo-400' : ''} text-sm font-normal font-Inter cursor-pointer hover:underline`,
            }, row.original.status === 1 ? row.getValue('hash') : '待生成')
        }
    },
    {
        accessorKey: 'op',
        header: 'Operation',
        cell: ({ row }) => {
            return h('span', {
                class: 'text-indigo-400 text-sm font-normal font-Inter cursor-pointer hover:underline',
                onClick: (event) => {
                    // 阻止冒泡
                    event.stopPropagation()
                    // 阻止默认行为 
                    event?.preventDefault()
                    // 处理验证逻辑
                    console.log('Verify clicked for row:', row.getValue('op'), row.original.id)
                }
            }, '验证')
        }
    }
]


const rowSelection = ref<Record<string, boolean>>({})

function onSelect(row: TableRow<TableRowType>, e?: Event) {
    /* If you decide to also select the column you can do this  */
    row.toggleSelected(!row.getIsSelected())

    console.log(e)
}

interface PaginatedTableProps<T> {
    columns: TableColumn<T>[]
    fetcher?: (pageIndex: number, pageSize: number) => Promise<{ rows: T[]; total: number }>
    initialData?: T[]
    pageSize?: number
}

const pagination = ref({ page: 0, pageSize: 10 })
const pageSize2 = ref(10)
// 是否请求
const serveMode = ref(false)
// const total = ref(0)

// const fetcher = () => {
//   $fetch(`/api/data?page=${page + 1}&limit=${size}`
// }
// const isServerMode = computed(() => !!fetcher)

// watch(pagination, async () => {
//   if (isServerMode.value && props.fetcher) {
//     const res = await props.fetcher(pagination.value.pageIndex, pagination.value.pageSize)
//     rows.value = res.rows
//     total.value = res.total
//   } else if (props.initialData) {
//     const start = pagination.value.pageIndex * pagination.value.pageSize
//     rows.value = props.initialData.slice(start, start + pagination.value.pageSize)
//     total.value = props.initialData.length
//   }
// }, { immediate: true })

// pageSize
const pageSizeList = ref([
    {
        label: '10条/页',
        value: 10
    },
    {
        label: '20条/页',
        value: 20
    },
    {
        label: '30条/页',
        value: 30
    },
    {
        label: '50条/页',
        value: 50
    }
])
</script>

<style scoped></style>