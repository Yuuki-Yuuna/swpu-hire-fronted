import type { ResumeFormData } from '@/routes/main/job-resume/interface'
import { request } from './request'

export const resumeApi = {
  info() {
    return request.get<ResumeFormData>('/resume/info')
  },
  edit(params: ResumeFormData) {
    return request.post<null>('/resume/edit', params)
  }
}
