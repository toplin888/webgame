// composables/apiServices.ts
// import type { UseFetchReturn } from '#app'

type RequestFn = <T = any>(url: string, options?: any) => Promise<T>

// const result = await $request('/api/auth/wallet-login', {
//   method: 'POST',
//   body: { address: '0x123...' },
//   timeout: 8000 // 可选，超时时间
// })


export function userLogin(address: string) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/login', {
    method: 'POST',
    body: { address }
  })
}

export function getGameList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/gameList', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getWinnersList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getWinners', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getConfigStatistic() {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getConfigStatistic', {
    method: 'POST'
  })
}

export function getConfigLanguagesList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getConfigLanguages', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getRankList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getRanks', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getGameDetail<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getGameDetail', {
    method: 'POST',
    body: {
      ...data
    },
    auth: true // 需要登录
  })
}

export function getGameLogin<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getGame', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getOtherRewards<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getOtherRewards', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getGameHistory<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getGameHistory', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function favoriteGame<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/favoriteGame', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getActivityList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getActivityList', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getSignList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getSignList', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function signin<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/signin', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function goActivityDetail<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/goActivityDetail', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getActivityHistory<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getActivityHistory', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getSignMessage<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getSignMessage', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getNoticeList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getNoticeList', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getMyNoticeList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getMyNoticeList', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getMyRomoteList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getMyRomoteList', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getMyRomoteDetail<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getMyRomoteDetail', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getFavoriteGames<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getFavoriteGames', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getBelonging<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getBelonging', {
    method: 'POST',
    body: {
      ...data
    }
  })
}


export function getBelongingList<T extends Record<string, any> = Record<string, any>>(data: T) {
  const { $request } = useNuxtApp() as unknown as { $request: RequestFn }
  return $request('/api/getBelongingList', {
    method: 'POST',
    body: {
      ...data
    }
  })
}

export function getConfigStatistic2() {
  return useFetch('/api/getConfigStatistic', {
    method: 'POST'
  })
}


export function getMetricsList() {
  return useFetch('/api/metrics', {
    method: 'POST'
  })
}