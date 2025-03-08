import type { StudentSourceInfo } from '@/routes/student/employment-info/page'
import { request } from './request'

export const studentApi = {
  sourceInfo() {
    return request.get<StudentSourceInfo>('/student/source-info')
  }
}
