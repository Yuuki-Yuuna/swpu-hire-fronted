import headerBg from '@/assets/header-bg.png'
import { MainHeader } from '@/components/main-header'
import { MainMenu } from '@/components/main-menu'
import { Outlet } from '@modern-js/runtime/router'
import { Flex, Image, Layout, theme } from 'antd'

const { Content, Footer } = Layout

const StudentLayout = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainHeader />
      <Layout>
        <MainMenu />
        <Layout>
          <Content style={{ padding: 24, minHeight: 'calc(100vh - 64px)' }}>
            <Image src={headerBg} preview={false} style={{ marginBottom: 24 }} width={'100%'} />
            <Outlet />
          </Content>
          <Footer style={{ height: 64, background: colorBgContainer }}>
            <Flex align="center" justify="center">
              Swpu Hire ©2025 created by P. J. Y
            </Flex>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default StudentLayout
