import { userApi } from '@/api/user'
import { getToken, removeToken } from '@/utils/token'
import { useNavigate } from '@modern-js/runtime/router'
import { message } from 'antd'
import { useAtom } from 'jotai'
import { atomWithReset, useResetAtom } from 'jotai/utils'
import { useCallback, useEffect } from 'react'

export enum UserType {
  Student = 0, // 学生
  Company = 1, // 企业
  School = 2 // 学校
}

interface BaseUserInfo {
  username: string
  avatar?: string
}

interface StudentUserInfo extends BaseUserInfo {
  userType: UserType.Student
  studentName: string
  graduationYear: number
}

interface CompanyUserInfo extends BaseUserInfo {
  userType: UserType.Company
  campanyName: string
  staffName: string
}

interface SchoolUserInfo extends BaseUserInfo {
  userType: UserType.School
  schoolName: string
  adminName: string
}

export type UserInfo = StudentUserInfo | CompanyUserInfo | SchoolUserInfo

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

export const transformUserRenderData = (userInfo: UserInfo | null) => {
  const data = { displayName: '', descText: '' }
  if (userInfo?.userType === UserType.Student) {
    data.displayName = userInfo.studentName
    data.descText = `${userInfo.graduationYear}届`
  } else if (userInfo?.userType === UserType.Company) {
    data.displayName = userInfo.staffName
    data.descText = userInfo.campanyName
  } else if (userInfo?.userType === UserType.School) {
    data.displayName = userInfo.adminName
    data.descText = userInfo.schoolName
  }

  return data
}
