import { Button, Flex, Input } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export interface ProtocolFilterData {
  studentName: string
  companyName: string
}

export interface ProtocolFilterProps {
  onFilterChange: (filterData: ProtocolFilterData) => void
}

export const ProtocolFilter: React.FC<ProtocolFilterProps> = (props) => {
  const { onFilterChange } = props
  const [studentName, setStudentName] = useState('')
  const [companyName, setCompanyName] = useState('')

  const reset = () => {
    setStudentName('')
    setCompanyName('')
    onFilterChange({ studentName: '', companyName: '' })
  }

  const { styles } = useStyles()

  return (
    <Flex justify="space-between" gap={16} className={styles.container}>
      <Flex align="center" gap={12}>
        <div className={styles.title}>学生名:</div>
        <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} />
      </Flex>
      <Flex align="center" gap={12}>
        <div className={styles.title}>企业名:</div>
        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </Flex>
      <Flex align="center" gap={12}>
        <Button onClick={reset}>重置</Button>
        <Button type="primary" onClick={() => onFilterChange({ studentName, companyName })}>
          搜索
        </Button>
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
  title: css`
    white-space: nowrap;
  `
}))
