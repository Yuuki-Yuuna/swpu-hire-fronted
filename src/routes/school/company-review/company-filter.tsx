import type { CompanyData } from '@/routes/interface'
import { Button, Flex, Input } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export type CompanyFilterData = Pick<CompanyData, 'companyName' | 'creditCode'>

export interface CompanyFilterProps {
  onFilterDataChange: (data: CompanyFilterData) => void
}

export const CompanyFilter: React.FC<CompanyFilterProps> = (props) => {
  const { onFilterDataChange } = props
  const [companyName, setCompanyName] = useState('')
  const [creditCode, setCreditCode] = useState('')

  const reset = () => {
    onFilterDataChange({ companyName: '', creditCode: '' })
    setCompanyName('')
    setCreditCode('')
  }

  const { styles } = useStyles()

  return (
    <Flex vertical gap={16} className={styles.container}>
      <Flex wrap gap={16}>
        <Flex flex={1} align="center" gap={12}>
          <div className={styles.itemTitle}>企业名:</div>
          <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </Flex>
        <Flex flex={1} align="center" gap={12}>
          <div className={styles.itemTitle}>信用代码:</div>
          <Input value={creditCode} onChange={(e) => setCreditCode(e.target.value)} />
        </Flex>
        <Flex align="center" gap={12}>
          <Button onClick={reset}>重置</Button>
          <Button type="primary" onClick={() => onFilterDataChange({ companyName, creditCode })}>
            搜索
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    border-radius: ${token.borderRadiusLG}px;
    background: ${token.colorBgContainer};
  `,
  itemTitle: css`
    white-space: nowrap;
  `
}))
