<!-- components/Navbar.vue -->
<template>
  <nav class="bg-black shadow-md flex justify-between items-center m-[0_auto] max-w-[1686px]">
    <!-- <UButton @click="openToast">弹窗</UButton> -->
    <div class="flex items-center gap-[27px]">
      <!-- Logo -->
      <div>
        <NuxtImg class="w-[80px] h-[22px] sm:w-[90px] sm:h-[25px] md:w-[107px] md:h-[29px]" src="/images/logo.svg" />
      </div>

      <!-- PC端导航菜单 (中等屏幕及以上显示) -->
      <ul class="hidden md:flex items-center rounded-[50px] pl-[10px] h-[72px] pr-[10px] text-white">
        <li v-for="(item, index) in menuItems" :key="item.to" :class="[
          'nav-menu-item flex items-center justify-center px-5 py-3.5 w-[160px] box-border h-full',
          route.path === localePath(item.to) ? 'active' : ''
        ]">
          <NuxtLink :to="localePath(item.to)" class="nav-link text-lg" :data-text="item.label" active-class="active">{{
            item.label }}</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="flex items-center space-x-4">
      <!-- 移动端汉堡按钮 (中等屏幕以下显示) -->
      <button class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <div class="flex items-center gap-6">
        <div v-if="globalStore.loginStatus" class="flex">
          <div
            class="flex items-center ring-1 ring-white/10 rounded-[69px] bg-[linear-gradient(180deg,#FFFFFF14_0%,rgba(255, 255, 255, 0.08)_100%)] relative">

            <!-- bg-gradient-to-l from-neutral-900/25 to-gray-900/90 border-[0.50px] border-边框 -->
            <div class="flex items-center gap-[10px] p-[10px_0_10px_20px]">
              <UDropdownMenu :items="currencyList" :externalIcon="false"
                :ui="{ item: '', content: 'w-48 bg-[rgba(43,43,54,1)] ring-0 ', itemLabel: 'text-white text-base font-normal' }">
                <div class="">
                  <NuxtImg src="/images/nav/arrow-down.svg" alt="More dropdown"
                    class="w-[16px] h-[15px] rounded-full" />
                </div>
                <div>
                  <NuxtImg :src="currentCurrency.icon" class="w-[26px] h-[26px]" />
                </div>
                <template #item="{ item }">
                  <div
                    :class="['flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[rgba(249, 251, 252, 0.1)] rounded-lg', currentCurrency.id === item.id ? 'bg-[rgba(249, 251, 252, 0.1)]' : '']"
                    @click=" !item.disabled && (currentCurrency = item)">
                    <NuxtImg :src="item.icon" class="w-6 h-6" />
                    <span class="text-white text-base font-normal font-['Inter']">{{ item.val }}</span>
                    <span class="text-white/50 text-sm font-normal font-['Inter']">{{ item.val2 }}</span>
                  </div>
                </template>
              </UDropdownMenu>
              <div class="flex items-center cursor-pointer" @click="toBelongings">
                <div class="text-white text-base font-normal font-['Inter']">
                  1.01
                </div>
                <div class="text-white/50 text-sm font-normal font-['Inter']">
                  ≈152.22
                </div>
              </div>
            </div>


            <div class="p-[20px] ml-[20px]">
              <NuxtImg src="/images/nav/topup.png" alt="Top up" class="w-[16px] h-[16px]" />
            </div>
          </div>
        </div>

        <div class="flex items-center ml-6">
          <UIcon name="i-lucide-search" alt="Search" class="w-[16px] h-[16px]" />
        </div>

        <div class="flex items-center ml-6">
          <NuxtLink to="/notify" class="hover:cursor-pointerr" data-text="notification">
            <NuxtImg src="/images/nav/notify.svg" alt="Notify" class="w-[16px] h-[16px]" />
          </NuxtLink>
        </div>
        <div v-if="globalStore.loginStatus" class="flex">

          <div class="flex justify-center items-center ml-6 gap-[8px] cursor-pointer hover:cursor-pointer"
            @click="toMe">
            <div>
              <NuxtImg :src="globalStore?.userInfo?.avatar || ''" alt="User" class="w-[32px] h-[32px] rounded-full" />
            </div>
            <div class="text-white text-sm font-normal font-['Inter']">
              {{ formatName(globalStore.walletAddress || '') }}
            </div>
          </div>

        </div>
        <NuxtLink v-if="!globalStore.loginStatus" class="nav-link hover:cursor-pointer flex items-center"
          data-text="documentation" target="_blank">
          <UButton color="lucky" class="w-32 h-10 justify-center" @click="connect">{{ $t('nav.openBtn') }}</UButton>
        </NuxtLink>
        <LanguageSwitcher />
      </div>
    </div>

  </nav>
