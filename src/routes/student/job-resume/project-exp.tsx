import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Space } from 'antd'
import dayjs from 'dayjs'
import type { ResumeFormData } from './interface'
import { useStyles } from './style'

export interface ProjectExpProps {
  formData?: ResumeFormData
}

export const ProjectExpEditable: React.FC = () => {
  const { styles } = useStyles()

  return (
    <>
      <Row>
        <Col span={10}>
          <Flex vertical gap={16}>
            <div className={styles.title}>项目经历</div>
            <div className={styles.desc}>请填写项目经历</div>
          </Flex>
        </Col>
        <Col span={12}>
          <Form.List name="project">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Flex vertical gap={16}>
                      <Form.Item
                        name={[field.name, 'name']}
                        label="项目名称"
                        rules={[{ required: true, message: '请输入项目名称' }]}
                      >
                        <Input placeholder="请输入项目名称" />
                      </Form.Item>
                      <Form.Item name={[field.name, 'role']} label="项目角色">
                        <Input placeholder="请输入项目角色" />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'timeRange']}
                        label="起止时间"
                        rules={[{ required: true, message: '请输入起止时间' }]}
                      >
                        <DatePicker.RangePicker picker="month" />
                      </Form.Item>
                      <Form.Item name={[field.name, 'link']} label="项目链接">
                        <Input placeholder="请输入项目链接" />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'desc']}
                        label="描述"
                        rules={[{ required: true, message: '请输入项目描述' }]}
                      >
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

export const ProjectExpReadonly: React.FC<ProjectExpProps> = (props) => {
  const { formData } = props
  const { project = [] } = formData ?? {}

  const { styles } = useStyles()

  if (!project.length) {
    return <></>
  }

  return (
    <>
      <div className={styles.title}>项目经历</div>
      {project.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Flex key={index} vertical gap={16} className={styles.block}>
          <Row gutter={16}>
            <Col span={8}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>项目名称</div>
                <div>{item.name}</div>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>项目角色</div>
                <div>{item.role}</div>
              </Space>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>起止时间</div>
                <div>{`${dayjs(item.timeRange[0]).format('YYYY.MM')} ~ ${dayjs(item.timeRange[1]).format('YYYY.MM')}`}</div>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                <div className={styles.itemTitle}>项目链接</div>
                <Button type="link" href={item.link}>
                  {item.link}
                </Button>
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
