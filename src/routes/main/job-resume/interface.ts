import type { Dayjs } from 'dayjs'

type TimeRange = [Dayjs | number, Dayjs | number]

export interface ResumeFormData {
  name: string
  phone: string
  email: string
  identify: string
  education: ResumeEducation[]
  intership: ResumeIntership[]
  project: ResumeProject[]
  selfEvaluation?: string
}

export interface ResumeEducation {
  school: string
  degree: string
  timeRange: TimeRange
  major?: string
}

export interface ResumeIntership {
  company: string
  position: string
  timeRange: TimeRange
  desc?: string
}

export interface ResumeProject {
  name: string
  role?: string
  timeRange: TimeRange
  link?: string
  desc: string
}
