import { studentApi } from '@/api/student'
import swpuIcon from '@/assets/swpu-icon.jpg'
import { useRequest } from 'ahooks'
import { Avatar, Col, Flex, Row, Space, Spin, theme } from 'antd'
import { createStyles } from 'antd-style'

export interface StudentSourceInfo {
  avatar?: string
  studentName: string
  graduationYear: number
  gender: string
  identify: string
  sourceLocation: string
  startTime: string
  endTime: string
  degree: string
  college: string
  major: string
  no: string
  phone: string
}

const EmploymentInfo = () => {
  const { styles } = useStyles()

  const { data, loading } = useRequest(async () => {
    const res = await studentApi.sourceInfo()
    return res.data
  })

  const {
    no,
    avatar,
    studentName,
    gender,
    identify,
    graduationYear,
    sourceLocation,
    startTime,
    endTime,
    degree,
    college,
    major,
    phone
  } = data ?? {}

  const {
    token: { colorFill }
  } = theme.useToken()

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={24} className={styles.container}>
        <div className={styles.title}>生源信息</div>
        <Space>
          <Avatar src={avatar || swpuIcon} size={60} />
          <Flex vertical gap={12}>
            <div style={{ fontWeight: 700 }}>{studentName}</div>
            <Space split={<div style={{ color: colorFill }}>|</div>}>
              <div>{graduationYear}届</div>
              <div>{degree}</div>
              <div>{college}</div>
              <div>{major}</div>
            </Space>
          </Flex>
        </Space>
        <Row gutter={16}>
          <Col span={8} style={{ fontWeight: 700 }}>
            信息内容
          </Col>
          <Col span={8} style={{ fontWeight: 700 }}>
            学生核验
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>姓名</Col>
          <Col span={8}>{studentName}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>性别</Col>
          <Col span={8}>{gender}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>身份证</Col>
          <Col span={8}>{identify}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>生源所在地</Col>
          <Col span={8}>{sourceLocation}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>入学时间</Col>
          <Col span={8}>{startTime}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>毕业时间</Col>
          <Col span={8}>{endTime}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>学历</Col>
          <Col span={8}>{degree}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>所在院系</Col>
          <Col span={8}>{college}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>学校专业</Col>
          <Col span={8}>{major}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>学号</Col>
          <Col span={8}>{no}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>手机号码</Col>
          <Col span={8}>{phone}</Col>
        </Row>
      </Flex>
    </Spin>
  )
}

export default EmploymentInfo

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
  `,
  title: css`
    font-size: 18px;
    font-weight: 700;
  `
}))
