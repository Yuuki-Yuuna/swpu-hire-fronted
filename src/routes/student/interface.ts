import type { JobData } from '@/routes/interface'

export interface JobDetailData extends JobData {
  description: string // 岗位描述
  isCollect: boolean
  isApply: boolean
}
