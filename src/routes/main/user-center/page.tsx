import { useUserInfo } from '@/hooks/use-user-info'
import { Flex, theme } from 'antd'
import { createStyles } from 'antd-style'
import { UserInfoCard } from './user-info-card'
import { UserOptionCard } from './user-option-card'

const UserCenter = () => {
  const { styles } = useStyles()

  const { userInfo, refresh } = useUserInfo()

  const {
    token: { colorBgContainer, colorFillTertiary }
  } = theme.useToken()

  return (
    <Flex vertical className={styles.container} style={{ background: colorBgContainer }}>
      <Flex vertical gap={16} className={styles.userCard} style={{ background: colorFillTertiary }}>
        <UserInfoCard userInfo={userInfo} refreshUserInfo={refresh} />
        <UserOptionCard userInfo={userInfo} />
      </Flex>
    </Flex>
  )
}

export default UserCenter

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    border-radius: ${token.borderRadiusLG}px;
    cursor: default;
  `,
  userCard: css`
    padding: 24px;
    border-radius: ${token.borderRadiusLG}px;
    font-size: 14px;
    line-height: 1.5;
  `
}))
