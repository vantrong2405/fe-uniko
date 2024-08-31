export const isClient = typeof window !== 'undefined'

export function getBaseUrl() {
  if (isClient) {
    return process.env.NEXT_PUBLIC_API_ENDPOINT || ''
  }
  const vercelUrl = process.env.VERCEL_URL
  const localhost = `http://localhost:${process.env.PORT ?? 3000}`
  return vercelUrl ? `https://${vercelUrl}` : localhost
}

export function getHeaders() {
  return {
    'Content-type': 'application/json'
  }
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function capitalizeMany(str: string) {
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ')
}

export function isNullish<T>(value: T | null | undefined): value is null | undefined {
  return value == null || value == undefined
}

export const getAccessTokenFromLocalStorage = () => (isClient ? localStorage.getItem('accessToken') : null)

export const getRefreshTokenFromLocalStorage = () => (isClient ? localStorage.getItem('refreshToken') : null)
export const setAccessTokenToLocalStorage = (value: string) => isClient && localStorage.setItem('accessToken', value)

export const setRefreshTokenToLocalStorage = (value: string) => isClient && localStorage.setItem('refreshToken', value)
export const removeTokensFromLocalStorage = () => {
  isClient && localStorage.removeItem('accessToken')
  isClient && localStorage.removeItem('refreshToken')
}

export const setEmailWhenRegister = (value: string) => isClient && localStorage.setItem('registerData', value)

export const getEmailWhenRegister = () => (isClient ? localStorage.getItem('registerData') : null)
