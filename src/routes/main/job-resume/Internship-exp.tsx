import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Space } from 'antd'
import dayjs from 'dayjs'
import type { ResumeFormData } from './interface'
import { useStyles } from './style'

export interface IntershipExpProps {
  formData?: ResumeFormData
}

export const IntershipExpEditable: React.FC = () => {
  const { styles } = useStyles()

  return (
    <>
      <Row>
        <Col span={10}>
          <Flex vertical gap={16}>
            <div className={styles.title}>实习经历</div>
            <div className={styles.desc}>请填写实习经历</div>
          </Flex>
        </Col>
        <Col span={12}>
          <Form.List name="intership">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Flex vertical gap={16}>
                      <Form.Item
                        name={[field.name, 'company']}
                        label="公司"
                        rules={[{ required: true, message: '请输入公司' }]}
                      >
                        <Input placeholder="请输入公司" />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'position']}
                        label="职位"
                        rules={[{ required: true, message: '请输入职位' }]}
                      >
                        <Input placeholder="请输入职位" />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'timeRange']}
                        label="起止时间"
                        rules={[{ required: true, message: '请输入起止时间' }]}
                      >
                        <DatePicker.RangePicker picker="month" />
                      </Form.Item>
                      <Form.Item name={[field.name, 'desc']} label="描述">
                        <Input.TextArea autoSize={{ minRows: 4 }} placeholder="请输入描述" />
                      </Form.Item>
                    </Flex>
                    <Flex vertical align="flex-end">
                      <Button
                        color="default"
                        variant="link"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(index)}
                      />
                      <Divider />
                    </Flex>
                  </div>
                ))}
                <Button size="small" type="link" icon={<PlusOutlined />} onClick={() => add()}>
                  添加
                </Button>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
      <Divider />
    </>
  )
}

export const IntershipExpReadonly: React.FC<IntershipExpProps> = (props) => {
  const { formData } = props
  const { intership = [] } = formData ?? {}

  const { styles } = useStyles()

  if (!intership.length) {
    return <></>
  }

  return (
    <>
      <div className={styles.title}>实习经历</div>
      {intership.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Flex key={index} vertical gap={16} className={styles.block}>
          <Row gutter={16}>
            <Col span={8}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>公司</div>
                <div>{item.company}</div>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>起止时间</div>
                <div>{`${dayjs(item.timeRange[0]).format('YYYY.MM')} ~ ${dayjs(item.timeRange[1]).format('YYYY.MM')}`}</div>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>职位</div>
                <div>{item.position}</div>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>描述</div>
                <div className={styles.textArea}>{item.desc}</div>
              </Space>
            </Col>
          </Row>
        </Flex>
      ))}
    </>
  )
}
