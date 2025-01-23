import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input, theme } from 'antd'
import { createStyles } from 'antd-style'

interface LoginFormValue {
  username: string
  password: string
  remember?: boolean
}

export const LoginForm = () => {
  const { styles } = useStyles()

  const onFinish = (formValue: LoginFormValue) => {
    console.log('Received values of form: ', formValue)
    // if (!formValue.remember) {
    //   localStorage.removeItem('remember_username')
    // }
  }

  return (
    <Form name="login" className={styles.form} onFinish={onFinish}>
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
          <Button type="link">忘记密码</Button>
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
    top: 60px;
    right: 60px;
    width: 400px;
    padding: 12px 28px;
    border-radius: ${token.borderRadiusLG}px;
    background-color: ${token.colorBgContainer};
  `,
  title: css`
    margin: 16px 0;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 700;
  `
}))
