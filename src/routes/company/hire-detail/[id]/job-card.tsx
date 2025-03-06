import { interviewApi } from '@/api/interview'
import type { InterviewInfo } from '@/routes/company/hire-interview/interview-table'
import { type ApplyStatus, applyStatusMap } from '@/routes/const'
import type { JobData } from '@/routes/interface'
import { useNavigate } from '@modern-js/runtime/router'
import { Badge, Button, Flex, Form, Input, Modal, Select, Space, Tag, message, theme } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export interface JobCardProps {
  data?: JobData
  interview?: InterviewInfo
  refresh: () => void
}

export const JobCard: React.FC<JobCardProps> = (props) => {
  const { data, interview, refresh } = props
  const { jobName, salaryDesc, locationName, degreeName, showSkills } = data ?? {}
  const applyStatus = interview?.status !== undefined ? applyStatusMap[interview.status] : null
  const navigate = useNavigate()

  const { styles } = useStyles()

  const {
    token: { colorError, colorFill }
  } = theme.useToken()

  return (
    <Flex vertical gap={12} flex={3}>
      <Badge.Ribbon text={applyStatus?.text} color={applyStatus?.color}>
        <Flex vertical className={styles.card}>
          <Flex justify="space-between" flex={1}>
            <Flex vertical gap={12}>
              <Space>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{jobName}</div>
                <div style={{ fontSize: 16, color: colorError }}>{salaryDesc}</div>
              </Space>
              <Space split={<div style={{ color: colorFill }}>|</div>}>
                <div className={styles.infoText}>{jobName}</div>
                <div className={styles.infoText}>{locationName}</div>
                <div className={styles.infoText}>{degreeName}</div>
              </Space>
            </Flex>
            <Space>
              <Button onClick={() => navigate('/company/hire-interview')}>返回</Button>
              <ApplyStatusButton interview={interview} refresh={refresh} />
            </Space>
          </Flex>
        </Flex>
      </Badge.Ribbon>
      <Flex vertical className={styles.card}>
        <Flex vertical gap={12} style={{ marginBottom: 16 }}>
          <div>岗位关键词</div>
          <Space wrap>
            {showSkills?.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </Space>
        </Flex>
        <div style={{ whiteSpace: 'pre-line' }}>{data?.description}</div>
      </Flex>
    </Flex>
  )
}

export interface ApplyProcess {
  status: ApplyStatus
  description?: string
}

const ApplyStatusButton: React.FC<{ interview?: InterviewInfo; refresh: () => void }> = (props) => {
  const { interview, refresh } = props
  const [open, setOpen] = useState(false)

  const onFinish = async (formValue: ApplyProcess) => {
    if (!interview) {
      return
    }
    const { jobId, userId: studentId } = interview
    const res = await interviewApi.applyProcess({ jobId, studentId, ...formValue })
    if (!res.success) {
      message.error(res.message)
    } else {
      message.success('修改成功')
      refresh()
      setOpen(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        处理
      </Button>
      <Modal
        centered
        destroyOnClose
        maskClosable={false}
        width={640}
        title="流程处理"
        open={open}
        onCancel={() => setOpen(false)}
        okButtonProps={{ htmlType: 'submit' }}
        modalRender={(dom) => (
          <Form
            name="interviewStatus"
            layout="vertical"
            onFinish={onFinish}
            initialValues={interview}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="status"
          label="面试状态"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Select placeholder="流转面试状态" options={statusOptions} style={{ width: 160 }} />
        </Form.Item>
        <Form.Item name="description" label="附加信息">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Modal>
    </>
  )
}

const statusOptions = Object.entries(applyStatusMap).map(([status, { text }]) => ({
  value: Number.parseInt(status),
  label: text
}))

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    padding: 24px;
    background: ${token.colorBgContainer};
    box-shadow: ${token.boxShadowTertiary};
    border-radius: ${token.borderRadiusLG}px;
    cursor: default;
  `,
  infoText: css`
    color: ${token.colorTextSecondary};
  `
}))
