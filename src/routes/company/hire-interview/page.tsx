import { interviewApi } from '@/api/interview'
import { useRequest } from 'ahooks'
import { Flex } from 'antd'
import { useMemo, useState } from 'react'
import { InterviewFilter, type InterviewFilterData } from './interview-filter'
import { InterviewTable } from './interview-table'

const HireInterview = () => {
  const [filterData, setFilterData] = useState<InterviewFilterData>({
    jobName: '',
    studentName: ''
  })

  const { data, loading } = useRequest(async () => {
    const res = await interviewApi.listByCompany()
    return res.data
  })

  const dataSource = useMemo(
    () =>
      (data || []).filter(
        (item) =>
          item.jobName.includes(filterData.jobName) &&
          item.student.studentName.includes(filterData.studentName)
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

export default HireInterview
