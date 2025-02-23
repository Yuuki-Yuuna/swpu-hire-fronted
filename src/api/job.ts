import type { JobData } from '@/routes/main/job-info/job-list'
import { request } from './request'

export const jobApi = {
  recommend(params: { page: number; limit: number }) {
    return request.get<{ list: JobData[]; total: number }>('/job/recommend', { params })
  }
}
