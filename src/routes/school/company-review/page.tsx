import { schoolApi } from '@/api/school'
import { useRequest } from 'ahooks'
import { Flex } from 'antd'
import { useMemo, useState } from 'react'
import { CompanyFilter, type CompanyFilterData } from './company-filter'
import { CompanyTable } from './company-table'

const CompanyReview = () => {
  const {
    data = [],
    loading,
    refresh
  } = useRequest(async () => {
    const res = await schoolApi.examineList()
    return res.data
  })

  const [filterData, setFilterData] = useState<CompanyFilterData>({
    companyName: '',
    creditCode: ''
  })

  const dataSource = useMemo(
    () =>
      data.filter(
        ({ companyName, creditCode }) =>
          companyName.includes(filterData.companyName) && creditCode.includes(filterData.creditCode)
      ),
    [data, filterData]
  )

  return (
    <Flex vertical gap={16}>
      <CompanyFilter onFilterDataChange={setFilterData} />
      <CompanyTable data={dataSource} loading={loading} refresh={refresh} />
    </Flex>
  )
}

export default CompanyReview
