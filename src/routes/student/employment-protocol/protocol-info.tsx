import { Button, Flex, Space } from 'antd'
import { createStyles } from 'antd-style'

export const ProtocolInfo: React.FC = () => {
  const { styles } = useStyles()

  return (
    <>
      <Flex align="center">
        <div className={styles.itemTitle}>协议书编号：</div>
        <div>abcdefg</div>
      </Flex>
      <Flex align="center">
        <div className={styles.itemTitle}>协议书状态:</div>
        <div>已签约</div>
      </Flex>
      <Flex align="center">
        <div className={styles.itemTitle}>签约单位:</div>
        <div>单位A</div>
      </Flex>
      <Space size="large">
        <Button type="primary" style={{ width: 100 }}>
          申请解约
        </Button>
        <Button type="primary" style={{ width: 100 }}>
          下载原件
        </Button>
        <Button type="primary" style={{ width: 100 }}>
          详情
        </Button>
      </Space>
    </>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  itemTitle: css`
    width: 100px;
  `
}))
