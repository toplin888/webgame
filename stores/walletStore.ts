import { defineStore } from 'pinia';
import { useCookie } from '#app';

export const useWalletStore = defineStore('wallet', {
    state: () => ({
        walletAddress: useCookie('walletAddress').value || null,
        isWalletConnected: !!useCookie('walletAddress').value,
    }),
    actions: {
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
    }
})