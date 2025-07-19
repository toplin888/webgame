<!-- components/TelegramLogin.vue -->
<template>
    <div class="relative flex justify-center">
        <div class="relative w-[200px] opacity-0 cursor-pointer z-20" id="telegram-login-container"></div>
        <UButton class="absolute z-5 top-0 left-[50%] -translate-x-1/2 w-[200px] justify-center h-[40px]" color="lucky">
            {{
                $t('global.joinTelegram') }}
        </UButton>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
    token: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['callback'])

onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.setAttribute('data-telegram-login', 'samplebot') // 不加 @ 符号
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-request-access', 'write')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-onauth', 'onTelegramAuth(user)')
    script.setAttribute('data-auth-url', props.url)
    script.async = true

    document.getElementById('telegram-login-container')?.appendChild(script)
})

// 全局函数，用于获取用户信息
window.onTelegramAuth = function (user) {
    emit('callback', user)
    console.log('Telegram 用户信息：', user)
    // 你可以在这里触发加入群逻辑（如发送请求给后端）
}
</script>
