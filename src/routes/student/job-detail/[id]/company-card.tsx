import type { JobDetailData } from '@/routes/student/interface'
import { Avatar, Flex, Space, theme } from 'antd'
import { createStyles } from 'antd-style'

export interface CompanyCardProps {
  data?: JobDetailData['company']
}

export const CompanyCard: React.FC<CompanyCardProps> = (props) => {
  const { data } = props
  const { companyLogo, companyName, companyType, companySizeName } = data ?? {}

  const { styles } = useStyles()

  const {
    token: { colorFill }
  } = theme.useToken()

  return (
    <Flex vertical flex={1} style={{ minWidth: 190 }}>
      <Flex vertical align="center" className={styles.card} gap={12}>
        <Avatar src={companyLogo} size={80} />
        <div style={{ fontSize: 16, fontWeight: 700 }}>{companyName}</div>
        <Space split={<div style={{ color: colorFill }}>|</div>}>
          <div className={styles.infoText}>{companyType}</div>
          <div className={styles.infoText}>{companySizeName}</div>
        </Space>
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
