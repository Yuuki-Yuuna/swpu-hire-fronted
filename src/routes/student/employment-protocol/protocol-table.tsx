import { Button, Table } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'

export interface ProtocolTableData {
  _id: string
  userId: string
  companyId: string
  companyName: string
  status: number
  updatedAt: string
}

const columns: TableProps<ProtocolTableData>['columns'] = [
  {
    title: '签约单位',
    dataIndex: 'companyName'
  },
  {
    title: '签约状态',
    dataIndex: 'status'
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    render: (value) => dayjs(value).format('YYYY.MM')
  },
  {
    title: '操作',
    dataIndex: 'opreation',
    render: (_, record) => <Button type="link">详情</Button>
  }
]

export const ProtocolTable: React.FC = () => {
  return <Table columns={columns} />
}
