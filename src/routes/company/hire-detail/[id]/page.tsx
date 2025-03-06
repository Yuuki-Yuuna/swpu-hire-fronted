import { companyApi } from '@/api/company'
import { interviewApi } from '@/api/interview'
import { useParams, useSearchParams } from '@modern-js/runtime/router'
import { useRequest } from 'ahooks'
import { Flex, Spin } from 'antd'
import { JobCard } from './job-card'
import { StudentResume } from './student-resume'

const HireDetail = () => {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const studentId = searchParams.get('userId') as string

  const { data, loading } = useRequest(async () => {
    const res = await companyApi.jobDetailByCompany({ id: params.id as string })
    return res.data
  })

  const {
    data: resumeData,
    loading: resumeLoading,
    refresh
  } = useRequest(async () => {
    const res = await interviewApi.studentResume({ studentId, jobId: params.id as string })
    return res.data
  })
  const { resume, interview } = resumeData ?? {}

  return (
    <Spin spinning={loading || resumeLoading}>
      <Flex gap={16}>
        <JobCard data={data} interview={interview} refresh={refresh} />
        <StudentResume formData={resume} />
      </Flex>
    </Spin>
  )
}

export default HireDetail
