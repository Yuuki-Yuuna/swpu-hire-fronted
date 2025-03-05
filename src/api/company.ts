import type { QualificateFormData } from '@/routes/company/company-qualificate/interface'
import type { JobData } from '@/routes/interface'
import { request } from './request'

export const companyApi = {
  edit(params: QualificateFormData) {
    return request.post<null>('/company/edit', params)
  },
  info() {
    return request.get<QualificateFormData>('/company/info')
  },
  infoExamine() {
    return request.get<QualificateFormData | null>('/company/info-examine')
  },
  listByCompany() {
    return request.get<JobData[]>('/job/list-company')
  },
  jobDetailByCompany(params: { id: string }) {
    return request.get<JobData>('/job/detail-company', { params })
  },
  publishHire(params: Omit<JobData, '_id' | 'company'> & { jobId?: string }) {
    return request.post<null>('/job/publish', params)
  },
  deleteHire(params: { id: string }) {
    return request.post<null>('/job/delete', params)
  }
}
