import { watchEffect } from 'vue'
import { useAccount } from '@wagmi/vue'
import { useGlobalStore } from '~/stores/global'
import { useFetch } from '#app'
import { useNuxtApp } from '#app'

export function useWalletLogin() {
    console.log('useWalletLogin composable initialized')
    const globalStore = useGlobalStore()
    const accountData = useAccount()
    const { $request } = useNuxtApp() as unknown as { $request: <T = any>(url: string, options?: any) => Promise<T> }
    // 返回一个方法，由外部 setup 环境调用
    return () => {
        console.log('useWalletLogin called, accountData:', accountData)
        watchEffect(async () => {
            console.log('钱包连接状态变化:', accountData.isConnected.value, accountData.address.value, !globalStore.isWalletConnected)

            if (accountData.isConnected.value && accountData.address.value && !globalStore.isWalletConnected) {
                try {
                    const res = await $request<any>('/api/login', {
                        method: 'POST',
                        body: {
                            address: accountData.address.value,
                            addtype: accountData.chainId.value,
                        },
                    })
                    console.log('登录响应:', res)
                    // const token = res?.token
                    // if (token) {
                    globalStore.setLoginStatus(true)
                    globalStore.setUid(res.data.user.user_id)
                    globalStore.setStatus(res.data.isreg || false)
                    globalStore.setWallet(accountData.address.value)
                    globalStore.setUserInfo({
                        ...res.data.user,
                        address: accountData.address.value,
                        uid: res.data.user.user_id,
                        money: res.data.user.money || 0,
                        isNewUser: res.data.isreg || false,
                    })

                    // }
                } catch (err) {
                    console.error('请求异常:', err)
                }
            }
        })
    }
}