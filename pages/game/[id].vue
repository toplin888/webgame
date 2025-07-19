<template>
  <main class="max-w-[1686px] mx-auto my-0 flex gap-[5px] md:gap-[7px] ">
    <!-- 全屏放大iframe -->
    <transition name="elastic">
      <div v-if="enlargeStatus" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        @click.self="toggleEnlarge">
        <iframe :src="iframeSrc" :key="iframeKey"
          class="w-screen h-screen max-w-[100vw] max-h-[100vh] rounded-2xl bg-black" frameborder="0"></iframe>
        <button class="absolute top-6 right-8 z-60 text-white text-2xl bg-black/60 rounded-full px-4 py-2"
          @click="toggleEnlarge">×</button>
      </div>
    </transition>
    <div class="flex-1 p-[60px_0]">
      <div class="banner ring-1 ring-[rgba(255,255,255,0.1)]  rounded-2xl">
        <div class="relative max-w-[1400px] aspect-[70/39]">
          <iframe v-if="gameIframeData?.game_url" class="w-full max-w-[1400px] aspect-[70/39] rounded-2xl"
            :src="gameIframeData?.game_url" frameborder="0" :key="iframeKey"></iframe>
          <div v-else class="w-full flex justify-center items-center h-full">
            <ErrorData :msg="`加载错误200002，请联系管理员`" />
          </div>
        </div>
        <div class="flex justify-between p-[30px] box-border">
          <div class="flex items-center gap-[10px]">
            <div class="text-white text-2xl font-medium font-['Inter']">{{ gameData?.game_translation?.name || '--' }}
            </div>
            <div>
              <NuxtImg @click="toggleDetail" src="/images/nav/arrow-down.svg" v-if="gameData?.game_translation?.name"
                :class="['w-[20px] h-[16px] transition-transform', showDetail ? 'rotate-180' : '']" />

            </div>
          </div>
          <div class="flex items-center gap-[32px]">
            <div @click="toShare" class="cursor-pointer">
              <NuxtImg src="/images/home/share.svg" class="w-[24px] h-[24px]" />
            </div>
            <div @click="toCollect" class="cursor-pointer">
              <NuxtImg v-show="isFavorite" src="/images/home/isfavorite.svg" class="w-[26px] h-[24px]" />
              <NuxtImg v-show="!isFavorite" src="/images/home/like.svg" class="w-[26px] h-[24px]" />

            </div>
            <div @click="toReload" class="cursor-pointer">
              <NuxtImg src="/images/home/reload.svg" class="w-[22px] h-[22px]" />
            </div>
            <div @click="toEnlarge" class="cursor-pointer">
              <NuxtImg src="/images/home/large.svg" class="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
        <div>
          <transition name="fade-slide">
            <div v-if="showDetail" class="p-[0_28px_30px_26px]">
              <!-- 特点 -->
              <!-- <div class="w-[90%] h-0 border-1 border-indigo-800/50 border-dashed"></div> -->

              <USeparator type="dashed" class="mb-6 mx-auto w-[100%]" :ui="{ border: 'border-indigo-800/50' }" />
              <div class="flex flex-wrap gap-8 items-center text-indigo-300 text-base font-medium mb-6">
                <div class="flex items-center justify-center h-full text-base text-[#9A9BFF] font-medium gap-[8px]">
                  <NuxtImg src="/images/home/rewards.svg" class="w-[25px] h-[25px]" />
                  <span class="">Rewards available</span>
                </div>
                <div class="flex items-center justify-center h-full text-base text-[#9A9BFF] font-medium gap-[8px]">
                  <NuxtImg src="/images/home/verification.svg" class="w-[18px] h-[18px]" />
                  <span class="">fair verification</span>
                </div>
                <div class="flex items-center justify-center h-full text-base text-[#9A9BFF] font-medium gap-[8px]">
                  <NuxtImg src="/images/home/gameCode.svg" class="w-[21px] h-[21px]" />
                  <span class="">Game source code</span>
                </div>
              </div>
              <!-- 相关数值 -->
              <USeparator type="dashed" class="mb-6 mx-auto w-[100%]" :ui="{ border: 'border-indigo-800/50' }" />
              <div class="text-white/50 mb-[16px] text-sm font-medium font-['Inter']">
                相关数值
              </div>
              <div class="grid grid-cols-2 md:grid-cols-6 gap-6 text-center mb-6">
                <div>
                  <div class="flex items-center justify-center">
                    <!-- <Counter :value="gameData.value1" suffix="%" class="text-2xl mb-[10px] font-medium text-white" /> -->
                    <span class="text-2xl mb-[10px] font-medium text-white">{{ gameData?.game?.value1 }}</span>
                  </div>
                  <div class="text-white/60 text-sm font-normal">RTP(玩家回报率)</div>
                </div>
                <div>
                  <!-- <Counter :value="2" suffix="%" class="text-2xl mb-[10px] font-medium text-white" /> -->
                  <span class="text-2xl mb-[10px] font-medium text-white">{{ gameData?.game?.value2 }}</span>
                  <div class="text-white/60 text-sm font-normal">庄家优势</div>
                </div>
                <div>
                  <!-- <Counter :value="2" suffix="%" class="text-2xl mb-[10px] font-medium text-white" /> -->
                  <span class="text-2xl mb-[10px] font-medium text-white">{{ gameData?.game?.value3 }}</span>
                  <div class="text-white/60 text-sm font-normal">奖池爆奖</div>
                </div>
                <div>
                  <!-- <Counter :value="2" suffix="%" class="text-2xl mb-[10px] font-medium text-white" /> -->
                  <span class="text-2xl mb-[10px] font-medium text-white">{{ gameData?.game?.value4 }}</span>
                  <div class="text-white/60 text-sm font-normal">最高额彩金</div>
                </div>
                <div>
                  <!-- <Counter :value="100" :end="1000" class=" text-2xl mb-[10px] font-medium text-white" /> -->

                  <span class="text-2xl mb-[10px] font-medium text-white">{{ gameData?.game?.value5 }}</span>
                  <div class="text-white/60 text-sm font-normal font-['Inter']">下注范围</div>
                </div>
                <div>
                  <!-- <span class="text-2xl font-medium mb-[10px] text-white">3-3</span> -->
                  <span class="text-2xl mb-[10px] font-medium text-white">{{ gameData?.game?.value6 }}</span>
                  <div class="text-white/60 text-sm font-normal font-['Inter']">布局</div>
                </div>
              </div>

              <!-- 玩法说明 -->
              <USeparator type="dashed" class="mb-6 mx-auto w-[100%]" :ui="{ border: 'border-indigo-800/50' }" />
              <div>
                <div class="text-white/50 text-sm font-medium font-['Inter'] mb-4">玩法说明</div>
                <div class="text-white/90 text-xs font-normal font-['Inter'] leading-7">
                  {{ gameData?.game_translation?.description || '暂无玩法说明' }}
                </div>
              </div>
            </div>
          </transition>
        </div>

      </div>

      <!-- 表格 -->
      <div
        class="mt-[18px] ring-1 ring-white/10 p-6 bg-[linear-gradient(180deg,#1A1726_0%,rgba(26,23,38,0.30)_100%)] rounded-[20px]">
        <div class="flex gap-[20px] mb-[50px]">
          <div v-for="(item, index) in tabList" @click="selectTab(index)"
            :class="[' text-xl font-medium cursor-pointer', activeTab === index ? 'text-white text-xl font-medium' : 'text-white/50']">
            {{ item.label }}</div>
        </div>
        <div class="flex justify-end">
          <UButton color="lucky" class="mr-2" @click="showMultipleHandle">批量选择</UButton>
          <UButton color="lucky" class="" @click="confirmMultipleHandle">批量上链</UButton>
        </div>
        <!-- <UDataTable :data="tableData" :columns="columns" class="w-full" /> -->
        <!-- :pagination-options="{
            getPaginationRowModel: getPaginationRowModel()
          }"
          v-model:pagination="pagination" 
          -->
        <!-- <UTable ref="table" v-model:row-selection="rowSelection" :data="tableData" :columns="columns" :ui="{
          tbody: 'divide-none space-y-[20px] ',
          th: 'text-[rgba(255,255,255,0.50)] text-sm font-normal font-Inter bg-transparent text-center',
          tr: ' mb-[10px] rounded-[20px] overflow-hidden text-center',
          td: 'text-white/90 text-sm font-normal font-Inter',
          thead: 'text-indigo-200 text-sm font-normal font-Inter',
          separator: 'bg-transparent',
        }" @select="onSelect" />
        <div class="flex justify-end gap-4 items-center pt-4"> -->
        <!-- <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" /> -->
        <!-- <UPagination v-model:page="pagination.page" :total="total" :ui="{
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
        </div> -->

        <!-- <PaginatedTable ref="tableRef" :columnVisibility="columnVisibility" :columns="columns" :data="gameHistory"
          @update:page="onPageChange" @update:pageSize="onPageSizeChange" :pagination="{ page: 1, pageSize: 1 }"
          :total="" class="w-full" /> -->
        <PaginatedTable ref="tableRef" :columnVisibility="columnVisibility" :data="tableData" :columns="columns"
          :page="pagination.page" :pageSize="pagination.pageSize" :total="total" @update:page="onPageChange"
          @update:pageSize="onPageSizeChange" class="w-full" />

      </div>
      <div
        class="flex mt-[18px] pl-[52px] box-border w-full h-16 bg-[linear-gradient(180deg,#1A1726_0%,rgba(26,23,38,0.30)_100%)] rounded-2xl border border-white/10 gap-[70px]">
        <div class="flex items-center justify-center h-full text-base text-[#9A9BFF] font-medium gap-[8px]">
          <NuxtImg src="/images/home/rewards.svg" class="w-[25px] h-[25px]" />
          <span class="">Rewards available</span>
        </div>
        <div class="flex items-center justify-center h-full text-base text-[#9A9BFF] font-medium gap-[8px]">
          <NuxtImg src="/images/home/verification.svg" class="w-[18px] h-[18px]" />
          <span class="">fair verification</span>
        </div>
        <div class="flex items-center justify-center h-full text-base text-[#9A9BFF] font-medium gap-[8px]">
          <NuxtImg src="/images/home/gameCode.svg" class="w-[21px] h-[21px]" />
          <span class="">Game source code</span>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <div class="w-[280px] py-[60px_0]">
      <!-- 钱包信息 -->
      <div class="wallet-card bg-[linear-gradient(180deg,#160E2D_0%,#191022_100%)] rounded-2xl p-[24px_16px]">
        <div class="self-stretch justify-start text-indigo-200 text-base font-normal font-['Inter']">
          平台资金估值
        </div>
        <div class="flex items-center mt-[12px] p-[12px_10px] border-white/10 border-2 rounded-[10px] bg-white/4">
          <div class="">
            <NuxtImg src="/images/money.svg" alt="usdt" class="w-[20px] h-[20px]" />
          </div>
          <div class="ml-[10px] flex-1 text-white text-base font-bold font-['DIN_Alternate'] leading-none">
            19,390.323</div>
          <div class="text-sm text-indigo-400 font-normal cursor-pointer">验证</div>
        </div>
        <div class="mt-[17px] self-stretch justify-start text-indigo-200 text-base font-normal font-['Inter']">
          全网LCX数量
        </div>
        <div
          class="flex items-center mt-[12px] p-[14px_10px] relative rounded-[10px] bg-[to_right,#471A8D_0%,#4B4CEE_100%] cursor-pointer">
          <div>
            <NuxtImg src="/images/lcx.png" alt="lcx" class="w-[36px] h-[36px]" />
          </div>
          <div class="ml-[10px] flex-1">
            <div class="text-white text-base font-bold font-['DIN_Alternate'] leading-none mb-[4px]">{{ totalLcx }}
            </div>
            <div class="text-indigo-200/50 text-xs font-normal font-['Inter']">持有LCX可获得大量空投</div>
          </div>
          <div>
            <NuxtImg src="/images/arrow-right.svg" alt="lcx" class="w-[16px] h-[16px]" />
          </div>
          <span class="absolute inset-0 rounded-[10px]" style="
            padding:2px;
            background:linear-gradient(90deg,#471A8D 0%,#4B4CEE 100%);
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box, 
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            box-sizing: border-box;
            z-index:20;
            display:block;
            "></span>
        </div>
      </div>

      <!-- 额外LCX奖励 -->
      <div
        class="profit mt-[30px] p-[24px_16px] ring-1 ring-white/10 bg-[linear-gradient(180deg,#121212_0%,#121212_100%))] rounded-2xl">
        <div class="w-full flex items-center justify-between text-indigo-200 text-base font-normal font-['Inter']">
          <div class="text-white text-base font-medium font-['Inter']">额外LCX奖励</div>
          <div class="cursor-pointer">
            <NuxtImg src="/images/arrow-right.svg" class="w-4 h-4" />
          </div>
        </div>
        <!-- 盈利列表 -->
        <div class="flex flex-col items-center justify-center gap-6 mt-[20px]">
          <template v-if="otherRewardsData.length">

            <div class="flex items-center justify-between w-full" v-for="(item, index) in otherRewardsData"
              :key="index">
              <div class="p-[4px] ring-1 ring-[#7476FF] rounded-[50%] flex items-center justify-center">
                <NuxtImg :src="item?.image" class="w-[37px] h-[37px]" />
              </div>
              <div class="flex-1 ml-[10px]">
                <!-- <div class="h-3.5 justify-center text-indigo-600/70 text-xs font-normal font-['Inter']">{{
                  formatName(item.name) }}
                </div> -->
                <div class="mt-[6px] self-stretch justify-center text-white text-base font-medium font-['Inter']">{{
                  item?.value + 'LCX' }}</div>
              </div>
              <div class="max-w-[55px]">
                <div class="text-right justify-center text-indigo-600/50 text-xs font-normal font-['Inter']">{{
                  item?.time
                }}</div>
                <!-- <div class="text-right mt-[6px] justify-center text-white text-sm font-normal font-['Inter']">{{ 'X' +
                  item.count
                  }}</div> -->
              </div>
            </div>|
          </template>
          <template v-else>
            <div class="text-white/50 text-sm font-normal font-['Inter']">
              <NotData />
            </div>
          </template>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Game Detail',
  middleware: ['auth-client']
})

