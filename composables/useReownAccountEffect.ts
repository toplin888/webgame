import { watch } from 'vue'
import { useAppKitAccount } from '@reown/appkit/vue'

export function useReownAccountEffect({
    onConnect,
    onDisconnect,
    onChange,
}: {
    onConnect?: (address: string) => void
    onDisconnect?: () => void
    onChange?: (address: string | undefined) => void
}) {
    const account = useAppKitAccount()

    watch(
        () => ({
            address: account.value.address,
            status: account.value.status,
        }),
        async (current, previous) => {
            // 连接成功
            if (current.status === 'connected' && previous?.status !== 'connected') {
                await nextTick() // 确保状态更新后再执行回调
                onConnect?.(current.address!)
            }

            // 断开连接
            if (
                current.status === 'disconnected' &&
                previous?.status !== 'disconnected'
            ) {
                onDisconnect?.()
            }

            // 地址变化
            if (current.address !== previous?.address) {
                onChange?.(current.address)
            }
        },
        { immediate: true, deep: true }
    )
}
