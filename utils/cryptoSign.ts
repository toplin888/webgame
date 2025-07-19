import { useRuntimeConfig } from '#imports'
import CryptoJS from 'crypto-js'

export function useSignByParamsClient(params: Record<string, any>): { sign: string; timestamp: string } {
  const config = useRuntimeConfig()
  const secretKey = config.public.apiSecretKey as string
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const fullParams: Record<string, any> = { ...params, timestamp }
  const filteredParams: Record<string, string> = {}
  for (const key in fullParams) {
    const value = fullParams[key]
    if (value !== null && value !== undefined && value !== '') {
      filteredParams[key] = String(value)
    }
  }
  const sortedKeys = Object.keys(filteredParams).sort()
  const stringA = sortedKeys.map(key => `${key}=${filteredParams[key]}`).join('&')
  const stringSignTemp = stringA + "&" + secretKey
  const sign = CryptoJS.MD5(stringSignTemp).toString().toLowerCase()
  return { sign, timestamp }
}