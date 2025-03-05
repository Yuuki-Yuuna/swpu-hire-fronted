import { companyApi } from '@/api/company'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useState } from 'react'
import { CompanyQualificateEditable } from './qualificate-editable'
import { CompanyQualificateReadonly } from './qualificate-readonly'

const CompanyQualificate = () => {
  const [editable, setEditable] = useState(false)

  const {
    data: formData,
    loading,
    refresh
  } = useRequest(async () => {
    const examineRes = await companyApi.infoExamine()
    if (examineRes.data) {
      return { ...examineRes.data, isExamine: true }
    }
    const res = await companyApi.info()
    return { ...res.data, isExamine: false }
  })

  return (
    <Spin spinning={loading}>
      {editable ? (
        <CompanyQualificateEditable
          formData={formData}
          setEditable={setEditable}
          refresh={refresh}
        />
      ) : (
        <CompanyQualificateReadonly formData={formData} setEditable={setEditable} />
      )}
    </Spin>
  )
}

export default CompanyQualificate
