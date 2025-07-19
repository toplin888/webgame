// server/api/metrics.post.ts
import type { H3Event } from 'h3'
import { createError, eventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { useSignByParams } from '~/composables/useSign'

export default eventHandler(async (event: H3Event) => {
  // const body = await readBody(event) as Record<string, any>
  const body = await readBody(event) as Record<string, any>
  const config = useRuntimeConfig()
  const targetUrl = `${config.public.apiBase}/api/user/login`

  // const { sign, timestamp } = useSign('UserLogin'+address)
  const { sign, timestamp } = useSignByParams({ ...body })

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
    return {
      code: 502,
      message: '接口异常',
      error: e?.message || e,
      data: {}
    }
  }
})
