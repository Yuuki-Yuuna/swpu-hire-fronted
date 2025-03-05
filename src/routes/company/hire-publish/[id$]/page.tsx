import { companyApi } from '@/api/company'
import { jobApi } from '@/api/job'
import { cityOptions } from '@/routes/const'
import type { JobData } from '@/routes/interface'
import { useNavigate, useParams } from '@modern-js/runtime/router'
import { useRequest } from 'ahooks'
import {
  Button,
  Cascader,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  message,
  theme
} from 'antd'
import type { SelectProps } from 'antd'
import { createStyles } from 'antd-style'
import { useMemo } from 'react'

interface HirePublishFormData
  extends Omit<JobData, '_id' | 'company' | 'location' | 'locationName' | 'salaryDesc'> {
  salaryExtra?: string
  location: [string, string]
}

const HirePublish = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [form] = Form.useForm<HirePublishFormData>()
  const salaryMin = Form.useWatch('salaryMin', form)
  const salaryMax = Form.useWatch('salaryMax', form)
  const salaryExtra = Form.useWatch('salaryExtra', form)

  const salaryDesc = useMemo(() => {
    let descText = ''
    if (typeof salaryMin !== 'number' || typeof salaryMax !== 'number') {
      return descText
    }
    descText = `${salaryMin}-${salaryMax} K`
    if (salaryExtra) {
      descText += ` · ${salaryExtra}`
    }

    return descText
  }, [salaryMin, salaryMax, salaryExtra])

  const onFinish = async (formValue: HirePublishFormData) => {
    const [provinceLocation, cityLocation] = formValue.location
    const citys = cityOptions.flatMap((opt) => opt.children)
    const location = `${provinceLocation}${cityLocation}`
    const locationName = citys.find((it) => it?.value === cityLocation)?.label as string
    const res = await companyApi.publishHire({
      ...formValue,
      jobId: params.id,
      locationName,
      location,
      salaryDesc
    })

    if (!res.success) {
      message.error(res.message)
    } else {
      message.success('发布成功')
      navigate('/company/hire-job')
    }
  }

  // 获得开局数据
  const { loading } = useRequest(async () => {
    if (!params.id) {
      return
    }
    const { data: formData } = await companyApi.jobDetailByCompany({ id: params.id })
    const { location, salaryDesc, ...rest } = formData
    const locaitonField = [location.slice(0, 6), location.slice(6)]
    const salaryExtra = salaryDesc.includes('·') ? salaryDesc.split(' · ').at(-1) : ''
    form.setFieldsValue({ ...rest, location: locaitonField, salaryExtra })
  })

  const { styles } = useStyles()

  const {
    token: { colorError }
  } = theme.useToken()

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={16} className={styles.container}>
        <div className={styles.title}>岗位发布</div>
        <Form form={form} onFinish={onFinish} name="hire-publish" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="jobName"
                label="岗位名"
                rules={[{ required: true, message: '请输入岗位名' }]}
              >
                <Input placeholder="请输入岗位名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="工作地"
                rules={[{ required: true, message: '请输入工作地' }]}
              >
                <Cascader
                  displayRender={(labels) => labels.at(-1)}
                  options={cityOptions}
                  placeholder="全部城市"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="degreeName"
                label="学历"
                rules={[{ required: true, message: '请输入学历' }]}
              >
                <Select placeholder="请输入学历" options={degreeOptions} allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="showSkills" label="技能">
                <Select mode="tags" placeholder="请添加技能" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                name="salaryMin"
                label="最低薪资(K)"
                rules={[{ required: true, message: '请输入最低薪资' }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="salaryMax"
                label="最高薪资(K)"
                rules={[{ required: true, message: '请输入最高薪资' }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="salaryExtra" label="薪资描述">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <div style={{ marginBottom: 12 }}>薪资</div>
              <div style={{ fontSize: 16, color: colorError }}>{salaryDesc}</div>
            </Col>
          </Row>
          <Form.Item name="description" label="岗位描述">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Flex justify="flex-end">
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Spin>
  )
}

export default HirePublish

const degreeOptions: SelectProps['options'] = [
  { label: '博士', value: '博士' },
  { label: '硕士', value: '硕士' },
  { label: '本科', value: '本科' },
  { label: '大专', value: '大专' }
]

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    border-radius: ${token.borderRadiusLG}px;
    background: ${token.colorBgContainer};
  `,
  title: css`
    font-size: 18px;
    font-weight: 700;
  `
}))
