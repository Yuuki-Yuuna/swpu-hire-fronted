import { Col, Divider, Flex, Form, Input, Row, Space } from 'antd'
import { useStyles } from './style'

export const SelfEvaluationEditable: React.FC = () => {
  const { styles } = useStyles()

  return (
    <>
      <Row>
        <Col span={10}>
          <Flex vertical gap={16}>
            <div className={styles.title}>自我评价</div>
            <div className={styles.desc}>请填写自我评价</div>
          </Flex>
        </Col>
        <Col span={12}>
          <Form.Item name="selfEvaluation" label="自我评价">
            <Input.TextArea placeholder="请输入自我评价" />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
    </>
  )
}

export const SelfEvaluationReadonly: React.FC = () => {
  const { styles } = useStyles()

  return (
    <>
      <div className={styles.title}>项目经历</div>
      <Flex vertical gap={16} className={styles.block}>
        <Row>
          <Col span={16}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>描述</div>
              <div>爱国哈大概爱德华感觉</div>
            </Space>
          </Col>
        </Row>
      </Flex>
    </>
  )
}
