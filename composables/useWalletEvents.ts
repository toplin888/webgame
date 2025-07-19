import { onMounted, onUnmounted } from 'vue'
import { useAccount, useAccountEffect } from '@wagmi/vue'
import { useAppKitAccount } from "@reown/appkit/vue";
import { useGlobalStore } from '~/stores/global'
import { useDisconnect } from "@reown/appkit/vue";
// import { useAppKit } from '@reown/appkit/vue';
export function useWalletEvents() {
    const { disconnect } = useDisconnect();
    const globalStore = useGlobalStore()
    const accountData = useAppKitAccount()
    useAccountEffect({
        onConnect(data) {
            // console.log('Connected!', data)
            // useWalletLogin()
        },
        onDisconnect() {
            // console.log('onDisconnect!')
            // disconnect();
            // // 钱包断开时清除全局状态
            // globalStore.logout()

        },
    })

    // 也可以监听连接
    // onConnect(() => { ... })
}