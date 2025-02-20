import { userApi } from '@/api/user'
import type { UserInfo } from '@/hooks/use-user-info'
import { useResetUserInfo } from '@/hooks/use-user-info'
import { removeToken } from '@/utils/token'
import { RightOutlined } from '@ant-design/icons'
import { useNavigate } from '@modern-js/runtime/router'
import { Button, Flex, Form, Input, Modal, message } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export interface UserOptionCardProps {
  userInfo: UserInfo | null
}

export const UserOptionCard: React.FC<UserOptionCardProps> = (props) => {
  const { userInfo } = props
  const { styles } = useStyles()

  return (
    <Flex gap={12}>
      <Flex vertical flex={1} gap={6} className={styles.itemCard}>
        <div className={styles.itemCardTitle}>
          <div>用户名</div>
        </div>
        <div>当前用户名为: {userInfo?.username}</div>
      </Flex>
      <Flex vertical flex={1} gap={6} className={styles.itemCard}>
        <div className={styles.itemCardTitle}>
          <div>密码</div>
          <PasswordButton />
        </div>
        <div>当前密码等级为: 良好</div>
      </Flex>
    </Flex>
  )
}

interface ChangePasswordFormValue {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const PasswordButton: React.FC = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const resetUserInfo = useResetUserInfo()

  const onFinish = async (formValue: ChangePasswordFormValue) => {
    const res = await userApi.changePassword(formValue)
    if (!res.success) {
      message.error(res.message)
      return
    }
    message.success('修改成功')
    navigate('/login')
    resetUserInfo()
    removeToken()
  }

  return (
    <>
      <Button
        type="link"
        icon={<RightOutlined />}
        iconPosition="end"
        style={{ gap: 4 }}
        onClick={() => setIsModalOpen(true)}
      >
        修改密码
      </Button>
      <Modal
        centered
        destroyOnClose
        maskClosable={false}
        title="修改密码"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ htmlType: 'submit' }}
        modalRender={(dom) => (
          <Form name="changePassword" labelCol={{ span: 4 }} onFinish={onFinish}>
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="oldPassword"
          label="旧密码"
          rules={[{ required: true, message: '请输入旧密码' }]}
        >
          <Input.Password placeholder="请输入旧密码" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          dependencies={['oldPassword']}
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, max: 20, message: '密码应在6-20位间' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('oldPassword') !== value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('新密码需与旧密码不同'))
              }
            })
          ]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认密码"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: '请输入确认密码'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码输入不一致'))
              }
            })
          ]}
        >
          <Input.Password placeholder="请再次输入新密码" />
        </Form.Item>
      </Modal>
    </>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  itemCard: css`
    padding: 16px;
    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
    color: ${token.colorTextTertiary};
  `,
  itemCardTitle: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${token.colorTextBase};
    font-size: 16px;
    font-weight: 700;
  `
}))
