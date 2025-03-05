import { companyApi } from '@/api/company'
import { companyNatureOptions, companySizeOptions } from '@/routes/const'
import { Button, Col, Flex, Form, Input, Row, Select, message } from 'antd'
import type { CompanyFormData, CompanyQualificateProps, QualificateFormData } from './interface'
import { useStyles } from './style'

export const CompanyQualificateEditable: React.FC<
  CompanyQualificateProps & { refresh: () => void }
> = (props) => {
  const { formData, setEditable, refresh } = props

  const { styles } = useStyles()

  const onFinish = async (formValue: CompanyFormData) => {
    const { companySize, companyNature } = formValue
    const companySizeName = companySizeOptions.find((opt) => opt.value === companySize)
      ?.label as string
    const companyNatureName = companyNatureOptions.find((opt) => opt.value === companyNature)
      ?.label as string
    const qualificateValue: QualificateFormData = {
      ...formValue,
      companySizeName,
      companyNatureName
    }

    const res = await companyApi.edit(qualificateValue)
    if (!res.success) {
      message.error(res.message)
    } else {
      refresh()
      message.success('提交审核成功')
      setEditable(false)
    }
  }

  return (
    <Form name="company-qualificate" onFinish={onFinish} layout="vertical" initialValues={formData}>
      <Flex vertical className={styles.container}>
        <div className={styles.title} style={{ marginBottom: 24 }}>
          企业信息
        </div>
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              name="companyName"
              label="企业名称"
              rules={[{ required: true, message: '请输入企业名称' }]}
            >
              <Input placeholder="请输入企业名称" />
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item
              name="companySize"
              label="企业规模"
              rules={[{ required: true, message: '请输入企业规模' }]}
            >
              <Select placeholder="请输入企业规模" options={companySizeOptions} allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              name="companyType"
              label="企业类型"
              rules={[{ required: true, message: '请输入企业类型' }]}
            >
              <Input placeholder="请输入企业类型" />
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item name="address" label="企业地址">
              <Input placeholder="请输入企业地址" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              name="companyNature"
              label="企业性质"
              rules={[{ required: true, message: '请输入企业性质' }]}
            >
              <Select placeholder="请输入企业规模" options={companyNatureOptions} allowClear />
            </Form.Item>
          </Col>
          <Col offset={2} span={11}>
            <Form.Item
              name="creditCode"
              label="社会信用代码"
              rules={[{ required: true, message: '请输入社会信用代码' }]}
            >
              <Input placeholder="请输入社会信用代码" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="简介">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Flex justify="flex-end" gap={16}>
          <Button onClick={() => setEditable(false)}>取消</Button>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Flex>
      </Flex>
    </Form>
  )
}
