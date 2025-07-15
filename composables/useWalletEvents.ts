import { onMounted, onUnmounted } from 'vue'
import { useAccount, useAccountEffect } from '@wagmi/vue'
import { useGlobalStore } from '~/stores/global'
import { useDisconnect } from "@reown/appkit/vue";
// import { useAppKit } from '@reown/appkit/vue';
export function useWalletEvents() {
    const { disconnect } = useDisconnect();
    console.log('useWalletEvents initialized')
    const globalStore = useGlobalStore()
    const { isConnected } = useAccount()
    useAccountEffect({
        onConnect(data) {
            console.log('Connected!', data)
            // useWalletLogin()
        },
        onDisconnect() {
            console.log('onDisconnect!')
            disconnect();
            // 钱包断开时清除全局状态
            globalStore.logout()
            // const { close } = useAppKit();

            // close()
        },
    })

    // 也可以监听连接
    // onConnect(() => { ... })
}