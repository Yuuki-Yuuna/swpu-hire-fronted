import { companyApi } from '@/api/company'
import type { JobData } from '@/routes/interface'
import { useNavigate } from '@modern-js/runtime/router'
import { Button, Popconfirm, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'

export interface JobTableProps {
  data: JobData[]
  loading: boolean
  refresh: () => void
}

export const JobTable: React.FC<JobTableProps> = (props) => {
  const { data, loading, refresh } = props
  const navigate = useNavigate()

  const columns: TableProps<JobData>['columns'] = useMemo(
    () => [
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
        title: '发布时间',
        dataIndex: 'publishTime',
        key: 'publishTime',
        render: (value) => dayjs(value).format('YYYY-MM-DD')
      },
      {
        title: '投递总数',
        dataIndex: 'candidateTotal',
        key: 'candidateTotal'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 160,
        render: (_, record) => (
          <Space size={12}>
            <Button
              style={{ padding: 0 }}
              type="link"
              onClick={() => navigate(`/company/hire-publish/${record._id}`)}
            >
              编辑
            </Button>
            <Popconfirm
              title="删除岗位"
              description="确认要删除岗位吗？"
              onConfirm={async () => {
                const res = await companyApi.deleteHire({ id: record._id })
                if (!res.success) {
                  message.error(res.message)
                } else {
                  refresh()
                  message.success('删除成功')
                }
              }}
            >
              <Button style={{ padding: 0 }} color="danger" variant="link">
                删除
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    ],
    [navigate, refresh]
  )

  return <Table<JobData> dataSource={data} columns={columns} loading={loading} rowKey="_id" />
}
