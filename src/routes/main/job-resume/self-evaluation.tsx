import { Col, Divider, Flex, Form, Input, Row, Space } from 'antd'
import type { ResumeFormData } from './interface'
import { useStyles } from './style'

export interface SelfEvaluationProps {
  formData?: ResumeFormData
}

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
            <Input.TextArea autoSize={{ minRows: 4 }} placeholder="请输入自我评价" />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
    </>
  )
}

export const SelfEvaluationReadonly: React.FC<SelfEvaluationProps> = (props) => {
  const { formData } = props
  const { selfEvaluation } = formData ?? {}

  const { styles } = useStyles()

  if (!selfEvaluation) {
    return <></>
  }

  return (
    <>
      <div className={styles.title}>个人总结</div>
      <Flex vertical gap={16} className={styles.block}>
        <Row>
          <Col span={16}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>描述</div>
              <div>{selfEvaluation}</div>
            </Space>
          </Col>
        </Row>
      </Flex>
    </>
  )
}
