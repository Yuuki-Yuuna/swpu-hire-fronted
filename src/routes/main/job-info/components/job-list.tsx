import { Flex, Space, Tag, theme } from 'antd'
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
}

export interface JobListProps {
  data: Array<JobData>
}

export const JobList: React.FC<JobListProps> = (props) => {
  const { data } = props

  return (
    <Flex vertical>
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
    token: { colorError, colorTextSecondary }
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
    </div>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  jobListItem: css`
    display: flex;
    align-items: center;
    padding: 20px 24px;
    border-radius: ${token.borderRadiusLG}px;
    background: ${token.colorBgContainer};
    cursor: pointer;
  `
}))
