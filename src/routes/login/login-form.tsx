import { userApi } from '@/api/user'
import { userAtom } from '@/hooks/use-user-info'
import { cryptoKey } from '@/utils/sercet-key'
import { setToken } from '@/utils/token'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from '@modern-js/runtime/router'
import { Button, Checkbox, Flex, Form, Input, message } from 'antd'
import { createStyles } from 'antd-style'
import { AES } from 'crypto-js'
import { useAtom } from 'jotai'

interface LoginFormValue {
  username: string
  password: string
  remember?: boolean
}

const REMEMBER_USERNAME_KEY = 'remember_username'

export const LoginForm = () => {
  const navigate = useNavigate()
  const [, setUserInfo] = useAtom(userAtom)

  const { styles } = useStyles()

  const onFinish = async (formValue: LoginFormValue) => {
    const { username, password, remember } = formValue
    const encUsername = AES.encrypt(username, cryptoKey).toString()
    const encPassword = AES.encrypt(password, cryptoKey).toString()
    const res = await userApi.login({ username: encUsername, password: encPassword })
    if (!res.success) {
      message.error(res.message)
      return
    }

    if (!remember) {
      localStorage.removeItem(REMEMBER_USERNAME_KEY)
    } else {
      localStorage.setItem(REMEMBER_USERNAME_KEY, username)
    }

    message.success('登录成功')
    const { token } = res.data
    setToken(token)
    const { data: userInfo } = await userApi.userInfo()
    setUserInfo(userInfo)
    navigate('/')
  }

  return (
    <Form
      name="login"
      className={styles.form}
      onFinish={onFinish}
      initialValues={{
        username: localStorage.getItem(REMEMBER_USERNAME_KEY) || '',
        remember: !!localStorage.getItem(REMEMBER_USERNAME_KEY)
      }}
    >
      <div className={styles.title}>用户登录</div>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住用户名</Checkbox>
          </Form.Item>
          <Button type="link" onClick={() => navigate('/sign')}>
            注册
          </Button>
        </Flex>
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  form: css`
    position: absolute;
    top: 20%;
    right: 15%;
    width: 400px;
    padding: 12px 28px;
    border-radius: ${token.borderRadiusLG}px;
    background-color: ${token.colorBgContainer};
  `,
  title: css`
    margin: 16px 0;
    font-size: 18px;
    font-weight: 700;
  `
}))
