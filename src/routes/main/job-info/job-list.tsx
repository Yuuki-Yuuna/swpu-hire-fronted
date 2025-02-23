import { Avatar, Flex, Pagination, Space, Tag, theme } from 'antd'
import { createStyles } from 'antd-style'

export interface JobData {
  _id: string
  jobName: string
  position: number // 岗位编码
  positionName: string // 岗位名
  location: number // adcode编码
  locationName: string // 城市
  degreeName: string // 学历
  salaryDesc: string // 薪资描述
  showSkills: string[] // 标签
  company: {
    companyId: string // 企业id
    companyName: string // 企业名称
    companyLogo: string // 企业logo
    compoanySize: number // 企业规模(value)
    companySizeName: string // 企业规模
    companyType: number // 企业类型(value)
    companyTypeName: string // 企业类型
  }
}

export interface JobListProps {
  pagination: { current: number; pageSize: number; total: number }
  data: { list: Array<JobData>; total: number }
}

export const JobList: React.FC<JobListProps> = (props) => {
  const {
    data: { list },
    pagination
  } = props

  return (
    <Flex vertical gap="middle">
      {list.map((item) => (
        <JobListItem key={item._id} data={item} />
      ))}
      <Pagination align="center" {...pagination} />
    </Flex>
  )
}

interface JobListItemProps {
  data: JobData
}

const JobListItem: React.FC<JobListItemProps> = (props) => {
  const { data } = props
  const { jobName, salaryDesc, locationName, degreeName, company } = data

  const {
    token: { colorError, colorTextSecondary, colorFill }
  } = theme.useToken()
  const { styles } = useStyles()

  return (
    <div className={styles.jobListItem}>
      <Flex vertical gap="middle">
        <Space style={{ fontSize: 16, lineHeight: 1.5 }}>
          <div>{jobName}</div>
          <div style={{ color: colorError }}>{salaryDesc}</div>
        </Space>
        <Flex align="center">
          <div style={{ color: colorTextSecondary, marginRight: 16 }}>{locationName}</div>
          <Tag>{degreeName}</Tag>
          {data.showSkills.slice(0, 3).map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </Flex>
      </Flex>
      <Flex gap="small" style={{ width: 240 }}>
        <Avatar src={company.companyLogo} size={56} />
        <Space direction="vertical">
          <div style={{ fontSize: 16, lineHeight: 1.5 }}>{company.companyName}</div>
          <Space split={<div style={{ color: colorFill }}>|</div>}>
            <div className={styles.componayDesc}>{company.companyTypeName}</div>
            <div className={styles.componayDesc}>{company.companySizeName}</div>
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
