import { interviewApi } from '@/api/interview'
import { useRequest } from 'ahooks'
import { Flex } from 'antd'
import { useMemo, useState } from 'react'
import { InterviewFilter, type InterviewFilterData } from './interview-filter'
import { InterviewTable } from './interview-table'

const JobInterview = () => {
  const [filterData, setFilterData] = useState<InterviewFilterData>({
    jobName: '',
    companyName: ''
  })

  const { data, loading } = useRequest(async () => {
    const res = await interviewApi.info()
    return res.data
  })

  const dataSource = useMemo(
    () =>
      (data?.list || []).filter(
        (item) =>
          item.jobName.includes(filterData.jobName) && item.jobName.includes(filterData.companyName)
      ),
    [data, filterData]
  )

  return (
    <Flex vertical gap={16}>
      <InterviewFilter onFilterChange={setFilterData} />
      <InterviewTable data={dataSource} loading={loading} />
    </Flex>
  )
}

export default JobInterview