// 设置页面 SEO
useSeoMeta({
  title: 'Home',
  ogTitle: 'Home',
  description: 'Welcome to our multilingual website',
  ogDescription: 'Welcome to our multilingual website'
})
import { NuxtImg } from '#components'
import type { TableColumn, TableRow } from '@nuxt/ui'
import { getGameDetail, getGameLogin, getOtherRewards, getGameHistory, getConfigStatistic, favoriteGame } from '~/composables/apiServices'
import type { GameData, TableRowType } from '~/types/game'
import { formatTimeToHMS } from '~/utils'
import { useSignByParamsClient } from '~/utils/cryptoSign'

const UCheckbox = resolveComponent('UCheckbox')
// 页面元数据
// 获取当前语言信息
const { locale, locales } = useI18n()
const route = useRoute()
const gameid = Number(route.params.id)

// 获取全局 store
const globalStore = useGlobalStore()
// const { data: gameRes } = await useAsyncData('games', () => getGameDetail({ gameid, language: globalStore.locale }))
// const gameData = computed(() => gameRes.value?.data ?? {})

const gameData = ref<GameData>({
  game: {},
  game_translation: {}
})
const gameIframeData = ref<{ game_url?: string }>({})
const isFavorite = ref(false)
try {
  const gameRes = await getGameDetail({ gameid, language: globalStore.locale })
  gameData.value = gameRes.data ?? {}
  isFavorite.value = gameRes.data?.game?.is_favorite || false

  const gameIframeRes = await getGameLogin({ gameid: gameData.value?.game?.game_id, userid: globalStore.uid })
  gameIframeData.value = gameIframeRes.data ?? {}
} catch (error) {
  console.error('Error fetching game login data:', error)
}

