import { protocolApi } from '@/api/protocol'
import { useRequest } from 'ahooks'
import { Flex } from 'antd'
import { useMemo, useState } from 'react'
import { ProtocolFilter } from './protocol-filter'
import { ProtocolTable } from './protocol-table'

const CompanyProtocol = () => {
  const [studentName, setStudentName] = useState('')

  const {
    data = [],
    loading,
    refresh
  } = useRequest(async () => {
    const res = await protocolApi.listByCompany()
    return res.data
  })

  const dataSource = useMemo(
    () => data.filter((item) => item.studentName.includes(studentName)),
    [studentName, data]
  )

  return (
    <Flex vertical gap={16}>
      <ProtocolFilter onFilterChange={setStudentName} />
      <ProtocolTable data={dataSource} loading={loading} refresh={refresh} />
    </Flex>
  )
}

export default CompanyProtocol
