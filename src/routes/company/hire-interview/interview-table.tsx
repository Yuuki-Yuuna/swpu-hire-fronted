import type { StudentUserInfo } from '@/hooks/use-user-info'
import { type ApplyStatus, applyStatusMap } from '@/routes/const'
import { useNavigate } from '@modern-js/runtime/router'
import { Button, Table, Tag } from 'antd'
import type { TableProps } from 'antd'

export interface InterviewInfo {
  _id: string
  userId: string
  jobId: string
  jobName: string
  companyName: string
  applyTime: number
  status: ApplyStatus // 状态
  description?: string
  student: StudentUserInfo
}

const columns: TableProps<InterviewInfo>['columns'] = [
  {
    title: '职位名',
    dataIndex: 'jobName',
    key: 'jobName'
  },
  {
    title: '候选人',
    dataIndex: 'student',
    key: 'student',
    render: (value: StudentUserInfo) => value.studentName
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
  const { jobId, userId } = props
  const navigate = useNavigate()
  return (
    <Button
      type="link"
      style={{ padding: 0 }}
      onClick={() => navigate(`/company/hire-detail/${jobId}?userId=${userId}`)}
    >
      详情
    </Button>
  )
}
