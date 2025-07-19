<template>
    <div>
        <UTable class="w-full" ref="table" v-model:row-selection="rowSelection" :data="props.data"
            v-model:column-visibility="localColumnVisibility" :columns="props.columns" :ui="{
                tbody: 'divide-none space-y-[20px] ',
                th: 'text-[rgba(255,255,255,0.50)] text-sm font-normal font-Inter bg-transparent text-center',
                tr: ' mb-[10px] rounded-[20px] overflow-hidden text-center',
                td: 'text-white/90 text-sm font-normal font-Inter',
                thead: 'text-indigo-200 text-sm font-normal font-Inter',
                separator: 'bg-transparent',
            }" @select="onSelect" />
        <div class="flex justify-end gap-4 items-center pt-4">
            <UPagination :page="props.page" :items-per-page="props.pageSize" :total="props.total ?? props.data.length"
                @update:page="p => emit('update:page', p)" :ui="{
                    list: 'border-0 ring-0 text-whitebg-transparent hover:text-white disabled:bg-transparent',
                    item: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                    prev: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                    next: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                    last: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                    first: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                    root: ' bg-transparent hover:text-white border-0 ring-0 rounded-full disabled:bg-transparent',
                    label: 'text-white/50 text-sm font-normal font-Inter ring-0 disabled:bg-transparent',
                }" />
            <div>共{{ props.total ?? props.data.length }}条</div>
            <div>
                <USelect v-model="pagination.pageSize" class="w-[100px]" :items="pageSizeList"
                    @update:modelValue="val => emit('update:pageSize', val)" :ui="{
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
//  table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
const props = defineProps<{
    columns: TableColumn<any>[],
    data: any[],
    page: number
    pageSize: number
    total: number
    columnVisibility: {}
}>()

const table = useTemplateRef('table')

const localColumnVisibility = ref<Record<string, boolean>>(props.columnVisibility ?? {})

const emit = defineEmits(['update:page', 'update:pageSize'])
// const columns = ref([...props.columns])
// watch(
//     () => props.columns,
//     (newVal) => {
//         columns.value = [...newVal]
//         console.log('columns:', columns.value)
//     },
//     { deep: true, immediate: true }
// )
// // const newColumns = computed(() => props.columns)
// watch(props, (newProps) => {
//     console.log(newProps.columns, newProps.data, newProps.total)
//     if (newProps.columns) {
//         // props.columns = newProps.columns
//         // pagination.value = newProps.pagination
//     }
// }, { immediate: true })
const showMultipleHandle = () => {
    // showMultiple.value = !showMultiple.value
    console.log('tableRef2:', table.value?.tableApi?.getColumn('select')?.getIsVisible())

    table.value?.tableApi?.getColumn('select')?.toggleVisibility(false)
    console.log('tableRef2:', table.value?.tableApi?.getColumn('select')?.getIsVisible())


}

// 表格
const rowSelection = ref<Record<string, boolean>>({})

// 分页
const pagination = ref({ page: props.page, pageSize: props.pageSize })
const pageSizeList = ref([
    { label: '10条/页', value: 10 },
    { label: '20条/页', value: 20 },
    { label: '50条/页', value: 50 },
    { label: '100条/页', value: 100 }
])

function onSelect(row: TableRow<any>, e?: Event) {
    row.toggleSelected(!row.getIsSelected())
}

defineExpose({
    table
})
</script>

<style scoped></style>