import headerBg from '@/assets/header-bg.png'
import { Outlet } from '@modern-js/runtime/router'
import { Flex, Image, Layout, theme } from 'antd'
import { MainHeader } from './main-header'
import { MainMenu } from './main-menu'

const { Content, Footer } = Layout

const MainLayout = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainHeader />
      <Layout>
        <MainMenu />
        <Content style={{ padding: 24 }}>
          <Image src={headerBg} preview={false} style={{ marginBottom: 24 }} width={'100%'} />
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
