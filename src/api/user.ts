import type { UserInfo } from '@/hooks/use-user-info'
import { request } from './request'

export const userApi = {
  login(params: { username: string; password: string }) {
    return request.post<{ token: string }>('/user/login', params)
  },
  userInfo() {
    return request.get<UserInfo>('/user/info')
  },
  changePassword(params: { oldPassword: string; newPassword: string; confirmPassword: string }) {
    return request.post<null>('/user/change-password', params)
  }
}
