import { useGlobalStore } from '~/stores/global'

export default defineNuxtRouteMiddleware((to, from) => {
    // 只在客户端执行
    // if (import.meta.client) {
    const globalStore = useGlobalStore()
    // 这里以 userInfo 和 token 为例，你可以根据实际业务调整
    if (to.path !== '/' && !globalStore.walletAddress) {
        return navigateTo('/')
    }
    // }
})