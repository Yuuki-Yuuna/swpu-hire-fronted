import { Flex, theme } from 'antd'
import { createStyles } from 'antd-style'
import { InterviewTable } from './interview-table'

const JobInterview = () => {
  const { styles } = useStyles()

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Flex vertical className={styles.container} style={{ background: colorBgContainer }}>
      <InterviewTable />
    </Flex>
  )
}

export default JobInterview

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    border-radius: ${token.borderRadiusLG}px;
    cursor: default;
  `
}))
