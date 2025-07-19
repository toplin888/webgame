import { watchEffect } from 'vue'
import { useAccount } from '@wagmi/vue'
import { useAppKitAccount } from "@reown/appkit/vue";
import { useSignMessage } from '@wagmi/vue'
import { useGlobalStore } from '~/stores/global'
import { useFetch } from '#app'
import { useNuxtApp } from '#app'
import { useDisconnect } from "@reown/appkit/vue";

export function useWalletLogin() {
    const { disconnect } = useDisconnect()

    const globalStore = useGlobalStore()
    const { chainId } = useAccount()
    const accountData = useAppKitAccount()
    const { signMessageAsync } = useSignMessage()

    const { $request } = useNuxtApp() as unknown as { $request: <T = any>(url: string, options?: any) => Promise<T> }
    // 返回一个方法，由外部 setup 环境调用
    return async () => {
        // watchEffect(async () => {
        console.log('钱包连接状态变化:', accountData.value, accountData.value.address, !globalStore.isWalletConnected)

        if (accountData.value.isConnected && accountData.value.address && !globalStore.isWalletConnected) {
            console.log('连接钱包输出:', accountData.value, accountData.value.address, !globalStore.isWalletConnected)

            try {
                const singRes = await $request<any>('/api/getSignMessage', {
                    method: 'POST',
                    body: {
                        address: accountData.value.address,
                        addtype: chainId.value || 1, // 默认使用1，可能需要根据实际情况调整
                    },
                })
                console.log('获取签名消息:', singRes)
                const signMessageStr = singRes.data.value

                const signature = await signMessageAsync({
                    message: signMessageStr
                })

                const res = await $request<any>('/api/login', {
                    method: 'POST',
                    body: {
                        address: accountData.value.address,
                        addtype: chainId.value || 1, // 默认使用1，可能需要根据实际情况调整
                        signature: signature,
                        message: signMessageStr,
                    },
                })
                // console.log('登录响应:', res)
                // const token = res?.token
                // if (token) {
                globalStore.setLoginStatus(true)
                globalStore.setUid(res.data.user.user_id)
                globalStore.setStatus(res.data.isreg || false)
                globalStore.setWallet(accountData.value.address)
                globalStore.setUserInfo({
                    ...res.data.user,
                    address: accountData.value.address,
                    uid: res.data.user.user_id,
                    money: res.data.user.money || 0,
                    isNewUser: res.data.isreg || false,
                })

                // }
            } catch (err) {
                console.log('❌ Disconnected')
                disconnect();
                // 钱包断开时清除全局状态
                globalStore.logout()
                console.error('请求异常:', err)
            }
        }
        // })
    }
}