</template>
<script setup lang="ts">
import { useAppKit } from '@reown/appkit/vue';
import type { DropdownMenuItem } from '@nuxt/ui'
import { formatName } from '~/utils'
import { useGlobalStore } from '~/stores/global'
const toast = useToast()
const globalStore = useGlobalStore()

const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
if (import.meta.client) {
  // 只在客户端获取 open 方法
}
const confit = useAppConfig()
console.log('confit', confit)

const openToast = () => {
  // 打开一个简单的 Toast 提示
  toast.add({
    title: 'Hello',
    description: 'This is a toast message.',
    color: 'info',
  })
}

const connect = async () => {
  // if (open) {
  const { open } = useAppKit()
  open({ view: 'Connect' })
  // console.log('Connect result:', result)
  // 假设 result.address 是钱包地址
  // if (result?.address) {
  //   globalStore.setWallet(result.address)
  // }
  // }
}
const currencyList = [
  {
    icon: '/images/lcx.png',
    label: 'LCX',
    id: 'lcx',
    val: '1.01',
    val2: '≈152.22'
  },
  {
    icon: '/images/nav/usdt.svg',
    label: 'USDT',
    id: 'usdt',
    val: '1.01',
    val2: '≈152.22',
    disabled: true
  },
  {
    icon: '/images/nav/usdc.png',
    label: 'USDC',
    id: 'usdc',
    val: '1.01',
    val2: '≈152.22',
    disabled: true
  },
  {
    icon: '/images/nav/sol.png',
    label: 'Sol',
    id: 'sol',
    val: '1.01',
    val2: '≈152.22',
    disabled: true
  },
]

const currentCurrency = ref(currencyList[0])

const menuItems = [
  {
    label: t('nav.game'),
    to: '/',
  },
  {
    label: t('nav.leaderboard'),
    to: '/ranking'
  },
  {
    label: t('nav.reward'),
    to: '/reward'
  }
] satisfies DropdownMenuItem[]

const toBelongings = () => {
  if (globalStore.loginStatus) {
    // 跳转到个人物品页面
    navigateTo('/belongings')
  } else {
    // 如果未登录，提示用户登录
    // loginStatus.value = true
    // toast.add({
    //   title: 'Please login first',
    //   description: 'You need to login to access your belongings.',
    //   color: 'warning',
    // })
  }
}

const toMe = () => {
  navigateTo('/me')
}

</script>

<style scoped lang="scss">
.nav-link {
  position: relative;
  display: block;
  transition: font-weight 0.1s;

  .nav-arrow {
    // position: absolute;
    // right: -10px; // 调整为合适的值
    // top: 0;
    // display: inline-block;
    width: 16px;
  }

  /* 伪元素撑开空间的方案保持不变，因为它很有效 */
  &::after {
    content: attr(data-text);
    display: block;
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  &.active {
    font-weight: bold;
  }
}

.nav-menu-item {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    height: 5px;
    width: 0;
    background-color: #4A4CED;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-image: linear-gradient(to bottom, rgba(74, 76, 237, 0), rgba(74, 76, 237, 0.4));
    transition: all 0.3s ease-in-out;
  }

  &.active {
    &::after {
      width: 100%;
    }

    &::before {
      height: 100%;
    }
  }

  &:hover {
    &::before {
      height: 100%;
    }

    &::after {
      width: 100%;
    }
  }
}
</style>