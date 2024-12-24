import miku from '@/assets/sakura-miku.jpg'
import swpuIcon from '@/assets/swpu-icon.jpg'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { type MenuProps, Space } from 'antd'
import { Avatar, Button, Image, Layout, Menu, theme } from 'antd'
import React from 'react'

const { Header, Content, Sider, Footer } = Layout

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1)

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1
        return {
          key: subKey,
          label: `option${subKey}`
        }
      })
    }
  }
)

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorFill }
  } = theme.useToken()

  return (
    <Layout style={{ height: '100vh' }}>
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
        <Space size="small">
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
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ height: 64, background: colorBgContainer }}>footer</Footer>
    </Layout>
  )
}

export default App
