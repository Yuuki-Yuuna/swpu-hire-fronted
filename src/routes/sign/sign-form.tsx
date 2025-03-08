import { userApi } from '@/api/user'
import { userAtom } from '@/hooks/use-user-info'
import { cryptoKey } from '@/utils/sercet-key'
import { setToken } from '@/utils/token'
import { useNavigate } from '@modern-js/runtime/router'
import { Button, Form, Input, message } from 'antd'
import { createStyles } from 'antd-style'
import { AES } from 'crypto-js'
import { useAtom } from 'jotai'

interface SignFormValue {
  username: string
  password: string
  confirmPassword: string
}

export const SignForm: React.FC = () => {
  const navigate = useNavigate()
  const [, setUserInfo] = useAtom(userAtom)

  const onFinish = async (formValue: SignFormValue) => {
    const { username, password } = formValue
    const encUsername = AES.encrypt(username, cryptoKey).toString()
    const encPassword = AES.encrypt(password, cryptoKey).toString()

    const res = await userApi.sign({ username: encUsername, password: encPassword })
    if (!res.success) {
      message.error(res.message)
      return
    }

    message.success('注册成功')
    const { token } = res.data
    setToken(token)
    const { data: userInfo } = await userApi.userInfo()
    setUserInfo(userInfo)
    navigate('/')
  }

  const { styles } = useStyles()

  return (
    <Form name="sign" className={styles.form} onFinish={onFinish} labelCol={{ span: 6 }}>
      <div className={styles.title}>用户注册</div>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="确认密码"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: '请输入确认密码'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次密码输入不一致'))
            }
          })
        ]}
      >
        <Input type="password" placeholder="再次输入密码" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          注册
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
