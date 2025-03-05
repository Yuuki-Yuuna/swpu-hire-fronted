import type { CompanyTableData } from '@/routes/school/company-review/company-table'
import { request } from './request'

export const schoolApi = {
  examineList() {
    return request.get<CompanyTableData[]>('/company/list-examine')
  },
  reviewExamine(params: { companyId: string; isApproved: boolean }) {
    return request.post<null>('/company/review-examine', params)
  }
}
