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
      <div class="banner ring-1 ring-[rgba(255, 255, 255, 0.1)] rounded-2xl">
        <div class="relative">
          <iframe class="w-full aspect-[70/39] rounded-2xl " :src="iframeSrc" frameborder="0" :key="iframeKey"></iframe>
        </div>
        <div class="flex justify-between p-[30px] box-border">
          <div class="flex items-center gap-[10px]">
            <div class="text-white text-2xl font-medium font-['Inter']">MAHJONG WINS</div>
            <div>
              <NuxtImg @click="toggleDetail" src="/images/nav/arrow-down.svg"
                :class="['w-[20px] h-[16px] transition-transform', showDetail ? 'rotate-180' : '']" />

            </div>
          </div>
          <div class="flex items-center gap-[32px]">
            <div @click="toShare">
              <NuxtImg src="/images/home/share.svg" class="w-[24px] h-[24px]" />
            </div>
            <div @click="toCollect">
              <NuxtImg src="/images/home/like.svg" class="w-[26px] h-[24px]" />
            </div>
            <div @click="toReload">
              <NuxtImg src="/images/home/reload.svg" class="w-[22px] h-[22px]" />
            </div>
            <div @click="toEnlarge">
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
                  <Counter :value="98" suffix="%" class="text-2xl mb-[10px] font-medium text-white" />
                  <div class="text-white/60 text-sm font-normal">RTP(玩家回报率)</div>
                </div>
                <div>
                  <Counter :value="2" suffix="%" class="text-2xl mb-[10px] font-medium text-white" />
                  <div class="text-white/60 text-sm font-normal">庄家优势</div>
                </div>
                <div>
                  <Counter :value="2" suffix="%" class="text-2xl mb-[10px] font-medium text-white" />
                  <div class="text-white/60 text-sm font-normal">奖池爆奖</div>
                </div>
                <div>
                  <Counter :value="2" suffix="%" class="text-2xl mb-[10px] font-medium text-white" />
                  <div class="text-white/60 text-sm font-normal">最高额彩金</div>
                </div>
                <div>
                  <Counter :value="100" :end="1000" prefix="$" class="text-2xl mb-[10px] font-medium text-white" />
                  <div class="text-white/60 text-sm font-normal font-['Inter']">下注范围</div>
                </div>
                <div>
                  <span class="text-2xl font-medium mb-[10px] text-white">3-3</span>
                  <div class="text-white/60 text-sm font-normal font-['Inter']">布局</div>
                </div>
              </div>

              <!-- 玩法说明 -->
              <USeparator type="dashed" class="mb-6 mx-auto w-[100%]" :ui="{ border: 'border-indigo-800/50' }" />
              <div>
                <div class="text-white/50 text-sm font-medium font-['Inter'] mb-4">玩法说明</div>
                <div class="text-white/90 text-xs font-normal font-['Inter'] leading-7">
                  Rapid Gems 777 老虎机以其经典的 3x3 布局和鲜艳的宝石符号，营造出怀旧氛围。这款中等波动的游戏提供 9 种投注方式，最高奖金为 300 倍，适合休闲玩家和高额玩家，投注额从 0.1 到
                  100 不等。百搭符号占据主导地位，有时还会包含倍数来提高赔付。复古主题融合了鲜艳的 777 图标，营造出永恒的氛围，对于喜欢传统老虎机并融入现代元素的玩家来说，它绝对是不二之选。Rapid Gems
                  777 老虎机以其经典的 3x3 布局和鲜艳的宝石符号，营造出怀旧氛围。这款中等波动的游戏提供 9 种投注方式，最高奖金为 300 倍，适合休闲玩家和高额玩家，投注额从 0.1 到 100
                  不等。百搭符号占据主导地位，有时还会包含倍数来提高赔付。复古主题融合了鲜艳的 777 图标，营造出永恒的氛围，对于喜欢传统老虎机并融入现代元素的玩家来说，它绝对是不二之选。
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
        <!-- <UDataTable :data="tableData" :columns="columns" class="w-full" /> -->
        <!-- :pagination-options="{
            getPaginationRowModel: getPaginationRowModel()
          }"
          v-model:pagination="pagination" 
          -->
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
            <div class="text-white text-base font-bold font-['DIN_Alternate'] leading-none mb-[4px]">182,392.05</div>
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
          <div class="flex items-center justify-between w-full" v-for="(item, index) in profitList" :key="index">
            <div class="p-[4px] ring-1 ring-[#7476FF] rounded-[50%] flex items-center justify-center">
              <NuxtImg :src="item.image" class="w-[37px] h-[37px]" />
            </div>
            <div class="flex-1 ml-[10px]">
              <!-- <div class="h-3.5 justify-center text-indigo-600/70 text-xs font-normal font-['Inter']">{{
                formatName(item.name) }}
              </div> -->
              <div class="mt-[6px] self-stretch justify-center text-white text-base font-medium font-['Inter']">{{
                item.value + 'LCX' }}</div>
            </div>
            <div class="max-w-[55px]">
              <div class="text-right justify-center text-indigo-600/50 text-xs font-normal font-['Inter']">{{ item.time
              }}</div>
              <!-- <div class="text-right mt-[6px] justify-center text-white text-sm font-normal font-['Inter']">{{ 'X' +
                item.count
                }}</div> -->
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
import type { TableColumn, TableRow } from '@nuxt/ui'
import { formatName } from '~/utils'
const UCheckbox = resolveComponent('UCheckbox')
// 页面元数据
definePageMeta({
  title: 'Index'
})
// 获取当前语言信息
const { locale, locales } = useI18n()

