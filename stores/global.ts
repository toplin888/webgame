import { defineStore } from 'pinia';
import { useCookie } from '#app';
export interface GlobalState {
    token: string | null
    walletAddress: string | null
    isWalletConnected: boolean
    locale: string
    loginStatus: boolean
    uid: number
    status: number
    userInfo: any
}

export interface UserInfo {
    address: string
    avatar: string
    level: number
    progress: number
    inviteCode: string
    inviteLink: string
    // 根据实际业务补充其他字段
}

export const useGlobalStore = defineStore('global', {
    state: (): GlobalState => ({
        token: useCookie('token').value || null,
        walletAddress: useCookie('walletAddress').value || null,
        isWalletConnected: !!useCookie('walletAddress').value,
        locale: useCookie('lang').value || 'en',
        loginStatus: false, // 新增登录状态
        uid: 0, // 用户ID
        status: 1, // 用户状态
        userInfo: null, // 用户信息
    }),
    actions: {
        setToken(token: string) {
            useCookie('token').value = token;
            this.token = token;
        },
        setWallet(address: string) {
            useCookie('walletAddress').value = address
            this.walletAddress = address;
            this.isWalletConnected = true;
        },
        logoutWallet() {
            useCookie('walletAddress').value = null
            this.walletAddress = null
            this.isWalletConnected = false
        },
        setLocale(lang: string) {
            useCookie('lang').value = lang;
            this.locale = lang;
        },
        logout() {
            useCookie('token').value = null;
            this.token = null;
            this.loginStatus = false; // 清除登录状态
            (this as any).logoutWallet();
            this.userInfo = null; // 清除用户信息
            this.uid = 0; // 重置用户ID
            // clearUserInfo(); // 清除用户信息
        },
        setLoginStatus(status: boolean) {
            this.loginStatus = status;
        },
        setUid(uid: number) {
            this.uid = uid;
        },
        setStatus(status: number) {
            this.status = status;
        },
        setUserInfo(userInfo: UserInfo) {
            this.userInfo = userInfo;
            // setUserInfo(userInfo); // 存储用户信息到 localStorage
        }
    },
    persist: {
        // 推荐只持久化非敏感字段到 localStorage
        pick: ['userInfo', 'status', 'uid', 'loginStatus'],
        // SSR 推荐使用 localStorage，避免 cookie 冲突
        storage: piniaPluginPersistedstate.localStorage()
    }
});