const otherRewardsData = ref([])
// 获取其他奖励数据
try {
  const otherRewardsRes = await getOtherRewards({ limit: 20, page: 1, userid: globalStore.uid })
  otherRewardsData.value = otherRewardsRes.data.list ?? []
} catch (error) {
  console.error('Error fetching game login data:', error)
}


const totalLcx = ref('0.00')

const getLCXBalance = async () => {
  try {
    const lcxRes = await getConfigStatistic()
    totalLcx.value = formatLcx(lcxRes?.data?.total_lcx)
  } catch (err) {
    console.error(err)
  }
}

await getLCXBalance()


// try {

//   console.log('gameIframeRes', gameIframeRes)
//   console.log('gameIframeData', gameIframeData.value)
// } catch (error) {
//   console.error('Error fetching game login data:', error)
// }


const profitList = [
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/1.png', profit: '1000 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/2.png', profit: '800 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/3.png', profit: '600 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/4.png', profit: '400 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/4.png', profit: '400 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/4.png', profit: '400 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/4.png', profit: '400 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/4.png', profit: '400 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/4.png', profit: '400 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/4.png', profit: '400 LCX' },
  { value: 58.25, count: 5, time: '11:32:11', name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/profit/4.png', profit: '400 LCX' },
]

const enlargeStatus = ref(false)
// 满屏放大图片
const toggleEnlarge = () => {
  enlargeStatus.value = !enlargeStatus.value
}


const currentLocale = computed(() => {
  const current = locales.value.find((l: any) => l.code === locale.value)
  return current?.name || locale.value
})

const availableLocales = computed(() => {
  return locales.value.map((l: any) => l.name)
})

const showMultiple = ref(false)
const showMultipleHandle = () => {
  // showMultiple.value = !showMultiple.value
  tableRef.value?.table?.tableApi?.getColumn('select')?.toggleVisibility(!showMultiple.value)
  showMultiple.value = !showMultiple.value
}

const confirmMultipleHandle = () => {
  // 确认批量操作
  // showMultiple.value = false
}

const toShare = () => {
  // 处理分享逻辑
}

const toCollect = () => {
  // 处理收藏逻辑
  toggleFavoriteGame()
}

const iframeKey = ref(0)
const iframeSrc = ref('https://getrichweb3.com/?agentId=1&channelId=1&currencyRate=1&from=lucky&gameId=62300&method=userLogin&sign=74ae51e1fc6df89411f3e1ea23bfae76&time=1752197154&token=O4UFDqyqjVx91JztawHxC_VVgE9IixJqWS3fQwIQobZN7_Wx5LCT8oaTDQCkXHigMVRx_Z9_33kT6BF8IM_Ut18x2N_ezmNVp9gntk04n89yhSzGIPVB-ZWi7ZA55sqhbp4XdXHk_TYZZWweD_Dzf8nRw-riYVxBPxQ3gJcXSsM&userName=LV454ZtPmXWElmtpQPNgnA==&userPwd=e170662cc49b76d934ab06dc873780f6')
const toReload = () => {
  // 处理刷新逻辑
  iframeKey.value += 1 // 通过改变 key 强制重新加载 iframe
}

const toEnlarge = () => {
  // 处理放大逻辑
  toggleEnlarge()
}

//  table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)

const showDetail = ref(false)
const toggleDetail = () => { showDetail.value = !showDetail.value }

// 表格
const tableRef = useTemplateRef('tableRef')

const selected = ref<number[]>([])
// 模拟数据
// const total = 10
// const tableData: TableRowType[] = Array.from({ length: total }, (_, i) => ({
//   id: `B1008${100 + i}`,
//   name: '幸运777',
//   amount: 100000000,
//   multiplier: `${[5, 3, 1][i % 3]}`,
//   icon: '/images/lcx.png',
//   reward: '100,000.00 LCX',
//   extra: '100,000.00 LCX',
//   start: '2021/10/12 18:11:15',
//   end: '2021/10/12 18:11:15',
//   hash: i % 2 ? '0215...SDZ' : '待生成',
//   op: '验证',
//   status: i % 2
// }))

const columnVisibility = ref({
  select: showMultiple.value // 初始化时隐藏 age 列
})

const columns: TableColumn<TableRowType>[] = ref([
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
    id: 'id',
    accessorKey: 'id',
    header: 'Play ID'
  },
  {
    id: 'game_name',
    accessorKey: 'game_name',
    header: 'Name'
  },
  {
    accessorKey: 'valid_bet',
    header: 'Amount',
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
        h('span', { class: 'text-white text-sm font-font-bold' }, (typeof value === 'string' || typeof value === 'number' ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '') + ' LCX')
      ])
    }
  },
  {
    accessorKey: 'total_point',
    header: 'Multiplier',
    cell: ({ row }) => {
      const value = row.getValue('total_point')
      return h('span', { class: 'bg-indigo-400 rounded-3xl text-white text-sm text-white/90 text-sm font-normal font-Inter capitalize leading-[10px] p-[7px_10px]' }, 'x' + value)
    }
  },
  {
    accessorKey: 'change_gb',
    header: 'Reward',
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
    accessorKey: 'added_bonus',
    header: '额外',
    cell: ({ row }) => {
      const value = row.getValue('added_bonus')
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
    accessorKey: 'self_rebate',
    header: '反水',
    cell: ({ row }) => {
      const value = row.getValue('self_rebate')
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
    accessorKey: 'game_time',
    header: 'Start',
    cell: ({ row }) => {
      return row.getValue('game_time') ? formatTimeToHMS(row.getValue('game_time') || '--') : '--'
    }
  },
  {
    accessorKey: 'end_date',
    header: 'End',
    cell: ({ row }) => {
      return formatTimeToHMS(row.getValue('end_date'))
    }
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
        }
      }, '验证')
    }
  }
])

