import { WagmiPlugin } from '@wagmi/vue'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const projectId = config.public.projectId || ''
  const networks = [mainnet, arbitrum]
  const wagmiAdapter = new WagmiAdapter({ networks, projectId })

  nuxtApp.vueApp.use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig })
})