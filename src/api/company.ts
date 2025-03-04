import type { QualificateFormData } from '@/routes/company/company-qualificate/interface'
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
  }
}
