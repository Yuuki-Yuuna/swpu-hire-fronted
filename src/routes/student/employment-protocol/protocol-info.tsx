import { protocolApi } from '@/api/protocol'
import { SignStatus } from '@/routes/const'
import { FileOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Flex, Modal, Space } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export const ProtocolInfo: React.FC = () => {
  const { data } = useRequest(async () => {
    const res = await protocolApi.signInfo()
    return res.data
  })
  const { _id, status, companyName, file, filename } = data ?? {}

  const [open, setOpen] = useState(false)

  const { styles } = useStyles()

  return (
    <>
      <Flex align="center">
        <div className={styles.itemTitle}>协议书编号：</div>
        <div>{_id}</div>
      </Flex>
      <Flex align="center">
        <div className={styles.itemTitle}>协议书状态:</div>
        <div>{status === SignStatus.Done ? '已签约' : '未签约'}</div>
      </Flex>
      <Flex align="center">
        <div className={styles.itemTitle}>签约单位:</div>
        <div>{companyName}</div>
      </Flex>
      <Space size="large">
        <Button type="primary" style={{ width: 100 }}>
          申请解约
        </Button>
        <a href={file}>
          <Button type="primary" style={{ width: 100 }}>
            下载原件
          </Button>
        </a>
        <Button type="primary" style={{ width: 100 }} onClick={() => setOpen(true)}>
          详情
        </Button>
        <Modal
          centered
          maskClosable={false}
          open={open}
          title="协议操作"
          width={640}
          onCancel={() => setOpen(false)}
          okText="同意"
          footer={() => <></>}
        >
          <Space direction="vertical" style={{ marginBottom: 24 }}>
            <div>说明</div>
            <div style={{ fontSize: 12 }}>
              本协议供普通高等学校应届毕业生在与用人单位正式确立劳动人事关系前使用，由甲方（用人单位）和乙方（高校毕业生）在双向选择基础上共同签订，是用人单位确认毕业生信息真实可靠、接收毕业生的重要凭证，也是高校进行毕业生就业管理、编制就业方案及毕业生办理就业手续的重要依据。
            </div>
          </Space>
          <Space direction="vertical" size="large">
            <div>三方文件：</div>
            {file && (
              <a href={file}>
                <Flex vertical justify="center" align="center" gap={8}>
                  <FileOutlined style={{ fontSize: 32 }} />
                  <div style={{ fontSize: 12 }}>{filename}</div>
                </Flex>
              </a>
            )}
          </Space>
        </Modal>
      </Space>
    </>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  itemTitle: css`
    width: 100px;
  `
}))
