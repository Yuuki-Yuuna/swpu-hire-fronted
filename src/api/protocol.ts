import type { ProtocolTableData as CompanyProtocol } from '@/routes/company/company-protocol/protocol-table'
import { request } from './request'

export const protocolApi = {
  listByCompany() {
    return request.get<CompanyProtocol[]>('/protocol/list-company')
  },
  create(formData: FormData) {
    return request.post<null>('/protocol/create', formData)
  }
}
