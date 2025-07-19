<template>
  <div class="app-container">
    <NuxtRouteAnnouncer />

    <UApp :toaster="{ position: 'top-center' }" :locale="uiLocale">
      <!-- <UToaster position="bottom-left" :expand="true" :duration="2000" /> -->
      <UModal v-model:open="modalState" :ui="{
        content: 'bg-[linear-gradient(180deg,#1A1726_0%,#0C0B14_100%)] rounded-2xl w-[976px] max-w-[976px]',
        overlay: 'bg-[rgba(0,0,0,0.8)]',
      }">
        <template #content>
          <div class="p-[40px_45px] relative w-[976px] h-[600px] flex justify-between items-center">
            <div>
              <NuxtImg src="/images/inviteModal.png" width="450" height="549" class="mx-auto mb-6" />
            </div>
            <div>
              <div class="mb-[16px] w-96 justify-center text-white text-2xl font-bold font-['Inter'] leading-loose">
                <span class="text-white/50">{{ globalStore.userInfo.user_name }}</span>是新用户是否需要绑定上下级
              </div>
              <div class="mb-[16px]">
                <UInput color="lucky" v-model="inviteCode" class="mt-4 w-96" placeholder="请输入您的邀请码" :ui="{
                  root: 'p-[14px_20px] bg-[rgba(214,225,255,0.2)] rounded-lg',
                  base: 'bg-[rgba(214,225,255,0.2)] text-white placeholder:text-white/50 ring-0 bg-transparent focus:ring-0 focus:border-transparent focus-visible:ring-0',
                }" />
              </div>
              <div class="text-indigo-400 text-sm mb-[48px]"><span class="text-white/50">注：</span>后续不可更改</div>
              <div>
                <UButton class="justify-center w-full h-[50px]" color="lucky" @click="bindCode">确定</UButton>
              </div>
            </div>
          </div>
        </template>
      </UModal>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
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
import { UToast } from '#components'

const toast = useToast()
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

const inviteCode = ref('')
const modalState = computed(() => globalStore.inviteModal)
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
    localStorage.clear()
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
  }
  //  else if (val && globalStore.isWalletConnected && globalStore.walletAddress) {
  //   // 如果连接了钱包且 store 已设置，可能需要更新状态或执行其他操作
  //   console.log('静默钱包登录:', globalStore.walletAddress)
  //   globalStore.setLoginStatus(true)
  // }
}, { immediate: true })

watch(() => globalStore.walletAddress, (val) => {
  if (val && !globalStore.isWalletConnected) {
    // 如果有钱包地址但未连接，执行登录
    globalStore.setLoginStatus(true)
  }
}, { immediate: true })

const bindCode = () => {
  if (!inviteCode.value) {
    toast.add({
      title: '请输入邀请码',
    })
    return
  }
  bindPromote({
    avatar: globalStore.userInfo?.user_avatar,
    promocode: inviteCode.value,
    userid: globalStore.userInfo?.user_id,
    username: globalStore.userInfo?.user_name,
  }).then((res) => {
    if (res.code == 0) {
      globalStore.setInviteModal(false)
      globalStore.setUserInfo({
        ...globalStore.userInfo,
        isreg: true,
      })
      toast.add({
        title: '邀请码绑定成功',
      })
    }
  }).catch((err) => {
    toast.add({
      title: '绑定邀请码失败，请稍后再试',
    })
  })

}
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
