import { Avatar, Flex, Space, Tag, theme } from 'antd'
import { createStyles } from 'antd-style'

interface JobData {
  jobId: string
  jobName: string
  position: number // 岗位编码
  positionName: string // 岗位名
  location: number // adcode编码
  locationName: string // 城市
  degreeName: string // 学历
  salaryDesc: string // 薪资描述
  showSkills: string[] // 标签
  companyId: string // 企业id
  companyName: string // 企业名称
  companyLogo: string // 企业logo
  compoanySize: number // 企业规模(value)
  companySizeName: string // 企业规模
  companyType: number // 企业类型(value)
  companyTypeName: string // 企业类型
}

export interface JobListProps {
  data: Array<JobData>
}

export const JobList: React.FC<JobListProps> = (props) => {
  const { data } = props

  return (
    <Flex vertical gap="middle">
      {data.map((item) => (
        <JobListItem key={item.jobId} data={item} />
      ))}
    </Flex>
  )
}

interface JobListItemProps {
  data: JobData
}

const JobListItem: React.FC<JobListItemProps> = (props) => {
  const { data } = props

  const {
    token: { colorError, colorTextSecondary, colorFill }
  } = theme.useToken()
  const { styles } = useStyles()

  return (
    <div className={styles.jobListItem}>
      <Flex vertical gap="middle">
        <Space style={{ fontSize: 16, lineHeight: 1.5 }}>
          <div>{data.jobName}</div>
          <div style={{ color: colorError }}>{data.salaryDesc}</div>
        </Space>
        <Flex align="center">
          <div style={{ color: colorTextSecondary, marginRight: 16 }}>{data.locationName}</div>
          <Tag>{data.degreeName}</Tag>
          {data.showSkills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </Flex>
      </Flex>
      <Flex gap="small" style={{ width: 240 }}>
        <Avatar src={data.companyLogo} size={56} />
        <Space direction="vertical">
          <div style={{ fontSize: 16, lineHeight: 1.5 }}>{data.companyName}</div>
          <Space split={<div style={{ color: colorFill }}>|</div>}>
            <div className={styles.componayDesc}>{data.companyTypeName}</div>
            <div className={styles.componayDesc}>{data.companySizeName}</div>
          </Space>
        </Space>
      </Flex>
    </div>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  jobListItem: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-radius: ${token.borderRadiusLG}px;
    background: ${token.colorBgContainer};
    cursor: pointer;
  `,
  componayDesc: css`
    font-size: 12px;
    line-height: 1.5;
    color: ${token.colorTextSecondary};
  `
}))
