import { userApi } from '@/api/user'
import { getToken, removeToken } from '@/utils/token'
import { useNavigate } from '@modern-js/runtime/router'
import { message } from 'antd'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

export interface UserInfo {
  username: string
  studentName: string
  graduationYear: number
}

const userAtom = atom<UserInfo | null>(null)

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

  useEffect(() => {
    if (userInfo) {
      return
    }

    getUserInfo().then((result) => {
      if (!result.userInfo) {
        result.message && message.error(result.message)
        navigate('/login')
      } else {
        setUserInfo(result.userInfo)
      }
    })
  }, [userInfo, navigate, setUserInfo])

  return { userInfo, refresh: () => getUserInfo() }
}
