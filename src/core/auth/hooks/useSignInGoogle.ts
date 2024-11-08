import { setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from '@/libraries/helpers'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { authServices } from '../configs'
import { AUTH_RETRY } from '@/core/auth/constants'
import { useState } from 'react'
import { useMutationCustom } from '@/hooks/useMutationCustom'
import { useUser } from '@/core/users/hooks'
import { ISignInGoogleBody, ISignInResponse } from '@/core/auth/models'
import Cookies from 'js-cookie'

export const useSignInGoogle = () => {
  const router = useRouter()
  const [executeGetMe, setExecuteGetMe] = useState<boolean>(false)
  const [countLogin, setCountLogin] = useState<number>(0)

  const mutation = useMutationCustom<ISignInGoogleBody, ISignInResponse>({
    pathUrl: authServices.loginGoogle,
    mutateOption: {
      retry: AUTH_RETRY,
      onSuccess: (data) => {
        Cookies.set('token', data.data.accessToken, {
          path: '/',
          secure: true,
          sameSite: 'lax',
          expires: 1
        })
        setCountLogin(countLogin + 1)
        setAccessTokenToLocalStorage(data.data.accessToken)
        setRefreshTokenToLocalStorage(data.data.refreshToken)
        setExecuteGetMe(true)
        toast.success('Login successfully 🚀 ')
        router.push('/dashboard?loggedIn=true')
      },
      onError: (error) => {
        if (error.response?.status) return toast.error(`${(error.response?.data as { message: string }).message} !`)
      }
    }
  })

  const { getMe } = useUser()

  getMe(executeGetMe)

  return mutation
}