// server/api/metrics.post.ts
import type { H3Event } from 'h3'
import { createError, eventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { useSignByParams } from '~/composables/useSign'

export default eventHandler(async (event: H3Event) => {
  // const body = await readBody(event) as Record<string, any>
  const body = await readBody(event) as Record<string, any>
  const config = useRuntimeConfig()
  const targetUrl = `${config.public.apiBase}/api/user/loginnonce`

  // const { sign, timestamp } = useSign('UserLogin'+address)
  const { sign, timestamp } = useSignByParams({ ...body })
  console.log('Requesting login nonce with body:', body, 'to URL:', targetUrl, 'with sign:', sign, 'and timestamp:', timestamp)
  try {
    const res = await $fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        ...body,
        sign,
        timestamp
      }
    })
    return res
  } catch (e: any) {
    return {
      code: 502,
      message: '接口异常',
      error: e?.message || e,
      data: {}
    }
    // throw createError({
    //   statusCode: 502,
    //   statusMessage: 'Bad Gateway: ' + (e.message || 'Failed to fetch metrics')
    // })
  }
})
