<template>
  <main class="bg-[url('~/assets/images/banner-mask.png')] bg-center bg-no-repeat">
    <div class="m-container">
      <div
        class="w-full flex flex-col items-center relative shadow-[0px_4px_8px_0px_rgba(255,255,255,0.37) p-[144px_0_111px_0]">
        <div
          class="text-center w-[237px] h-[175px] bg-[url('~/assets/images/banner-light.svg')] bg-no-repeat bg-size-[100%_100%]">
          <span
            class="px-[11px] py-[8px] text-[12px] font-['inter'] font-normal wrap-break-word ring-1 ring-white/10 ring-inset rounded-full">
            {{ $t('home.earnWhilePlaying') }}</span>
        </div>
        <div
          class="relative max-w-[1082px] max-h-[667px] w-full h-full bg-[url('~/assets/images/banner-bg2.svg')] bg-center bg-no-repeat mt-[-78.8px] bg-size-[100%_100%] ">
          <div>
            <NuxtImg class="absolute top-[134px] left-[152px] w-[121px] h-[184px] animate-float"
              src="/images/parachute1.svg" alt="" />
          </div>
          <div>
            <NuxtImg class="absolute top-[87px] right-[95px] w-[123px] h-[180px] animate-float-delay"
              src="/images/parachute2.svg" alt="" />
          </div>
          <div class="flex justify-center">
            <div
              class="relative translate-y-[-50%] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-bold text-[70px]">
              {{ $t('home.airdropSeason') }}
            </div>
          </div>
          <div class="mt-[30px]">
            <div class="flex gap-5 justify-center">
              <div class="flex items-center gap-1">
                <UIcon name="i-custom-safe" class="w-[16px] h-[16px]"></UIcon>{{ $t('home.tonsOfSlotsGames') }}
              </div>
              <div class="flex items-center gap-1">
                <UIcon name="i-custom-safe" class="w-[16px] h-[16px]"></UIcon>{{ $t('home.strengthEndorsement') }}
              </div>
            </div>
            <div class="flex gap-5 justify-center">
              <div class="flex items-center gap-1">
                <UIcon name="i-custom-safe" class="w-[16px] h-[16px]"></UIcon>{{
                  $t('home.multipleRNGFairnessCertification') }}
              </div>
              <div class="flex items-center gap-1">
                <UIcon name="i-custom-safe" class="w-[16px] h-[16px]"></UIcon>{{ $t('home.onChainDataIsAvailable') }}
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-[153px] pb-[338px]">
            <!-- <UButton class="btn-brand w-[138px] h-[42px] text-[14px]">{{ $t('home.goEarnCoins') }}</UButton> -->
            <UButton color="lucky">{{ $t('home.goEarnCoins') }}</UButton>
          </div>
        </div>
        <div>
          <div
            class="m-[0_auto] w-full md:w-[1106px] md:h-[184px] bg-[url('~/assets/images/banner-lattice-bg.svg')] bg-no-repeat bg-size-[100%_100%]">
            <!-- 这里可以添加更多内容或组件 -->
            <div class="cbox flex justify-between items-center h-full">
              <div class="flex flex-col items-center justify-center relative h-[100%] w-[25%] stat-item">
                <div
                  class="text-center text-[47px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500">
                  200+
                </div>
                <div class="text-center text-white/80 text-[14px]">{{ $t('home.numberOfGames') }}</div>
              </div>
              <div class="flex flex-col items-center justify-center relative h-[100%] w-[25%] stat-item">
                <div
                  class="text-center text-[47px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500">
                  10M+
                </div>
                <div class="text-center text-white/80 text-[14px]">{{ $t('home.totalTransactionVolume') }}</div>
              </div>
              <div class="flex flex-col items-center justify-center relative h-[100%] w-[25%] stat-item">
                <div
                  class="text-center text-[47px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500">
                  3.6B
                </div>
                <div class="text-center text-white/80 text-[14px]">{{ $t('home.outputLCX') }}</div>
              </div>
              <div class="flex flex-col items-center justify-center relative h-[100%] w-[25%] stat-item">
                <div
                  class="text-center text-[47px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500">
                  10B
                </div>
                <div class="text-center text-white/80 text-[14px]">{{ $t('home.luckyXMarketCap') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { UIcon } from '#components'

// 多语言支持
const { t } = useI18n()

// 响应式数据
const planData = ref({
  title: 'Plan 1',
  description: '这是 Plan 1 的详细描述',
  features: ['特性1', '特性2', '特性3']
})

// 计算属性
const displayTitle = computed(() => {
  return `${planData.value.title} - ${planData.value.description}`
})

// 方法
const handleLearnMore = () => {
  console.log('了解更多 Plan 1')
  // 这里可以添加跳转逻辑或显示更多信息
}

const handleGetStarted = () => {
  console.log('开始使用 Plan 1')
  // 这里可以添加开始使用的逻辑
}

// 组件挂载后执行
onMounted(() => {
})
</script>

<style scoped>
/* Plan1 组件特定的样式 */
.plan1-container {
  /* 如果需要特殊样式可以在这里添加 */
  display: flex;
  flex-direction: column;
}

.stat-item {}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -1px;
  /* 根据您的间距调整 */
  top: 0;
  /* 从顶部20%开始 */
  height: 100%;
  /* 高度为总高度的60% */
  width: 1px;
  /* 1px宽度的线 */
  background: linear-gradient(to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.3) 30%,
      rgba(255, 255, 255, 0.3) 70%,
      rgba(255, 255, 255, 0));
}

/* 降落伞漂浮动画 */
@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  25% {
    transform: translateY(-8px) rotate(1deg);
  }

  50% {
    transform: translateY(0px) rotate(0deg);
  }

  75% {
    transform: translateY(8px) rotate(-1deg);
  }

  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: 2s;
  /* 第二个降落伞延迟动画，增加错落感 */
}

@keyframes float-complex {
  0% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }

  25% {
    transform: translateY(-10px) translateX(5px) rotate(2deg);
  }

  50% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }

  75% {
    transform: translateY(10px) translateX(-5px) rotate(-2deg);
  }

  100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
}

/* 为左边的降落伞使用复杂动画 */
.animate-float-left {
  animation: float-complex 8s ease-in-out infinite;
}

/* 为右边的降落伞使用不同参数 */
.animate-float-right {
  animation: float 7s ease-in-out infinite;
  animation-delay: 1.5s;
}
</style>
