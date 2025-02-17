import swpuIcon from '@/assets/swpu-icon.jpg'
import { RightOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Space, theme } from 'antd'
import { createStyles } from 'antd-style'

const UserCenter = () => {
  const { styles } = useStyles()

  const {
    token: { colorBgContainer, colorFillTertiary }
  } = theme.useToken()

  return (
    <Flex vertical className={styles.container} style={{ background: colorBgContainer }}>
      <Flex vertical gap={16} className={styles.userCard} style={{ background: colorFillTertiary }}>
        <Space size={14}>
          <Avatar src={swpuIcon} size={60} />
          <Space direction="vertical" size={6}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>student</div>
            <div>2025届</div>
          </Space>
        </Space>
        <Flex gap={12}>
          <Flex vertical flex={1} gap={6} className={styles.itemCard}>
            <div className={styles.itemCardTitle}>用户名</div>
            <div>当前用户名为: nameless</div>
          </Flex>
          <Flex vertical flex={1} gap={6} className={styles.itemCard}>
            <div className={styles.itemCardTitle}>
              密码
              <Button type="link" icon={<RightOutlined />} iconPosition="end" style={{ gap: 4 }}>
                修改密码
              </Button>
            </div>
            <div>当前密码等级为: 良好</div>
          </Flex>
        </Flex>
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
  `,
  itemCard: css`
    padding: 16px;
    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
    color: ${token.colorTextTertiary};
  `,
  itemCardTitle: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${token.colorTextBase};
    font-size: 16px;
    font-weight: 700;
  `
}))
