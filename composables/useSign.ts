// composables/useSign.ts
import { useRuntimeConfig } from '#imports'
import { createHash } from 'crypto'

/**
 * 计算签名：给定接口名称（methodName），会自动拿到 config.public.apiSecretKey
 * 返回 { sign, timestamp }，其中：
 *   timestamp 是当前秒（字符串），
 *   sign = md5(secretKey + methodName + timestamp).toLowerCase()
 */
export function useSign(methodName: string): { sign: string; timestamp: string } {
  const config = useRuntimeConfig()
  // 从 runtimeConfig.public 中读取秘钥
  const secretKey = config.apiSecretKey as string
  const timestamp = Math.floor(Date.now()/1000).toString()
  // 拼字符串：secretKey + methodName + timestamp
  const raw = secretKey + methodName + timestamp
  // 使用 Node.js 内置 crypto 模块
  const sign = createHash('md5').update(raw).digest('hex').toLowerCase()
  // const sign = CryptoJS.md5(raw).toString().toLowerCase()
  return { sign, timestamp }
}

/**
 * 传入参数对象，返回签名和时间戳
 * @param params 参数列表（键值对对象）
 * @returns { sign: string, timestamp: string }
 */
export function useSignByParams(params: Record<string, any>): { sign: string; timestamp: string } {
  const config = useRuntimeConfig()
  const secretKey = config.apiSecretKey as string
  const timestamp = Math.floor(Date.now() / 1000).toString()

  // 添加 timestamp 到参数中
  const fullParams = { ...params, timestamp }

  // 筛选非空参数（排除 null, undefined, 空字符串）
  const filteredParams: Record<string, string> = {}
  for (const key in fullParams) {
    const value = fullParams[key]
    if (value !== null && value !== undefined && value !== '') {
      filteredParams[key] = String(value)
    }
  }

  // 对参数按 ASCII 升序排序
  const sortedKeys = Object.keys(filteredParams).sort()

  // 拼接成 key=value&key2=value2 的形式
  const stringA = sortedKeys.map(key => `${key}=${filteredParams[key]}`).join('&')

  // 拼接密钥
  const stringSignTemp = stringA +"&"+ secretKey

  // 生成 MD5 签名
  const sign = createHash('md5').update(stringSignTemp).digest('hex').toLowerCase()

  return { sign, timestamp }
}