const games = [
  { name: 'game1', image: '/images/home/games/game1.png', status: true },
  { name: 'game1', image: '/images/home/games/game3.png', status: false },
  { name: 'game1', image: '/images/home/games/game4.png', status: false },
  { name: 'game1', image: '/images/home/games/game4.png', status: false },
  { name: 'game1', image: '/images/home/games/game4.png', status: false },
  { name: 'game1', image: '/images/home/games/game2.png', status: true },
  { name: 'game1', image: '/images/home/games/game4.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game5.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game6.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game7.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game8.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game8.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game8.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game8.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game8.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game8.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game8.png', status: false },
  { name: '0XMSSHJUYI0XMSSHJUYI', image: '/images/home/games/game8.png', status: false },
]

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

const toShare = () => {
  // 处理分享逻辑
  console.log('Share clicked')
}

const toCollect = () => {
  // 处理收藏逻辑
  console.log('Collect clicked')
}

const iframeKey = ref(0)
const iframeSrc = ref('https://getrichweb3.com/?agentId=1&channelId=1&currencyRate=1&from=lucky&gameId=62300&method=userLogin&sign=74ae51e1fc6df89411f3e1ea23bfae76&time=1752197154&token=O4UFDqyqjVx91JztawHxC_VVgE9IixJqWS3fQwIQobZN7_Wx5LCT8oaTDQCkXHigMVRx_Z9_33kT6BF8IM_Ut18x2N_ezmNVp9gntk04n89yhSzGIPVB-ZWi7ZA55sqhbp4XdXHk_TYZZWweD_Dzf8nRw-riYVxBPxQ3gJcXSsM&userName=LV454ZtPmXWElmtpQPNgnA==&userPwd=e170662cc49b76d934ab06dc873780f6')
const toReload = () => {
  // 处理刷新逻辑
  console.log('Reload clicked')
  iframeKey.value += 1 // 通过改变 key 强制重新加载 iframe
}

const toEnlarge = () => {
  // 处理放大逻辑
  console.log('Enlarge clicked')
  toggleEnlarge()
}


const showDetail = ref(true)
const toggleDetail = () => { showDetail.value = !showDetail.value }

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
  console.log('Selected tab:', tabList[index].label)
}

// 设置页面 SEO
useSeoMeta({
  title: 'Home',
  ogTitle: 'Home',
  description: 'Welcome to our multilingual website',
  ogDescription: 'Welcome to our multilingual website'
})

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