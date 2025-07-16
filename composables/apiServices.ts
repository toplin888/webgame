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
    }
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