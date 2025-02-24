import type { JobData, JobDetailData } from '@/routes/main/interface'
import { request } from './request'

export const jobApi = {
  recommend(params: { page: number; limit: number }) {
    return request.get<{ list: JobData[]; total: number }>('/job/recommend', { params })
  },
  detail(params: { id: string }) {
    return request.get<JobDetailData>('/job/detail', { params })
  }
}
