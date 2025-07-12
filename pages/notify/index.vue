<template>
    <main>
        <div class="max-w-[1691px] mx-auto py-[40px] ">
            <div class="flex gap-[20px] h-12">
                <div v-for="(item, index) in tabList" @click="selectTab(index)"
                    :class="['font-medium cursor-pointer', activeTab === index ? 'text-white text-xl font-medium' : 'text-white/50 text-base']">
                    {{ item.label }}</div>
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
                                            class="pl-[5px] text-white/20 text-base font-medium font-['Inter']">{{
                                                item.status ==
                                                    1 ? '已读' : '' }}</span>
                                    </div>
                                    <div class=" text-sm font-normal font-['Inter']"
                                        :class="[item.status === 1 ? 'text-white/20' : 'text-white/50]']">
                                        {{ item.time }}
                                    </div>
                                </div>
                                <div v-else
                                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                                    <div
                                        class="relative flex flex-col items-center justify-center w-[210px] h-[105px] ">
                                        <NuxtImg src="/images/notDatabg.png"
                                            class="w-[210px] h-[105px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        <NuxtImg src="/images/notData.png"
                                            class="w-[96px] h-[84px] absolute -bottom-7 left-1/2 transform -translate-x-1/2 " />
                                        <div class="absolute -bottom-20 left-1/2 transform -translate-x-1/2">暂无通知</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- </Transition> -->

                <!-- <Transition name="fade">

                    <div v-if="activeTab === 1">

                    </div>
                </Transition> -->
            </div>
        </div>

    </main>
</template>

<script setup lang="ts">

const tabList = [{
    label: '公告',
    value: 'bulletin',
    id: 1
}, {
    label: '个人通知',
    value: 'notice',
    id: 2
}]

const activeTab = ref(0)
const selectTab = (index: number) => {
    activeTab.value = index
    // 这里可以添加切换标签页的逻辑
    console.log('Selected tab:', tabList[index].label)
    notifyTabs.value = index === 0 ? bulletinTabs : noticeTabs // 根据选中的标签页更新通知列表
    notifyTab.value = notifyTabs.value[0].id // 重置通知标签页为第一个
    list.value = index === 0 ? [...tab1List] : [...tab2List] // 根据选中的标签页更新列表
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

const tab1List = [
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '关于平台更新维护的公告',
        time: '2021/10/12 18:11:15',
        status: 1
    }]
const tab2List = [
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: ''
    },
    {
        title: '你充值的10000 USDT 已经到账！请及时查收',
        time: '2021/10/12 18:11:15',
        status: 1
    }]
const list = ref([...tab1List])

const selectLeftTab = (item: { label: string; value: string; id: number }) => {
    notifyTab.value = item.id
    // 这里可以添加切换左侧标签页的逻辑
    console.log('Selected left tab:', item.label)
    list.value = (notifyTab.value === 3 || notifyTab.value === 7) ? [] : activeTab.value === 0 ? tab1List : tab2List// 根据选中的左侧标签页更新列表
}

</script>

<style scoped></style>