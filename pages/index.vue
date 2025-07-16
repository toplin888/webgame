<template>
  <main class="max-w-[1686px] mx-auto my-0 flex gap-[5px] md:gap-[7px] ">
    <div class="flex-1">
      <div class="banner p-[60px_0]">
        <div class="relative">
          <NuxtImg :src="games.length && games[0].img3 ? games[0].img3 : '/images/home/banner.png'" preload
            @click="toGameDetail(games[0])" alt="hero" class="w-full rounded-2xl cursor-pointer" />
          <div class="absolute bottom-6 right-6 w-[32px] h-[32px] cursor-pointer">
            <NuxtImg src="/images/home/enlarge.svg" alt="Enlarge Banner" class="w-full" />
          </div>
          <Transition name="elastic">
            <div v-if="enlargeStatus" @click="toggleEnlarge"
              class="w-dvw h-dvh bg-white/10 fixed top-0 left-0 flex items-center justify-center z-50">
              <NuxtImg class="w-screen h-screen object-contain max-w-[100vw] max-h-[100vh] elastic-img "
                src="/images/home/banner.png" alt="Enlarge Banner" />
            </div>
          </Transition>
        </div>
      </div>

      <!-- 游戏列表 -->
      <div class="pb-[65px]">
        <div class="flex gap-[20px] text-3xl font-medium">
          <NuxtImg src="/images/home/slots.png" class="w-[28px] h-[38px]" />
          <div>slots</div>
        </div>
        <div class="game-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-[40px_35px]">
          <div v-if="games.length">
            <div v-for="(game, idx) in games.slice(1, games.length)" :key="game.id" @click="toGameDetail(game)"
              class="flex flex-col items-center bg-white/5 rounded-xl relative"
              :class="game.status === 1 ? '' : 'opacity-80'">
              <NuxtImg :src="game.img2" alt="game" class="w-full h-full rounded-[10px] object-contain" />
              <div v-show="game.status === 1"
                class="absolute bottom-0 py-[15px] font-['Poppins'] text-xs text-white text-center">{{ game.status === 1
                  ? '' : 'Coming Soon' }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex pl-[52px] box-border w-full h-16 bg-[linear-gradient(180deg,#1A1726_0%,rgba(26,23,38,0.30)_100%)] rounded-2xl border border-white/10 gap-[70px]">
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
            19,390.3234</div>
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
          <!-- 渐变边框 -->
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

      <!-- 最新盈利 -->
      <div
        class="profit mt-[30px] p-[24px_16px] ring-1 ring-white/10 bg-[linear-gradient(180deg,#121212_0%,#121212_100%))] rounded-2xl">
        <div class="w-full flex items-center justify-between text-indigo-200 text-base font-normal font-['Inter']">
          <div class="text-white text-base font-medium font-['Inter']">最新盈利</div>
          <div class="cursor-pointer">
            <NuxtImg src="/images/arrow-right.svg" class="w-4 h-4" />
          </div>
        </div>
        <!-- 盈利列表 -->
        <div class="flex flex-col items-center justify-center gap-6 mt-[20px]">
          <div class="flex items-center justify-between w-full" v-for="(item, index) in profitList" :key="item.id">
            <div class="p-[4px] ring-1 ring-[#7476FF] rounded-[50%] flex items-center justify-center">
              <NuxtImg :src="item.avatar" class="w-[37px] h-[37px] rounded-full" />
            </div>
            <div class="flex-1 ml-[10px]">
              <div class="h-3.5 justify-center text-indigo-600/70 text-xs font-normal font-['Inter']">{{
                item.user_name }}
              </div>
              <div class="mt-[6px] self-stretch justify-center text-white text-base font-medium font-['Inter']">{{
                item.change_gb / 10000 + 'LCX' }}</div>
            </div>
            <div class="max-w-[55px]">
              <div class="text-right justify-center text-indigo-600/50 text-xs font-normal font-['Inter']">{{
                formatTimeToHMS(item.end_date)
              }}</div>
              <div class="text-right mt-[6px] justify-center text-white text-sm font-normal font-['Inter']">{{ 'X' +
                item.total_point
              }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { formatName, formatTimeToHMS } from '~/utils'
import { getGameList, getConfigStatistic, getWinnersList } from '~/composables/apiServices'
// 页面元数据
definePageMeta({
  title: 'Index'
})

// 设置页面 SEO
useSeoMeta({
  title: 'Home',
  ogTitle: 'Home',
  description: 'Welcome to our multilingual website',
  ogDescription: 'Welcome to our multilingual website'
})
// 获取当前语言信息
const { locale, locales } = useI18n()
const localePath = useLocalePath()

let gameParams = {
  limit: 13,
  page: 1,
  status: 0
}
// const gameRes = await getGameList({ ...gameParams })
// const games = ref<Game[]>([])
// games.value = gameRes.data.list || []

// let winnerParams = {
//   limit: 10,
//   page: 1,
//   status: 0
// }

// const winnerRes = await getWinnersList({ ...winnerParams })
// const profitList = ref<ProfitItem[]>([])
// profitList.value = winnerRes.data.list || []
const games = ref([])
const totalLcx = ref({})
const profitList = ref([])


try {
  // const { data: gameRes } = await useAsyncData('games', () => getGameList({ limit: 10, page: 1, status: 0 }))
  // const games = computed(() => gameRes.value?.data?.list ?? [])

  // const { data: winnerRes } = await useAsyncData('winners', () => getWinnersList({ limit: 10, page: 1, status: 0 }))
  // const profitList = computed(() => winnerRes.value?.data?.list ?? [])

  // const { data: lcxRes } = await useAsyncData('lcx', () => getConfigStatistic())
  // const totalLcx = computed(() => formatLcx(lcxRes.value?.data?.total_lcx))

  const gameRes = await getGameList({ limit: 10, page: 1, status: 0 })
  games.value = gameRes?.data?.list ?? []

  const winnerRes = await getWinnersList({ limit: 10, page: 1, status: 0 })
  profitList.value = winnerRes.data?.list ?? []

  const lcxRes = await getConfigStatistic()
  totalLcx.value = formatLcx(lcxRes?.data?.total_lcx)
} catch (err) {
  console.error(err)
}


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

interface Game {
  id: number
  thumbnail: string
  status: number
}

interface ProfitItem {
  address: string
  avatar: string
  id: number
  total_point: number
  user_name: string
  end_date: string
  change_gb: number
}

const toGameDetail = (item: Game): void => {
  navigateTo(localePath('/game/' + item.id))
}

// const totalLcx = ref('0.00')

onMounted(async () => {
  // 获取统计数据
  //   const res1 = await getConfigStatistic()
  //   // 将数据除以10000且千分位加逗号
  //   totalLcx.value = formatLcx(res1?.data?.total_lcx)
  //   console.log('Total LCX:', totalLcx.value)
})

</script>
<style scoped>
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

/* 弹性缩放动画 */
.elastic-img {
  animation: elastic-scale-in 0.5s cubic-bezier(.68, -0.55, .27, 1.55);
}

@keyframes elastic-scale-in {
  0% {
    transform: scale(0.7, 0.7) skew(18deg, 18deg);
    opacity: 0;
  }

  60% {
    transform: scale(1.08, 1.08) skew(-4deg, -4deg);
    opacity: 1;
  }

  80% {
    transform: scale(0.96, 0.96) skew(2deg, 2deg);
  }

  100% {
    transform: scale(1, 1) skew(0, 0);
  }
}
</style>