const rowSelection = ref<Record<string, boolean>>({})

function onSelect(row: TableRow<TableRowType>, e?: Event) {
  /* If you decide to also select the column you can do this  */
  row.toggleSelected(!row.getIsSelected())

}

interface PaginatedTableProps<T> {
  columns: TableColumn<T>[]
  fetcher?: (pageIndex: number, pageSize: number) => Promise<{ rows: T[]; total: number }>
  initialData?: T[]
  pageSize?: number
}

// const pagination = ref({ page: 0, pageSize: 10 })
// const pageSize2 = ref(10)
// 是否请求
// const serveMode = ref(false)
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
const pageSizeList2 = ref([
  10, 20, 30, 50
])

const tabList = [{
  label: '游戏记录',
  value: 'game',
  id: 1
}, {
  label: '上链记录',
  value: 'link',
  id: 2
}]

const activeTab = ref(0)
const selectTab = (index: number) => {
  activeTab.value = index
  // 这里可以添加切换标签页的逻辑
}

const createSSE = () => {
  try {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    const { sign, timestamp } = useSignByParamsClient({
      userid: globalStore.uid,
    })
    const params = new URLSearchParams({
      userid: String(globalStore.uid),
      sign: String(sign),
      timestamp: String(timestamp)
    }).toString()
    const source = new EventSource(`${apiBase}/sse?${params}`);

    // 监听消息事件
    source.onmessage = function (event) {
      const data = JSON.parse(event.data)
      // 第一次连接成功会有一条信息返回type，message
      if (!data?.type) {
        tableData.value.pop()
        const newRow = data
        tableData.value.unshift(newRow)
        total.value += 1 // 更新总数
        // getLCXBalance()
      }
    };

    // 监听连接打开
    source.onopen = function () {
    };

    // 监听错误
    source.onerror = function (error) {
    };
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  // 访问子组件暴露的 table
  createSSE()
  // 也可以调用子组件暴露的方法
  // tableRef.value?.someMethod()
})

