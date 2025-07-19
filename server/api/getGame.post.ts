import type { H3Event } from 'h3'
import { createError, eventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { useSignByParams } from '~/composables/useSign'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event) as Record<string, any>
  const config = useRuntimeConfig()
  // 一定是 config.apiBase，而不是 config.public.apiBase
  const targetUrl = `${config.public.apiBase}/api/game/login`

  // const { sign, timestamp } = useSign('UserLogin'+address)
  const { sign, timestamp } = useSignByParams({
    ...body
  })
  try {
    console.log('Requesting game login with body:', body, 'to URL:', targetUrl)
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

      },
      error: e
    }

    // throw createError({
    //   statusCode: 502,
    //   statusMessage: 'Bad Gateway: ' + (e.message || 'Failed to fetch metrics')
    // })
  }
})
