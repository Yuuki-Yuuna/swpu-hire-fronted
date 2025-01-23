import miku from '@/assets/sakura-miku.jpg'
import swpuIcon from '@/assets/swpu-icon.jpg'
import { Avatar, Button, Image, Layout, Space, theme } from 'antd'

const { Header } = Layout

export const MainHeader: React.FC = () => {
  const {
    token: { colorBgContainer, colorFill }
  } = theme.useToken()

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 64,
        padding: '12px 32px',
        lineHeight: 'normal',
        background: colorBgContainer
      }}
    >
      <Space size="small" style={{ cursor: 'default' }}>
        <Image src={swpuIcon} preview={false} width={40} height={40} />
        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5 }}>西南石油带砖</div>
      </Space>
      <Space split={<div style={{ color: colorFill }}>|</div>}>
        <Space size={4} style={{ cursor: 'default' }}>
          <Avatar size={40} src={miku} />
          <div style={{ fontSize: 16, lineHeight: 1.5 }}>nameless</div>
        </Space>
        <Button color="default" variant="link" size="small">
          个人中心
        </Button>
        <Button color="default" variant="link" size="small">
          消息通知
        </Button>
        <Button color="default" variant="link" size="small">
          退出
        </Button>
      </Space>
    </Header>
  )
}
