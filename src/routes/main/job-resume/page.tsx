import { Button, Col, Flex, Form, Row, message } from 'antd'
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
  const [formData, setFormData] = useState<ResumeFormData>()

  return editable ? (
    <JobResumeEditable formData={formData} setFormData={setFormData} setEditable={setEditable} />
  ) : (
    <JobResumeReadonly formData={formData} setFormData={setFormData} setEditable={setEditable} />
  )
}

export default JobResume

interface JobResumeProps {
  formData?: ResumeFormData
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData | undefined>>
  setEditable: React.Dispatch<React.SetStateAction<boolean>>
}
const JobResumeEditable: React.FC<JobResumeProps> = (props) => {
  const { formData, setFormData, setEditable } = props

  const { styles } = useStyles()

  const onFinish = (formValue: ResumeFormData) => {
    /** */
    console.log(formValue)
    setFormData(formValue)
    setEditable(false)
    message.success('更新成功')
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
  const { setEditable } = props

  const { styles } = useStyles()

  return (
    <Flex vertical className={styles.container} gap={24}>
      <Flex justify="space-between">
        <div style={{ fontSize: 20, fontWeight: 700 }}>我的简历</div>
        <Button onClick={() => setEditable(true)}>编辑简历</Button>
      </Flex>
      <ResumeInfoReadonly />
      <EducationExpReadonly />
      <IntershipExpReadonly />
      <ProjectExpReadonly />
      <SelfEvaluationReadonly />
    </Flex>
  )
}
