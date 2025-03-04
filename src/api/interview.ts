import type { InterviewInfo } from '@/routes/student/job-interview/interview-table'
import { request } from './request'

export const interviewApi = {
  info() {
    return request.get<{ list: InterviewInfo[] }>('/interview/info')
  }
}
