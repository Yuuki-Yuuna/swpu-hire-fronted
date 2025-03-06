import { Button, Flex, Input } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export interface InterviewFilterData {
  jobName: string
  companyName: string
}

export interface InterviewFilterProps {
  onFilterChange: (filterData: InterviewFilterData) => void
}

export const InterviewFilter: React.FC<InterviewFilterProps> = (props) => {
  const { onFilterChange } = props

  const [jobName, setJobName] = useState('')
  const [companyName, setCompanyName] = useState('')

  const reset = () => {
    onFilterChange({ jobName: '', companyName: '' })
    setJobName('')
    setCompanyName('')
  }

  const { styles } = useStyles()

  return (
    <Flex gap={16} className={styles.container}>
      <Flex flex={1} align="center" gap={12}>
        <div className={styles.title}>岗位名:</div>
        <Input value={jobName} onChange={(e) => setJobName(e.target.value)} />
      </Flex>
      <Flex flex={1} align="center" gap={12}>
        <div className={styles.title}>企业名:</div>
        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </Flex>
      <Flex align="center" gap={12}>
        <Button onClick={reset}>重置</Button>
        <Button type="primary" onClick={() => onFilterChange({ jobName, companyName })}>
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
