import { getToken } from '@/utils/token'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'
import type { ResponseData } from './type'

export const baseURL = '/api' // proxy请求自己

const instance = axios.create({ baseURL, timeout: 5000 })

instance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const { code } = response.data
    response.data.success = code >= 200 && code < 300 // 前端给一个success
    return response
  },
  (error: AxiosError) => {
    const { code, response } = error
    switch (code) {
      case AxiosError.ECONNABORTED:
        return Promise.reject(new RequestError(code, '请求超时', response))
      case AxiosError.ERR_NETWORK:
        return Promise.reject(new RequestError(code, '网络错误', response))
      case AxiosError.ERR_BAD_REQUEST:
        return Promise.reject(new RequestError(code, '请求错误', response))
      case AxiosError.ERR_BAD_RESPONSE:
        return Promise.reject(new RequestError(code, '响应错误', response))
      default:
        return Promise.reject(new RequestError('ERR_UNKNOWN', '未知错误', response))
    }
  }
)

export const request = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return new Promise<ResponseData<T>>((resolve, reject) => {
      instance
        .get<ResponseData<T>>(url, config)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return new Promise<ResponseData<T>>((resolve, reject) => {
      instance
        .post<ResponseData<T>>(url, data, config)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  }
}

export class RequestError extends Error {
  code: string | number //服务端返回的自定义code或axios的错误code
  status?: number //http状态码
  response?: AxiosResponse

  constructor(code: string | number, message: string, response?: AxiosResponse) {
    super(message)
    this.code = code
    this.response = response
    this.status = response?.status
    this.name = 'RequestError'
  }
}