// 表格
const pagination = ref({ page: 1, pageSize: 1 })
const total = ref(0)
const tableData = ref<TableRowType[]>([])
const fetchTableData = async () => {
  try {
    const res = await getGameHistory({
      page: pagination.value.page,
      limit: pagination.value.pageSize,
      userid: globalStore.uid
    })
    tableData.value = res.data.list ?? []
    total.value = res.data.total ?? 0
  } catch (err) {
    tableData.value = []
    total.value = 0
  }
}
await fetchTableData()
// watch(pagination, fetchTableData, { immediate: true, deep: true })

// const gameHistory = ref([])
// // 获取其他奖励数据
// try {
//   const gameHistoryRes = await getGameHistory({ limit: 20, page: 1, userid: globalStore.uid })
//   gameHistory.value = gameHistoryRes.data.list ?? []
//   console.log('otherRewardsRes', gameHistoryRes.value)
// } catch (error) {
//   console.error('Error fetching game login data:', error)
// }

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

const toggleFavoriteGame = () => {
  favoriteGame({ gameid: gameData?.value?.game?.game_id, userid: globalStore.uid })
    .then((res) => {
      isFavorite.value = !isFavorite.value // 切换收藏状态
    })
    .catch((error) => {
      console.error('Error favoriting game:', error)
    })
}


</script>
<style scoped>
/* // 透明 */
.custom-thead {
  &.bg-\(--ui-border-accented\) {
    background-color: transparent;
  }
}

/* 添加一些动画效果 */
.cursor-pointer:hover {
  filter: brightness(1.1);
}

.elastic-enter-active,
.elastic-leave-active {
  transition: opacity 0.3s;
}

.elastic-enter-from,
.elastic-leave-to {
  opacity: 0;
}

.elastic-enter-to,
.elastic-leave-from {
  opacity: 1;
}

/* 展开内容区域 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(.4, 0, .2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>