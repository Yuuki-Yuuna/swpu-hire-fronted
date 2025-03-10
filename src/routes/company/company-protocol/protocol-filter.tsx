import { Button, Flex, Input } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export interface ProtocolFilterProps {
  onFilterChange: (studentName: string) => void
}

export const ProtocolFilter: React.FC<ProtocolFilterProps> = (props) => {
  const { onFilterChange } = props
  const [studentName, setStudentName] = useState('')

  const reset = () => {
    setStudentName('')
    onFilterChange('')
  }

  const { styles } = useStyles()

  return (
    <Flex justify="space-between" gap={16} className={styles.container}>
      <Flex align="center" gap={12}>
        <div className={styles.title}>学生名:</div>
        <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} />
      </Flex>
      <Flex align="center" gap={12}>
        <Button onClick={reset}>重置</Button>
        <Button type="primary" onClick={() => onFilterChange(studentName)}>
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
