import { Button, Flex, Input } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export interface JobFilterProps {
  onFilterChange: (jobName: string) => void
}

export const JobFilter: React.FC<JobFilterProps> = (props) => {
  const { onFilterChange } = props
  const [jobName, setJobName] = useState('')

  const reset = () => {
    setJobName('')
    onFilterChange('')
  }

  const { styles } = useStyles()

  return (
    <Flex justify="space-between" gap={16} className={styles.container}>
      <Flex align="center" gap={12}>
        <div className={styles.title}>岗位名:</div>
        <Input value={jobName} onChange={(e) => setJobName(e.target.value)} />
      </Flex>
      <Flex align="center" gap={12}>
        <Button onClick={reset}>重置</Button>
        <Button type="primary" onClick={() => onFilterChange(jobName)}>
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
