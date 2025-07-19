<template>
  <div class="app-container">
    <NuxtRouteAnnouncer />

    <UApp :toaster="{ position: 'top-center' }" :locale="uiLocale">
      <!-- <UToaster position="bottom-left" :expand="true" :duration="2000" /> -->
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import { UToaster } from '#components'
import { useI18n } from 'vue-i18n'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/vue'
import { networks } from './config/appkit'
import { useWalletEvents } from '~/composables/useWalletEvents'
import { useGlobalStore } from '~/stores/global'
import { useAccount } from '@wagmi/vue'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { useWalletLogin } from '~/composables/useWalletLogin'
import { useReownAccountEffect } from '@/composables/useReownAccountEffect'
import { useDisconnect } from "@reown/appkit/vue";

const { disconnect } = useDisconnect()
const { locale } = useI18n()
const uiLocale = computed(() => locales[locale.value] || locales.en)
// import { isClient } from '#imports'
const config = useRuntimeConfig()
const projectId = config.public.projectId || ''
const wagmiAdapter = new WagmiAdapter({ networks, projectId })
const { isConnected } = useAccount()
const globalStore = useGlobalStore()
const walletLogin = useWalletLogin()

// useWalletEvents()
// if (import.meta.client) {
const appkitNetworks = networks as [AppKitNetwork, ...AppKitNetwork[]]
useWalletEvents()
createAppKit({
  adapters: [wagmiAdapter],
  networks: appkitNetworks,
  projectId,
  metadata: {
    name: 'Dapp Game',
    description: 'A Dapp Game',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
  },
  features: {
    email: false, // default to true
    // socials: [
    //   "google",
    //   "x",
    //   "github",
    //   "discord",
    //   "apple",
    //   "facebook",
    //   "farcaster",
    // ],
    socials: false,
    emailShowWallets: false,
    swaps: false
  }
})
// }

useReownAccountEffect({
  onConnect: (address) => {
    console.log('✅ Connected:', address)
    walletLogin()
  },
  onDisconnect: () => {
    console.log('❌ Disconnected')
    disconnect();
    // 钱包断开时清除全局状态
    globalStore.logout()
  },
  onChange: (addr) => {
    console.log('🔁 Address changed:', addr)
  },
})
// onMounted(() => {
//   console.log('useWalletEvents onMounted')

// 监听连接状态变化，未连接时清除 store
watch(isConnected, (val) => {

  if (!val) {
    // globalStore.logout()
  } else if (val && !globalStore.isWalletConnected) {

    // 如果连接了钱包但 store 还未设置，执行登录
    // walletLogin()
  } else if (val && globalStore.isWalletConnected && globalStore.walletAddress) {
    // 如果连接了钱包且 store 已设置，可能需要更新状态或执行其他操作
    console.log('静默钱包登录:', globalStore.walletAddress)
    globalStore.setLoginStatus(true)
  }

}, { immediate: true })
// })
</script>

<style>
.custom-dropdown-bg {
  background: linear-gradient(to left,
      rgba(18, 18, 18, 0.25),
      rgba(15, 15, 36, 0.92)),
    #000 !important;

  /* --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor); */

}

.custom-dropdown-bg {
  --tw-ring-color: rgba(39, 39, 39, 1) !important;
}

button.brand-button {
  /* 使用 CSS 变量，允许被覆盖 */
  background-color: var(--brand-bg, rgba(79, 82, 255, 0.92));
  color: var(--brand-text, white);
  --tw-ring-shadow: none;
  box-shadow: none;
  padding: var(--brand-padding, 14px 20px);
  font-size: var(--brand-font-size, 15px);
  font-weight: var(--brand-font-weight, normal);
  border-radius: var(--brand-radius, 13px);
  transition: all 0.2s ease;
}

button.brand-button:hover,
button.brand-button:active,
button.brand-button:focus {
  background-color: var(--brand-bg-hover, rgba(101, 104, 255, 0.92));
}

/* 可以通过 CSS 变量覆盖的示例类 */
.brand-button-outline {
  --brand-bg: transparent;
  --brand-text: rgba(79, 82, 255, 1);
  border: 1px solid rgba(79, 82, 255, 0.5);
}

.brand-button-small {
  --brand-padding: 8px 16px;
  --brand-font-size: 12px;
}

body {
  background-color: #000;
  color: white;
  /* Optionally set default text color to white for better contrast */
  font-family: Helvetica;
}

.app-container {
  background-color: #000;
}

.m-container {
  max-width: 1112px;
  margin: 0 auto;
}
</style>
