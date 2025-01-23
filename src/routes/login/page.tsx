import swpuBrand from '@/assets/swou-brand.png'
import { Image, Layout, theme } from 'antd'
import { LoginForm } from './login-form'

const { Header } = Layout

const Login = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 64,
          padding: '0 32px',
          lineHeight: 'normal',
          background: colorBgContainer
        }}
      >
        <Image src={swpuBrand} preview={false} width={350} height={70} />
      </Header>
      <Layout style={{ position: 'relative' }}>
        <LoginForm />
      </Layout>
    </Layout>
  )
}

export default Login
