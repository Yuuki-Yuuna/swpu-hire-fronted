import { Button, Col, Flex, Row, Space, Tag } from 'antd'
import type { CompanyQualificateProps } from './interface'
import { useStyles } from './style'

export const CompanyQualificateReadonly: React.FC<CompanyQualificateProps> = (props) => {
  const { formData, setEditable } = props
  const {
    companyName,
    companySizeName,
    companyType,
    companyNatureName,
    address,
    creditCode,
    description,
    isExamine
  } = formData ?? {}

  const { styles } = useStyles()

  return (
    <Flex vertical className={styles.container}>
      <Flex justify="space-between" style={{ marginBottom: 24 }}>
        <Space size="large">
          <div className={styles.title}>企业信息</div>
          {isExamine && <Tag color="processing">信息审核中</Tag>}
        </Space>
        <Button disabled={isExamine} onClick={() => setEditable(true)}>
          编辑
        </Button>
      </Flex>
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
    </Flex>
  )
}
