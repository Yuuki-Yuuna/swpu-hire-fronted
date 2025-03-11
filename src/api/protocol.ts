import type { ProtocolTableData as CompanyProtocol } from '@/routes/company/company-protocol/protocol-table'
import type { ProtocolTableData as SchoolProtocol } from '@/routes/school/employment-protocol/protocol-table'
import type { ProtocolTableData } from '@/routes/student/employment-protocol/protocol-table'
import { request } from './request'

export const protocolApi = {
  list() {
    return request.get<ProtocolTableData[]>('/protocol/list')
  },
  listByCompany() {
    return request.get<CompanyProtocol[]>('/protocol/list-company')
  },
  listBySchool() {
    return request.get<SchoolProtocol[]>('/protocol/list-school')
  },
  create(formData: FormData) {
    return request.post<null>('/protocol/create', formData)
  },
  review(params: { protocolId: string; isApproved: boolean }) {
    return request.post<null>('/protocol/review', params)
  },
  signInfo() {
    return request.get<ProtocolTableData>('/protocol/sign-info')
  }
}
