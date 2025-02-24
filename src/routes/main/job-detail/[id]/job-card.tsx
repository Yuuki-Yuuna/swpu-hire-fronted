import swpuIcon from '@/assets/swpu-icon.jpg'
import type { JobDetailData } from '@/routes/main/interface'
import { Avatar, Button, Divider, Flex, Space, Tag, theme } from 'antd'
import { createStyles } from 'antd-style'

export interface JobCardProps {
  data?: JobDetailData
}

export const JobCard: React.FC<JobCardProps> = (props) => {
  const { data } = props
  const { jobName, salaryDesc, positionName, locationName, degreeName, showSkills } = data ?? {}

  const { styles } = useStyles()

  const {
    token: { colorError, colorFill }
  } = theme.useToken()

  return (
    <Flex vertical gap={12} flex={4}>
      <Flex vertical className={styles.card}>
        <Flex justify="space-between" flex={1}>
          <Flex vertical gap={12}>
            <Space>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{jobName}</div>
              <div style={{ fontSize: 16, color: colorError }}>{salaryDesc}</div>
            </Space>
            <Space split={<div style={{ color: colorFill }}>|</div>}>
              <div className={styles.infoText}>{positionName ?? jobName}</div>
              <div className={styles.infoText}>{locationName}</div>
              <div className={styles.infoText}>{degreeName}</div>
            </Space>
          </Flex>
          <Space>
            <Button>收藏</Button>
            <Button type="primary">申请</Button>
          </Space>
        </Flex>
        <Divider />
        <Flex gap="large">
          <Avatar src={swpuIcon} size={60} />
          <Flex vertical gap={8} justify="center">
            <div>x先生</div>
            <div>xxx科技有限公司</div>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical className={styles.card}>
        <Flex vertical gap={12} style={{ marginBottom: 16 }}>
          <div>岗位关键词</div>
          <Space wrap>
            {showSkills?.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </Space>
        </Flex>
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: data?.description?.replaceAll('\\n', '<br/>') as string
          }}
        />
      </Flex>
    </Flex>
  )
}

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
