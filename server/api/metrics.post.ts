// server/api/metrics.post.ts
import type { H3Event } from 'h3'
import { createError, eventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { useSign } from '~/composables/useSign'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event) as Record<string, any>
  const config = useRuntimeConfig()
  // 一定是 config.apiBase，而不是 config.public.apiBase
  const targetUrl = `${config.public.apiBase}/api/game/list`

  // const { sign, timestamp } = useSign('GetIndexMetrics')

  try {
    const res = await $fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        // sign,
        // timestamp,
        // ...body
      }
    })
    return res
  } catch (e: any) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway: ' + (e.message || 'Failed to fetch metrics')
    })
  }
})
