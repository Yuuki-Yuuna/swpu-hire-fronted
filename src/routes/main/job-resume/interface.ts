import type { Dayjs } from 'dayjs'

export interface ResumeFormData {
  name: string
  phone: string
  email: string
  identify: string
  education: ResumeEducation[]
}

export interface ResumeEducation {
  school: string
  degree: string
  timeRange: [Dayjs, Dayjs]
  major?: string
}
