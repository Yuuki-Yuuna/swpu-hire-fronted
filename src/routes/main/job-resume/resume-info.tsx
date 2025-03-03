import { Col, Flex, Form, Input, Row, Space } from 'antd'
import { useStyles } from './style'

export const ResumeInfoEditable: React.FC = () => {
  const { styles } = useStyles()

  return (
    <Row>
      <Col span={10}>
        <Flex vertical gap={16}>
          <div className={styles.title}>基础信息</div>
          <div className={styles.desc}>请填写基本信息</div>
        </Flex>
      </Col>
      <Col span={12}>
        <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="姓名" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[{ required: true, message: '请输入手机号码' }]}
        >
          <Input placeholder="手机号码" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="identify"
          label="身份证"
          rules={[{ required: true, message: '请输入身份证' }]}
        >
          <Input placeholder="身份证" />
        </Form.Item>
      </Col>
    </Row>
  )
}

export const ResumeInfoReadonly: React.FC = () => {
  const { styles } = useStyles()

  return (
    <>
      <div className={styles.title}>基础信息</div>
      <Flex vertical gap={16}>
        <Row gutter={16}>
          <Col span={8}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>姓名</div>
              <div>张三</div>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>手机号码</div>
              <div>130xxxxxxxx</div>
            </Space>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>邮箱</div>
              <div>1234256325@qq.com</div>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>身份证</div>
              <div>510402200101010002</div>
            </Space>
          </Col>
        </Row>
      </Flex>
    </>
  )
}
