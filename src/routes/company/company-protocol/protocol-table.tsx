import { protocolApi } from '@/api/protocol'
import { SignStatus, signStatusMap } from '@/routes/const'
import { FileOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Modal, Space, Table, Tag, Upload, message } from 'antd'
import type { GetProp, TableProps, UploadFile, UploadProps } from 'antd'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export interface ProtocolTableProps {
  data: ProtocolTableData[]
  loading: boolean
  refresh: () => void
}

export interface ProtocolTableData {
  _id: string
  userId: string
  companyId: string
  studentName: string
  status: SignStatus
  filename: string
  file: string
  updatedAt: string
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const ProtocolTable: React.FC<ProtocolTableProps> = (props) => {
  const { data, loading, refresh } = props

  const columns: TableProps<ProtocolTableData>['columns'] = useMemo(
    () => [
      {
        title: '学生名',
        dataIndex: 'studentName',
        key: 'studentName'
      },
      {
        title: '签约状态',
        dataIndex: 'status',
        key: 'status',
        render: (stauts: SignStatus) => (
          <Tag color={signStatusMap[stauts].color}>{signStatusMap[stauts].text}</Tag>
        )
      },
      {
        title: '操作时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (value) => dayjs(value).format('YYYY-MM-DD')
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) =>
          record.status === SignStatus.Wait ? (
            <OpreationButton {...record} refresh={refresh} />
          ) : (
            <DetailButton {...record} />
          )
      }
    ],
    [refresh]
  )

  return (
    <Table<ProtocolTableData> dataSource={data} columns={columns} loading={loading} rowKey="_id" />
  )
}

const OpreationButton: React.FC<ProtocolTableData & { refresh: () => void }> = (props) => {
  const { userId, refresh } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleOk = async () => {
    if (!fileList.length) {
      return
    }
    setLoading(true)
    const [file] = fileList
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('file', file as FileType)
    const res = await protocolApi.create(formData)
    if (!res.success) {
      message.error(res.message)
    } else {
      refresh()
      message.success('操作成功')
      setOpen(false)
      setFileList([])
    }
    setLoading(false)
  }

  const handleCancel = () => {
    if (loading) {
      return
    }
    setFileList([])
    setOpen(false)
  }

  const onRemove: UploadProps['onRemove'] = (file) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    setFileList([file])
    return false
  }

  return (
    <>
      <Button type="link" onClick={() => setOpen(true)} style={{ padding: 0 }}>
        发起
      </Button>
      <Modal
        centered
        maskClosable={false}
        open={open}
        title="协议操作"
        width={640}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" style={{ marginBottom: 24 }}>
          <div>说明</div>
          <div style={{ fontSize: 12 }}>
            本协议供普通高等学校应届毕业生在与用人单位正式确立劳动人事关系前使用，由甲方（用人单位）和乙方（高校毕业生）在双向选择基础上共同签订，是用人单位确认毕业生信息真实可靠、接收毕业生的重要凭证，也是高校进行毕业生就业管理、编制就业方案及毕业生办理就业手续的重要依据。
          </div>
        </Space>
        <Space direction="vertical">
          <div>三方文件</div>
          <Upload fileList={fileList} beforeUpload={beforeUpload} onRemove={onRemove}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </Space>
      </Modal>
    </>
  )
}

const DetailButton: React.FC<ProtocolTableData> = (props) => {
  const { filename, file } = props
  const [open, setOpen] = useState(false)

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
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
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
