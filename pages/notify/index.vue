<template>
    <main>
        <div class="max-w-[1691px] mx-auto py-[40px] ">
            <div class="flex gap-[20px] h-12">
                <template v-for="(item, index) in tabList">
                    <div v-if="!item.auth || (item.auth && globalStore.loginStatus)" @click="selectTab(index)"
                        :class="['font-medium cursor-pointer', activeTab === index ? 'text-white text-xl font-medium' : 'text-white/50 text-base']">
                        {{ item.label }}
                    </div>
                </template>
            </div>
            <div>
                <!-- <Transition name="fade"> -->
                <div class="">
                    <div class="flex gap-[20px]">
                        <div
                            class="w-[280px] rounded-2xl ring-1 ring-white/20 bg-[rgba(18,18,18,1)] overflow-hidden h-full">
                            <div v-for="(item, idx) in notifyTabs" :key="item.value" :class="[
                                'px-8 py-6 text-white text-base font-medium cursor-pointer transition-all',
                                notifyTab === item.id
                                    ? 'bg-gradient-to-b from-[rgba(74,76,237,0.4)] to-[rgba(74,76,237,0)]'
                                    : ''
                            ]" @click="selectLeftTab(item)">
                                {{ item.label }}
                            </div>
                        </div>
                        <div
                            class="p-[0px_30px] relative flex-1 bg-[linear-gradient(180deg,rgba(26,23,38,1)_0%,rgba(26,23,38,0.3)_100%)] rounded-2xl ring-1 ring-white/20">
                            <div class="flex flex-col w-full min-h-[800px]">
                                <div v-if="list.length > 0" v-for="(item, index) in list" :key="index"
                                    class="flex justify-between items-center p-[40px_0_18px_0] border-b-1 border-white/10">
                                    <div class=" text-base font-medium font-['Inter'] "
                                        :class="[item.status === 1 ? 'text-white/50' : 'text-white]']">
                                        {{ item.title }} <span
                                            class="pl-[5px] text-white/20 text-base font-medium font-['Inter']"></span>
                                    </div>
                                    <div class=" text-sm font-normal font-['Inter']"
                                        :class="[item.status === 1 ? 'text-white/20' : 'text-white/50]']">
                                        {{ formatTime(item.created_at) }}
                                    </div>
                                </div>
                                <div v-else
                                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                                    <NotData />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end gap-4 items-center pt-4">
                        <UPagination :page="page" :items-per-page="pageSize" :total="total ?? list.length"
                            @update:page="p => changePage(p)" :ui="{
                                list: 'border-0 ring-0 text-whitebg-transparent hover:text-white disabled:bg-transparent',
                                item: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                                prev: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                                next: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                                last: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                                first: 'text-white bg-transparent hover:bg-indigo-400 rounded-full hover:text-white ring-0 disabled:bg-transparent',
                                root: ' bg-transparent hover:text-white border-0 ring-0 rounded-full disabled:bg-transparent',
                                label: 'text-white/50 text-sm font-normal font-Inter ring-0 disabled:bg-transparent',
                            }" />
                        <div>共{{ total ?? list.length }}条</div>
                        <!-- <div>
                            <USelect v-model="pagination.pageSize" class="w-[100px]" :items="pageSizeList" :ui="{
                                base: 'bg-[rgba(27,27,28,1)] text-[rgba(255,255,255,0.5)] ring-0',
                                content: 'bg-[rgba(27,27,28,1)] text-[rgba(255,255,255,0.5)] ring-0',
                                label: 'text-[rgba(255,255,255,0.5)]',
                                group: 'text-[rgba(255,255,255,0.5)]',
                                item: 'text-[rgba(255,255,255,0.5)]'
                            }" />
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script setup lang="ts">

import { useGlobalStore } from '#imports'
import { getNoticeList, getMyNoticeList } from '~/composables/apiServices'
import type { NotifyItem } from '~/types/notify'
const globalStore = useGlobalStore()

const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const changePage = async (newPage: number) => {
    page.value = newPage
    activeTab.value ? await getMyNoticeListHandle() : await getNoticeListHandle()
}

const tab1List = ref<NotifyItem[]>([])
const tab2List = ref<NotifyItem[]>([])
const tabList = [{
    label: '公告',
    value: 'bulletin',
    id: 1,
    auth: false,
}, {
    label: '个人通知',
    value: 'notice',
    auth: true,
    id: 2
}]

const list = ref<NotifyItem[]>([])
const getNoticeListHandle = async () => {
    try {
        let params = { page, limit: pageSize, language: globalStore.locale }
        const res = await getNoticeList(params)
        console.log(res)
        tab1List.value = res.data.list || []
        list.value = res.data.list
        total.value = res.data.total || 0
    } catch (err) {
        list.value = []
        total.value = 0
    }
}
await getNoticeListHandle()


const getMyNoticeListHandle = async () => {
    try {
        let params = { userid: globalStore.uid, page, limit: pageSize, language: globalStore.locale }
        const res = await getMyNoticeList(params)
        tab2List.value = res.data.list || []
        list.value = res.data.list
        total.value = res.data.total || 0
        console.log(res)
    } catch (err) {
        list.value = []
        total.value = 0
    }
}
// await getMyNoticeListHandle()


// const list = computed(() => {
//     console.log(tab1List.value, tab2List.value, activeTab.value)
//     if (activeTab.value === 0) {
//         return tab1List.value
//     } else if (activeTab.value === 1) {
//         return tab2List.value
//     }
//     // return activeTab.value === 0 ? [...tab1List.value] : [...tab2List.value]
// })


const activeTab = ref(0)
const selectTab = async (index: number) => {
    activeTab.value = index
    // 这里可以添加切换标签页的逻辑
    notifyTabs.value = index === 0 ? bulletinTabs : noticeTabs // 根据选中的标签页更新通知列表
    notifyTab.value = notifyTabs.value[0].id // 重置通知标签页为第一个

    activeTab.value ? await getMyNoticeListHandle() : await getNoticeListHandle()
}

const bulletinTabs = [
    { label: '最新公告', value: 'latest', id: 1 },
    { label: '活动公告', value: 'activity', id: 2 },
    { label: '平台更新维护', value: 'update', id: 3 },
    { label: '游戏上线公告', value: 'game', id: 4 }
]

const noticeTabs = [
    { label: '最新通知', value: 'latest', id: 6 },
    { label: '充值相关', value: 'activity', id: 7 },
    { label: '游戏相关', value: 'game', id: 8 },
]
const notifyTab = ref(1)
const notifyTabs = ref([...bulletinTabs])


const selectLeftTab = (item: { label: string; value: string; id: number }) => {
    notifyTab.value = item.id
    // 这里可以添加切换左侧标签页的逻辑
    console.log('Selected left tab:', item.label)
    // list.value = (notifyTab.value === 3 || notifyTab.value === 7) ? [] : activeTab.value === 0 ? tab1List.value : tab2List.value// 根据选中的左侧标签页更新列表
}

</script>

<style scoped></style>