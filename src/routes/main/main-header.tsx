import { userApi } from '@/api/user'
import swpuIcon from '@/assets/swpu-icon.jpg'
import { useResetUserInfo, useUserInfo } from '@/hooks/use-user-info'
import { removeToken } from '@/utils/token'
import { useNavigate } from '@modern-js/runtime/router'
import { Avatar, Button, Image, Layout, Space, theme } from 'antd'

const { Header } = Layout

export const MainHeader: React.FC = () => {
  const navigate = useNavigate()
  const { userInfo } = useUserInfo()
  const resetUserInfo = useResetUserInfo()

  const {
    token: { colorBgContainer, colorFill }
  } = theme.useToken()

  const quit = () => {
    userApi.quit()
    navigate('/login')
    resetUserInfo()
    removeToken()
  }

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        zIndex: 1000,
        top: 0,
        height: 64,
        padding: '12px 32px',
        lineHeight: 'normal',
        background: colorBgContainer
      }}
    >
      <Space size="small" style={{ cursor: 'default' }}>
        <Image src={swpuIcon} preview={false} width={40} height={40} />
        <div style={{ fontSize: 16, fontWeight: 700 }}>西南石油带砖</div>
      </Space>
      <Space split={<div style={{ color: colorFill }}>|</div>}>
        <Space size={4} style={{ cursor: 'default' }}>
          <Avatar size={40} src={userInfo?.avatar || swpuIcon} />
          <div style={{ fontSize: 16 }}>{userInfo?.studentName}</div>
        </Space>
        <Button color="default" variant="link" size="small">
          个人中心
        </Button>
        <Button color="default" variant="link" size="small">
          消息通知
        </Button>
        <Button color="default" variant="link" size="small" onClick={quit}>
          退出
        </Button>
      </Space>
    </Header>
  )
}
