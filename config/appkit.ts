import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// import { mainnet, arbitrum, type AppKitNetwork } from '@reown/appkit/networks'
import * as allNetworks from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

export const networks = Object.values(allNetworks).filter(
    n => typeof n === 'object' && n !== null && 'id' in n
) as AppKitNetwork[]
// export const projectId = process.env.NUXT_PROJECT_ID ?? ''
// export const projectId = import.meta.env.NUXT_PUBLIC_PROJECT_ID
//     || ''

// export const networks = [mainnet, arbitrum] as [AppKitNetwork, ...AppKitNetwork[]]

