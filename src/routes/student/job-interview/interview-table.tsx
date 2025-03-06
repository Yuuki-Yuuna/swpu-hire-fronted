import { type ApplyStatus, applyStatusMap } from '@/routes/const'
import { useNavigate } from '@modern-js/runtime/router'
import { Button, Flex, Modal, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { useState } from 'react'

export interface InterviewInfo {
  _id: string
  jobId: string
  jobName: string
  companyName: string
  applyTime: number
  status: ApplyStatus // 状态
  description?: string
}

const columns: TableProps<InterviewInfo>['columns'] = [
  {
    title: '职位名',
    dataIndex: 'jobName',
    key: 'jobName'
  },
  {
    title: '企业名',
    dataIndex: 'companyName',
    key: 'companyName'
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    key: 'applyTime',
    render: (value) => new Date(value).toLocaleDateString()
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const { text, color } = applyStatusMap[status as ApplyStatus]
      return <Tag color={color}>{text}</Tag>
    }
  },
  {
    title: '操作',
    dataIndex: 'opreation',
    render: (_, record) => <DetailButton {...record} />
  }
]

export interface InterviewTableProps {
  data: InterviewInfo[]
  loading: boolean
}

export const InterviewTable: React.FC<InterviewTableProps> = (props) => {
  const { data, loading } = props

  return (
    <Table<InterviewInfo>
      bordered
      rowKey="_id"
      loading={loading}
      columns={columns}
      dataSource={data}
    />
  )
}

const DetailButton: React.FC<InterviewInfo> = (props) => {
  const { jobId, status, description } = props
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Space size={16}>
        <Button type="link" style={{ padding: 0 }} onClick={() => setOpen(true)}>
          详情
        </Button>
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => navigate(`/student/job-detail/${jobId}`)}
        >
          预览
        </Button>
      </Space>

      <Modal
        centered
        destroyOnClose
        title="面试状态"
        open={open}
        onCancel={() => setOpen(false)}
        width={640}
      >
        <Flex vertical gap={16}>
          <Space>
            <div>面试状态：</div>
            <Tag color={applyStatusMap[status].color}>{applyStatusMap[status].text}</Tag>
          </Space>
          <Space direction="vertical">
            <div>额外信息：</div>
            <div style={{ whiteSpace: 'pre-line' }}>{description}</div>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}
