import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
    // 全局请求方法
    nuxtApp.provide('request', async <T = any>(
        url: string,
        options?: RequestInit & { params?: Record<string, any> }
    ): Promise<T> => {
        const config = useRuntimeConfig()
        const baseURL = config.public.apiBase || '/api'
        // 默认配置，可扩展 headers、超时等
        const allowedMethods = [
            'GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH',
            'CONNECT', 'OPTIONS', 'TRACE',
            'get', 'post', 'put', 'delete', 'head', 'patch',
            'connect', 'options', 'trace'
        ] as const;
        type AllowedMethod = typeof allowedMethods[number];

        let method: AllowedMethod | undefined = options?.method?.toUpperCase() as AllowedMethod | undefined;
        if (method && !allowedMethods.includes(method)) {
            method = undefined;
        }

        const defaultOptions: Partial<Record<string, any>> = {
            credentials: 'include', // 自动带 cookie
            headers: {
                'Content-Type': 'application/json',
                ...(options?.headers || {})
            },
            ...options,
            method
        }

        // 拼接 query 参数
        // let finalUrl = url.startsWith('http')
        //     ? url
        //     : baseURL.replace(/\/$/, '') + (url.startsWith('/') ? url : '/' + url)
        let finalUrl = url
        if (options?.params) {
            const query = new URLSearchParams(options.params).toString()
            finalUrl += (url.includes('?') ? '&' : '?') + query
        }

        // 超时处理
        const controller = new AbortController()
        const timeout = (options as any)?.timeout ?? 30000
        const timer = setTimeout(() => {
            controller.abort()
        }, timeout)
        defaultOptions.signal = controller.signal

        try {
            console.log('Request URL:', finalUrl, 'Options:', defaultOptions)
            const result = await $fetch<T>(finalUrl, defaultOptions)
            console.log('Request result:', result)

            clearTimeout(timer)
            return result
        } catch (err: any) {
            console.log(err)
            clearTimeout(timer)
            // 全局错误处理
            if (err?.status === 401) {
                // 未登录或 token 失效，可做跳转或提示
            }
            throw err
        }
    })
})