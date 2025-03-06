import type { ApplyProcess } from '@/routes/company/hire-detail/[id]/job-card'
import type { InterviewInfo as CompanyInterviewInfo } from '@/routes/company/hire-interview/interview-table'
import type { InterviewInfo } from '@/routes/student/job-interview/interview-table'
import type { ResumeFormData } from '@/routes/student/job-resume/interface'
import { request } from './request'

export const interviewApi = {
  info() {
    return request.get<InterviewInfo[]>('/interview/info')
  },
  listByCompany() {
    return request.get<CompanyInterviewInfo[]>('/interview/list-company')
  },
  studentResume(params: { studentId: string; jobId: string }) {
    return request.get<{ resume: ResumeFormData; interview: CompanyInterviewInfo }>(
      '/interview/student-resume',
      { params }
    )
  },
  applyProcess(params: ApplyProcess & { studentId: string; jobId: string }) {
    return request.post<null>('/interview/apply-process', params)
  }
}
