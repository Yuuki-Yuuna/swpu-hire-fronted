import { schoolApi } from '@/api/school'
import type { CompanyData } from '@/routes/interface'
import { Button, Col, Flex, Modal, Row, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { createStyles } from 'antd-style'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export type CompanyTableData = CompanyData & { createAt: string }

export interface CompanyTableProps {
  data: CompanyTableData[]
  loading: boolean
  refresh: () => void
}

export const CompanyTable: React.FC<CompanyTableProps> = (props) => {
  const { data, loading, refresh } = props

  const columns: TableProps<CompanyTableData>['columns'] = useMemo(
    () => [
      {
        title: '企业名',
        dataIndex: 'companyName',
        key: 'companyName'
      },
      {
        title: '企业类型',
        dataIndex: 'companyType',
        key: 'companyType'
      },
      {
        title: '企业规模',
        dataIndex: 'companySizeName',
        key: 'companySizeName'
      },
      {
        title: '企业性质',
        dataIndex: 'companyNatureName',
        key: 'companyNatureName'
      },
      {
        title: '申请时间',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (value) => dayjs(value).format('YYYY-MM-DD')
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) => <CompanyTableDetail data={record} refresh={refresh} />
      }
    ],
    [refresh]
  )

  return (
    <Table<CompanyTableData> rowKey="_id" columns={columns} dataSource={data} loading={loading} />
  )
}

interface CompanyTableDetailProps {
  data: CompanyTableData
  refresh: () => void
}

const CompanyTableDetail: React.FC<CompanyTableDetailProps> = (props) => {
  const { data, refresh } = props
  const {
    _id,
    companyName,
    companySizeName,
    companyType,
    companyNatureName,
    address,
    creditCode,
    description
  } = data

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOk = async (isApproved: boolean) => {
    setLoading(true)
    const res = await schoolApi.reviewExamine({ companyId: _id, isApproved })
    if (!res.success) {
      message.success(res.message)
    } else {
      refresh()
      message.success('操作成功')
      setIsOpen(false)
    }
    setLoading(false)
  }

  const { styles } = useStyles()

  return (
    <>
      <Button type="link" onClick={() => setIsOpen(true)}>
        详情
      </Button>
      <Modal
        title="企业详情"
        centered
        maskClosable={false}
        open={isOpen}
        confirmLoading={loading}
        onOk={() => handleOk(true)}
        onCancel={() => setIsOpen(false)}
        okText="通过"
        footer={(_, { OkBtn }) => (
          <>
            <Button color="danger" variant="solid" onClick={() => handleOk(false)}>
              退回
            </Button>
            <OkBtn />
          </>
        )}
      >
        <Flex vertical gap={16}>
          <Row gutter={16}>
            <Col span={11}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>企业名称</div>
                <div>{companyName}</div>
              </Space>
            </Col>
            <Col offset={2} span={11}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>企业规模</div>
                <div>{companySizeName}</div>
              </Space>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={11}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>企业类型</div>
                <div>{companyType}</div>
              </Space>
            </Col>
            <Col offset={2} span={11}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>企业性质</div>
                <div>{companyNatureName}</div>
              </Space>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={11}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>企业地址</div>
                <div>{address}</div>
              </Space>
            </Col>
            <Col offset={2} span={11}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>社会信用代码</div>
                <div>{creditCode}</div>
              </Space>
            </Col>
          </Row>
          <Space direction="vertical">
            <div className={styles.itemTitle}>简介</div>
            <div style={{ whiteSpace: 'pre-line' }}>{description}</div>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  itemTitle: css`
    color: ${token.colorTextTertiary}
  `
}))
