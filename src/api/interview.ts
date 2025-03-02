import type { InterviewInfo } from '@/routes/main/job-interview/interview-table'
import { request } from './request'

export const interviewApi = {
  info() {
    return request.get<{ list: InterviewInfo[] }>('/interview/info')
  }
}
