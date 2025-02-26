import { userApi } from '@/api/user'
import { getToken, removeToken } from '@/utils/token'
import { useNavigate } from '@modern-js/runtime/router'
import { message } from 'antd'
import { useAtom } from 'jotai'
import { atomWithReset, useResetAtom } from 'jotai/utils'
import { useCallback, useEffect } from 'react'

export interface UserInfo {
  username: string
  studentName: string
  graduationYear: number
  avatar?: string
}

const userAtom = atomWithReset<UserInfo | null>(null)

const getUserInfo = async (): Promise<{
  userInfo: UserInfo | null
  message?: string | undefined
}> => {
  const token = getToken()
  if (!token) {
    return { userInfo: null }
  }

  const { success, data, message } = await userApi.userInfo()
  if (!success) {
    removeToken()
    return { userInfo: null, message }
  }

  return { userInfo: data }
}

export const useUserInfo = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useAtom(userAtom)

  const refreshUserInfo = useCallback(async () => {
    const result = await getUserInfo()
    if (!result.userInfo) {
      result.message && message.error(result.message)
      navigate('/login')
    } else {
      setUserInfo(result.userInfo)
    }
  }, [navigate, setUserInfo])

  useEffect(() => {
    if (userInfo) {
      return
    }

    refreshUserInfo()
  }, [userInfo, refreshUserInfo])

  return { userInfo, refresh: refreshUserInfo }
}

export const useResetUserInfo = () => {
  return useResetAtom(userAtom)
}
