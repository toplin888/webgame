<template>
    <div>
        <UTable class="w-full" ref="table" v-model:row-selection="rowSelection" :data="props.data"
            :columns="props.columns" :ui="{
                tbody: 'divide-none space-y-[20px] ',
                th: 'text-[rgba(255,255,255,0.50)] text-sm font-normal font-Inter bg-transparent text-center',
                tr: ' mb-[10px] rounded-[20px] overflow-hidden text-center',
                td: 'text-white/90 text-sm font-normal font-Inter',
                thead: 'text-indigo-200 text-sm font-normal font-Inter',
                separator: 'bg-transparent',
            }" @select="onSelect" />
        <div class="flex justify-end gap-4 items-center pt-4">
            <UPagination v-model:page="pagination.page" :total="props.total ?? props.data.length" :ui="{
                list: 'border-0 ring-0 text-whitebg-transparent hover:text-white',
                item: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                prev: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                next: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                last: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                first: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0',
                root: ' bg-transparent hover:text-white border-0 ring-0 rounded-full',
                label: 'text-white/50 text-sm font-normal font-Inter ring-0',
            }" />
            <div>共{{ props.total ?? props.data.length }}条</div>
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

const props = defineProps<{
    columns: TableColumn<any>[],
    data: any[],
    total?: number,
    pagination?: { page: number; pageSize: number }
}>()

// 表格
const table = useTemplateRef('table')
const rowSelection = ref<Record<string, boolean>>({})

// 分页
const pagination = ref(props.pagination ?? { page: 0, pageSize: 10 })
const pageSizeList = ref([
    { label: '10条/页', value: 10 },
    { label: '20条/页', value: 20 },
    { label: '30条/页', value: 30 },
    { label: '50条/页', value: 50 }
])

function onSelect(row: TableRow<any>, e?: Event) {
    row.toggleSelected(!row.getIsSelected())
    console.log(e)
}
</script>

<style scoped></style>