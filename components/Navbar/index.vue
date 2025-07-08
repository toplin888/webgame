<!-- components/Navbar.vue -->
<template>
  <nav class="bg-black shadow-md p-4 flex justify-between items-center">
    <!-- Logo -->
    <div
      class="logo bg-[url('~/assets/images/logo.png')] bg-center bg-no-repeat bg-contain w-[80px] h-[22px] sm:w-[90px] sm:h-[25px] md:w-[107px] md:h-[29px]">
      <!-- <UIcon name="i-custom-logo" /> -->

      <!-- <NuxtImg src="@/assets/images/logo.png" /> -->
    </div>

    <!-- PC端导航菜单 (中等屏幕及以上显示) -->
    <ul
      class="hidden md:flex items-center space-x-4 rounded-[50px] ring-1 ring-inset ring-white/20 py-[1px] pl-[10px] pr-[10px] text-white">
      <li class="px-5 py-3.5">
        <NuxtLink :to="localePath('/')" class="nav-link" data-text="Home" active-class="active">Home</NuxtLink>
      </li>
      <li class="px-5 py-3.5">
        <NuxtLink :to="localePath('/dao')" class="nav-link" data-text="DAO" active-class="active">DAO</NuxtLink>
      </li>
      <li class="px-5 py-3.5">
        <NuxtLink :to="localePath('/node-plan')" class="nav-link" data-text="Node plan" active-class="active">Node plan
        </NuxtLink>
      </li>
      <li class="px-5 py-3.5">
        <UDropdownMenu :items="menuItems"
          :ui="{ content: 'w-48 custom-dropdown-bg outline-none ring-1 ring-custom-border ', itemLabel: 'text-white text-base font-normal' }">
          <!-- bg-gradient-to-l from-neutral-900/25 to-gray-900/90 border-[0.50px] border-边框 -->
          <NuxtLink to="" class="nav-link hover:cursor-pointer flex items-center" data-text="documentation">
            documentation
            <UIcon class="nav-arrow" name="i-custom-navarrow" />
          </NuxtLink>
          <template #profile-trailing>
            <UIcon name="i-custom-linkblank" class="shrink-0 size-5 text-white" />
          </template>
        </UDropdownMenu>
      </li>
    </ul>

    <div class="flex items-center space-x-4">
      <!-- 移动端汉堡按钮 (中等屏幕以下显示) -->
      <button class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <div class="flex items-center">
        <NuxtLink
          to="https://getrichweb3.com/?agentId=1&channelId=1&currencyRate=1&from=lucky&gameId=62300&method=userLogin&sign=74ae51e1fc6df89411f3e1ea23bfae76&time=1752197154&token=O4UFDqyqjVx91JztawHxC_VVgE9IixJqWS3fQwIQobZN7_Wx5LCT8oaTDQCkXHigMVRx_Z9_33kT6BF8IM_Ut18x2N_ezmNVp9gntk04n89yhSzGIPVB-ZWi7ZA55sqhbp4XdXHk_TYZZWweD_Dzf8nRw-riYVxBPxQ3gJcXSsM&userName=LV454ZtPmXWElmtpQPNgnA==&userPwd=e170662cc49b76d934ab06dc873780f6"
          class="nav-link hover:cursor-pointer flex items-center" data-text="documentation" target="_blank">
          <UButton color="lucky">{{ $t('nav.openDapp') }}</UButton>
        </NuxtLink>
        <LanguageSwitcher />
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const localePath = useLocalePath()

const menuItems = [
  {
    label: 'Developer',
    url: '/documentation',
    to: '/documentation'
  },
  {
    label: 'Profile',
    to: '/documentation',
    target: '_blank',
  }, {
    label: 'Billing',
    to: '/documentation',
    target: '_blank',
  }, {
    label: 'Settings',
    slot: 'profile' as const,
    to: '/documentation',
    target: '_blank',
  },
  // {
  //   label: '白皮书',
  //   to: 'https://luckyx.gitbook.io/white-paper/',
  //   target: '_blank',
  // }, {
  //   label: '帮助中心',
  //   to: 'https://luckyx.gitbook.io/help-center/',
  //   target: '_blank',
  // },
  // {
  //   label: '服务条款',
  //   to: 'https://luckyx.gitbook.io/terms-of-service/',
  //   target: '_blank',
  // },
  // {
  //   label: '隐私条款',
  //   to: 'https://luckyx.gitbook.io/privacy-policy/',
  //   target: '_blank',
  // }
] satisfies DropdownMenuItem[]

const langItems = [
  {
    label: 'English',
    value: 'en',
    slot: 'english' as const,
    onSelect: () => {
      console.log('切换到英文')
    }
  },
  {
    label: '中文',
    value: 'zh-CN',
    onSelect: () => {
      console.log('切换到中文文')
    }
  }
] satisfies DropdownMenuItem[]
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
</style>