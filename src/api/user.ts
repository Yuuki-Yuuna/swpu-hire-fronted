import { request } from './request'

export const userApi = {
  login(params: { username: string; password: string }) {
    return request.post<{ token: string }>('/user/login', params)
  }
}
