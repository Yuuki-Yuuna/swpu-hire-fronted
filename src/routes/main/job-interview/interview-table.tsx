import { interviewApi } from '@/api/interview'
import { useRequest } from 'ahooks'
import { Table, Tag } from 'antd'
import type { TableProps } from 'antd'

enum ApplyStatus {
  End = 0, // 流程结束
  Apply = 1, // 已申请
  Interview = 2, // 面试中
  Evaluation = 3, // 录用评估
  Hire = 4 // 通过
}

export interface InterviewInfo {
  _id: string
  jobName: string
  companyName: string
  applyTime: number
  status: ApplyStatus // 状态
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
  }
]

export const InterviewTable: React.FC = () => {
  const { data, loading } = useRequest(async () => {
    const res = await interviewApi.info()
    return res.data
  })

  const { list } = data ?? {}

  return (
    <Table<InterviewInfo>
      bordered
      rowKey="_id"
      loading={loading}
      columns={columns}
      dataSource={list}
    />
  )
}

const applyStatusMap = {
  [ApplyStatus.End]: { text: '流程结束', color: '#909399' },
  [ApplyStatus.Apply]: { text: '已投递', color: 'gold' },
  [ApplyStatus.Interview]: { text: '面试中', color: 'blue' },
  [ApplyStatus.Evaluation]: { text: '录用评估', color: 'cyan' },
  [ApplyStatus.Hire]: { text: '已录用', color: 'success' }
}
