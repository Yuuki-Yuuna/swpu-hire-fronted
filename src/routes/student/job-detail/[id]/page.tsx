import { jobApi } from '@/api/job'
import { useParams } from '@modern-js/runtime/router'
import { useRequest } from 'ahooks'
import { Flex, Spin } from 'antd'
import { CompanyCard } from './company-card'
import { JobCard } from './job-card'

const JobDetail = () => {
  const params = useParams()

  const { data, loading } = useRequest(async () => {
    const res = await jobApi.detail({ id: params.id as string })
    return res.data
  })

  return (
    <Spin spinning={loading}>
      <Flex gap={12}>
        <JobCard data={data} />
        <CompanyCard data={data?.company} />
      </Flex>
    </Spin>
  )
}

export default JobDetail
