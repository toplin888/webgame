// server/api/metrics.post.ts
import type { H3Event } from 'h3'
import { createError, eventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { useSignByParams } from '~/composables/useSign'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event) as Record<string, any>
  const config = useRuntimeConfig()
  // 一定是 config.apiBase，而不是 config.public.apiBase
  const targetUrl = `${config.public.apiBase}/api/user/mypromote`

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
    return e

  }
})
