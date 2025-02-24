import type { JobData } from '@/routes/main/interface'
import { useNavigate } from '@modern-js/runtime/router'
import { Avatar, Flex, Pagination, Space, Tag, theme } from 'antd'
import { createStyles } from 'antd-style'

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
  const { _id, jobName, salaryDesc, locationName, degreeName, company } = data

  const navigate = useNavigate()

  const {
    token: { colorError, colorTextSecondary, colorFill }
  } = theme.useToken()
  const { styles } = useStyles()

  const toJobDetail = () => {
    navigate(`/main/job-detail/${_id}`)
  }

  return (
    <div className={styles.jobListItem} onClick={toJobDetail}>
      <Flex vertical gap="middle">
        <Space style={{ fontSize: 16 }}>
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
          <div style={{ fontSize: 16 }}>{company.companyName}</div>
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
    color: ${token.colorTextSecondary};
  `
}))
