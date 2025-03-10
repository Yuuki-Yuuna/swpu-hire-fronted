import { companyApi } from '@/api/company'
import { useRequest } from 'ahooks'
import { Flex, Spin } from 'antd'
import { useMemo, useState } from 'react'
import { JobFilter } from './job-filter'
import { JobTable } from './job-table'

const HireJob = () => {
  const [jobName, setJobName] = useState('')

  const {
    data = [],
    loading,
    refresh
  } = useRequest(async () => {
    const res = await companyApi.listByCompany()
    return res.data
  })

  const dataSource = useMemo(
    () => data.filter((item) => item.jobName.includes(jobName)),
    [jobName, data]
  )

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={16}>
        <JobFilter onFilterChange={setJobName} />
        <JobTable data={dataSource} loading={loading} refresh={refresh} />
      </Flex>
    </Spin>
  )
}

export default HireJob
