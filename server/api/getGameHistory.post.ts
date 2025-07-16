// server/api/metrics.post.ts
import type { H3Event } from 'h3'
import { createError, eventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { useSignByParams } from '~/composables/useSign'

export default eventHandler(async (event: H3Event) => {
    const body = await readBody(event) as Record<string, any>
    const config = useRuntimeConfig()
    // 一定是 config.apiBase，而不是 config.public.apiBase
    const targetUrl = `${config.public.apiBase}/api/user/mygameloglist`

    console.log('Requesting game list with body:', body, 'to URL:', targetUrl)
    // const { sign, timestamp } = useSign('UserLogin'+address)
    const { sign, timestamp } = useSignByParams({
        ...body
    })
    console.log('Requesting game list for address:', 'with sign:', sign, 'and timestamp:', timestamp, 'to URL:', targetUrl)
    try {
        const res = await $fetch(targetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                sign,
                timestamp,
                ...body
            }
        })
        return res
    } catch (e: any) {
        console.error(e)
        return {
            code: 500,
            message: '接口异常，已返回默认数据',
            data: {
                isreg: false,
                money: 0,
                user: {}
            }
        }
        // throw createError({
        //   statusCode: 502,
        //   statusMessage: 'Bad Gateway: ' + (e.message || 'Failed to fetch metrics')
        // })
    }
})
