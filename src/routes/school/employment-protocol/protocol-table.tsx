import { protocolApi } from '@/api/protocol'
import { SignStatus, signStatusMap } from '@/routes/const'
import { FileOutlined } from '@ant-design/icons'
import { Button, Flex, Modal, Space, Table, Tag, message } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export interface ProtocolTableData {
  _id: string
  userId: string
  companyId: string
  studentName: string
  companyName: string
  status: number
  updatedAt: string
  filename: string
  file: string
}

export interface ProtocolTableProps {
  data: ProtocolTableData[]
  loading: boolean
  refresh: () => void
}

export const ProtocolTable: React.FC<ProtocolTableProps> = (props) => {
  const { data, loading, refresh } = props

  const columns: TableProps<ProtocolTableData>['columns'] = useMemo(
    () => [
      {
        title: '签约学生',
        dataIndex: 'studentName'
      },
      {
        title: '签约单位',
        dataIndex: 'companyName'
      },
      {
        title: '签约状态',
        dataIndex: 'status',
        render: (stauts: SignStatus) => (
          <Tag color={signStatusMap[stauts].color}>{signStatusMap[stauts].text}</Tag>
        )
      },
      {
        title: '操作时间',
        dataIndex: 'updatedAt',
        render: (value) => dayjs(value).format('YYYY-MM-DD')
      },
      {
        title: '操作',
        dataIndex: 'opreation',
        render: (_, record) => <DetailButton {...record} refresh={refresh} />
      }
    ],
    [refresh]
  )

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" />
}

const DetailButton: React.FC<ProtocolTableData & { refresh: () => void }> = (props) => {
  const { _id, status, file, filename, refresh } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOk = async (isApproved: boolean) => {
    setLoading(true)
    const res = await protocolApi.review({ protocolId: _id, isApproved })
    if (!res.success) {
      message.error(res.message)
    } else {
      refresh()
      message.success('操作成功')
      setOpen(false)
    }
    setLoading(false)
  }

  return (
    <>
      <Button type="link" style={{ padding: 0 }} onClick={() => setOpen(true)}>
        详情
      </Button>
      <Modal
        centered
        maskClosable={false}
        open={open}
        title="协议操作"
        width={640}
        confirmLoading={loading}
        onCancel={() => setOpen(false)}
        onOk={() => handleOk(true)}
        okText="同意"
        footer={(_, { OkBtn }) =>
          status === SignStatus.Review && (
            <>
              <Button color="danger" variant="solid" onClick={() => handleOk(false)}>
                拒绝
              </Button>
              <OkBtn />
            </>
          )
        }
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
    </>
  )
}
