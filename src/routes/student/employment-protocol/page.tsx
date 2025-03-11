import { protocolApi } from '@/api/protocol'
import { useRequest } from 'ahooks'
import { Flex } from 'antd'
import { createStyles } from 'antd-style'
import { ProtocolInfo } from './protocol-info'
import { ProtocolTable } from './protocol-table'

const EmploymentProtocol = () => {
  const {
    data = [],
    loading,
    refresh
  } = useRequest(async () => {
    const res = await protocolApi.list()
    return res.data
  })

  const { styles } = useStyles()

  return (
    <Flex vertical gap={16} className={styles.container}>
      <div className={styles.title}>三方协议</div>
      <ProtocolInfo />
      <ProtocolTable data={data} loading={loading} refresh={refresh} />
    </Flex>
  )
}

export default EmploymentProtocol

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
  `,
  title: css`
    font-size: 18px;
    font-weight: 700;
  `
}))
