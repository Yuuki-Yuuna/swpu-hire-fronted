import { resumeApi } from '@/api/resume'
import { useRequest } from 'ahooks'
import { Button, Col, Flex, Form, Row, Spin, message } from 'antd'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { useState } from 'react'
import { IntershipExpEditable, IntershipExpReadonly } from './Internship-exp'
import { EducationExpEditable, EducationExpReadonly } from './education-exp'
import type { ResumeFormData } from './interface'
import { ProjectExpEditable, ProjectExpReadonly } from './project-exp'
import { ResumeInfoEditable, ResumeInfoReadonly } from './resume-info'
import { SelfEvaluationEditable, SelfEvaluationReadonly } from './self-evaluation'
import { useStyles } from './style'

const JobResume = () => {
  const [editable, setEditable] = useState(false)

  const {
    data: formData,
    loading,
    refresh
  } = useRequest(async () => {
    const res = await resumeApi.info()
    return transformRangeTime(res.data, 'dayjs')
  })

  return (
    <Spin spinning={loading}>
      {editable ? (
        <JobResumeEditable formData={formData} refresh={refresh} setEditable={setEditable} />
      ) : (
        <JobResumeReadonly formData={formData} refresh={refresh} setEditable={setEditable} />
      )}
    </Spin>
  )
}

export default JobResume

interface JobResumeProps {
  formData?: ResumeFormData
  refresh: () => void
  setEditable: React.Dispatch<React.SetStateAction<boolean>>
}
const JobResumeEditable: React.FC<JobResumeProps> = (props) => {
  const { formData, refresh, setEditable } = props

  const { styles } = useStyles()

  const onFinish = async (formValue: ResumeFormData) => {
    const res = await resumeApi.edit(transformRangeTime(formValue, 'timestamp'))
    if (!res.success) {
      message.error(res.message)
    } else {
      refresh()
      message.success('更新成功')
      setEditable(false)
    }
  }

  return (
    <Form<ResumeFormData>
      name="resume"
      layout="vertical"
      onFinish={onFinish}
      initialValues={formData}
    >
      <Flex vertical className={styles.container} gap={24}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>编辑简历</div>
        <ResumeInfoEditable />
        <EducationExpEditable />
        <IntershipExpEditable />
        <ProjectExpEditable />
        <SelfEvaluationEditable />
        <Row>
          <Col offset={10} span={12}>
            <Flex justify="flex-end" gap={16}>
              <Button onClick={() => setEditable(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Flex>
          </Col>
        </Row>
      </Flex>
    </Form>
  )
}

const JobResumeReadonly: React.FC<JobResumeProps> = (props) => {
  const { formData, setEditable } = props

  const { styles } = useStyles()

  return (
    <Flex vertical className={styles.container} gap={24}>
      <Flex justify="space-between">
        <div style={{ fontSize: 20, fontWeight: 700 }}>我的简历</div>
        <Button onClick={() => setEditable(true)}>编辑简历</Button>
      </Flex>
      <ResumeInfoReadonly formData={formData} />
      <EducationExpReadonly formData={formData} />
      <IntershipExpReadonly formData={formData} />
      <ProjectExpReadonly formData={formData} />
      <SelfEvaluationReadonly formData={formData} />
    </Flex>
  )
}

// dayjs和timestamp互转
const transformRangeTime = (formData: ResumeFormData, type: 'timestamp' | 'dayjs') => {
  const formValue = cloneDeep(formData)
  for (const key of Object.keys(formValue)) {
    const formItemValue = formValue[key as keyof ResumeFormData]
    if (Array.isArray(formItemValue)) {
      for (const item of formItemValue) {
        const [startTime, endTime] = item.timeRange
        const tansfTimestamp = type === 'timestamp'
        item.timeRange[0] = tansfTimestamp ? startTime.valueOf() : dayjs(startTime)
        item.timeRange[1] = tansfTimestamp ? endTime.valueOf() : dayjs(endTime)
      }
    }
  }

  return formValue
}
