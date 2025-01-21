import { Outlet } from '@modern-js/runtime/router'
import { Flex, Layout, theme } from 'antd'
import { AppHeader } from './app-header'
import { AppMenu } from './app-menu'

const { Content, Footer } = Layout

const MainLayout = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ height: '100vh' }}>
      <AppHeader />
      <Layout>
        <AppMenu />
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
      <Footer style={{ height: 64, background: colorBgContainer }}>
        <Flex align="center" justify="center">
          Swpu Hire ©2025 created by P. J. Y
        </Flex>
      </Footer>
    </Layout>
  )
}

export default MainLayout
