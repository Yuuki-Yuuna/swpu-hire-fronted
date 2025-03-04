import { Flex, Spin } from 'antd'
import { JobFilter } from './job-filter'
import { JobTable } from './job-table'

const HireJob = () => {
  return (
    <Spin spinning={false}>
      <Flex vertical gap={16}>
        <JobFilter />
        <JobTable />
      </Flex>
    </Spin>
  )
}

export default HireJob
