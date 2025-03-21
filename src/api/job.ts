import type { JobData } from '@/routes/interface'
import type { JobDetailData } from '@/routes/student/interface'
import type { JobSearchData } from '@/routes/student/job-info/job-search'
import { request } from './request'

export const jobApi = {
  list(params: { page: number; limit: number } & JobSearchData) {
    return request.get<{ list: JobData[]; total: number }>('/job/list', { params })
  },
  lastestList(params: { page: number; limit: number } & JobSearchData) {
    return request.get<{ list: JobData[]; total: number }>('/job/lastest-list', { params })
  },
  collectList(params: { page: number; limit: number } & JobSearchData) {
    return request.get<{ list: JobData[]; total: number }>('/job/collect-list', { params })
  },
  recommend(params: { page: number; limit: number }) {
    return request.get<{ list: JobData[]; total: number }>('/job/recommend', { params })
  },
  detail(params: { id: string }) {
    return request.get<JobDetailData>('/job/detail', { params })
  },
  apply(params: { jobId: string }) {
    return request.post<null>('/interview/create-record', params)
  },
  collect(params: { id: string }) {
    return request.post<null>('/job/collect', params)
  }
}
