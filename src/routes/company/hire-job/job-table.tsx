import { Table } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'

interface JobHireInfo {
  jobName: string
  location: number // adcode编码
  locationName: string // 城市
  publishTime: number // 发布时间
  publisher: unknown // 发布人
  candidateTotal: number // 投递总数
}

const columns: TableProps<JobHireInfo>['columns'] = [
  {
    title: '职位名',
    dataIndex: 'jobName',
    key: 'jobName'
  },
  {
    title: '城市',
    dataIndex: 'locationName',
    key: 'locationName'
  },
  {
    title: '发布人',
    dataIndex: 'publisher',
    key: 'publisher'
  },
  {
    title: '发布时间',
    dataIndex: 'publishTime',
    key: 'publishTime',
    render: (value) => dayjs(value).format('YYYY-MM-DD')
  },
  {
    title: '投递总数',
    dataIndex: 'candidateTotal',
    key: 'candidateTotal'
  }
]

export const JobTable: React.FC = () => {
  return <Table<JobHireInfo> columns={columns} />
}
