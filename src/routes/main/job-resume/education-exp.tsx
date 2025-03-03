import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import { useStyles } from './style'

export const EducationExpEditable: React.FC = () => {
  const { styles } = useStyles()

  return (
    <Row>
      <Col span={10}>
        <Flex vertical gap={16}>
          <div className={styles.title}>教育经历</div>
          <div className={styles.desc}>请填写教育经历</div>
        </Flex>
      </Col>
      <Col span={12}>
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Flex vertical gap={16}>
                    <Form.Item
                      name={[field.name, 'school']}
                      label="学校"
                      rules={[{ required: true, message: '请输入学校' }]}
                    >
                      <Input placeholder="请输入学校" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'degree']}
                      label="学历"
                      rules={[{ required: true, message: '请输入学历' }]}
                    >
                      <Select placeholder="请输入学历" options={degreeOptions} allowClear />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'timeRange']}
                      label="起止时间"
                      rules={[{ required: true, message: '请输入起止时间' }]}
                    >
                      <DatePicker.RangePicker picker="month" />
                    </Form.Item>
                    <Form.Item name={[field.name, 'major']} label="专业">
                      <Input placeholder="请输入专业" />
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
  )
}

export const EducationExpReadonly: React.FC = () => {
  const { styles } = useStyles()

  return (
    <>
      <div className={styles.title}>教育经历</div>
      <Flex vertical gap={16}>
        <Row gutter={16}>
          <Col span={8}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>学校</div>
              <div>西南石油大砖</div>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>专业</div>
              <div>软件工程</div>
            </Space>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>起止时间</div>
              <div>2021.09 ~ 2025.06</div>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical">
              <div className={styles.itemTitle}>学历</div>
              <div>本科</div>
            </Space>
          </Col>
        </Row>
      </Flex>
    </>
  )
}

const degreeOptions: SelectProps['options'] = [
  { label: '博士', value: '博士' },
  { label: '硕士', value: '硕士' },
  { label: '本科', value: '本科' },
  { label: '大专', value: '大专' }
]
