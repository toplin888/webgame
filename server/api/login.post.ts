// server/api/metrics.post.ts
import type { H3Event } from 'h3'
import { createError, eventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { useSignByParams } from '~/composables/useSign'

export default eventHandler(async (event: H3Event) => {
  // const body = await readBody(event) as Record<string, any>
  const { address, addtype } = await readBody(event) as { address: string, promocode: string, gameid: number, addtype: number }
  const config = useRuntimeConfig()
  const targetUrl = `${config.public.apiBase}/api/user/login`
  console.log('Api登錄地址==========', config.public.apiBase)

  // const { sign, timestamp } = useSign('UserLogin'+address)
  const { sign, timestamp } = useSignByParams({ address: address, addtype })

  try {
    const res = await $fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        sign,
        timestamp,
        address,
        addtype
      }
    })
    return res
  } catch (e: any) {
    console.log(e)
    // throw createError({
    //   statusCode: 502,
    //   statusMessage: 'Bad Gateway: ' + (e.message || 'Failed to fetch metrics')
    // })
  }
})
