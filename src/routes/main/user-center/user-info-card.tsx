import swpuIcon from '@/assets/swpu-icon.jpg'
import type { UserInfo } from '@/hooks/use-user-info'
import { Avatar, Flex, Space, theme } from 'antd'

export interface UserInfoCardProps {
  userInfo: UserInfo | null
}

export const UserInfoCard: React.FC<UserInfoCardProps> = (props) => {
  const { userInfo } = props

  return (
    <Space size={14}>
      <Avatar src={swpuIcon} size={60} />
      <Space direction="vertical" size={6}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{userInfo?.studentName}</div>
        <div>{userInfo?.graduationYear}届</div>
      </Space>
    </Space>
  )
}
