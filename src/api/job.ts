import type { JobData, JobDetailData } from '@/routes/main/interface'
import type { JobSearchData } from '@/routes/main/job-info/job-search'
import { request } from './request'

export const jobApi = {
  list(params: { page: number; limit: number } & JobSearchData) {
    return request.get<{ list: JobData[]; total: number }>('/job/list', { params })
  },
  recommend(params: { page: number; limit: number }) {
    return request.get<{ list: JobData[]; total: number }>('/job/recommend', { params })
  },
  detail(params: { id: string }) {
    return request.get<JobDetailData>('/job/detail', { params })
  }
}
