import { protocolApi } from '@/api/protocol'
import { useRequest } from 'ahooks'
import { Flex } from 'antd'
import { createStyles } from 'antd-style'
import { useMemo, useState } from 'react'
import { ProtocolFilter, type ProtocolFilterData } from './protocol-filter'
import { ProtocolTable } from './protocol-table'

const EmploymentProtocol = () => {
  const [filterData, setFilterData] = useState<ProtocolFilterData>({
    studentName: '',
    companyName: ''
  })

  const {
    data = [],
    loading,
    refresh
  } = useRequest(async () => {
    const res = await protocolApi.listBySchool()
    return res.data
  })

  const dataSource = useMemo(
    () =>
      data.filter(
        (item) =>
          item.studentName.includes(filterData.studentName) &&
          item.companyName.includes(filterData.companyName)
      ),
    [data, filterData]
  )

  const { styles } = useStyles()

  return (
    <Flex vertical gap={16}>
      <div className={styles.title}>三方协议</div>
      <ProtocolFilter onFilterChange={setFilterData} />
      <ProtocolTable data={dataSource} loading={loading} refresh={refresh} />
    </Flex>
  )
}

export default EmploymentProtocol

const useStyles = createStyles(({ token, css }) => ({
  title: css`
    font-size: 18px;
    font-weight: 700;
  `
}))
