import swpuIcon from '@/assets/swpu-icon.jpg'
import { type UserInfo, UserType } from '@/hooks/use-user-info'
import { getToken } from '@/utils/token'
import type { GetProp, UploadProps } from 'antd'
import { Avatar, Space, Upload, message } from 'antd'
import { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export interface UserInfoCardProps {
  userInfo: UserInfo | null
  refreshUserInfo: () => Promise<void>
}

export const UserInfoCard: React.FC<UserInfoCardProps> = (props) => {
  const { userInfo, refreshUserInfo } = props
  const [loading, setLoading] = useState(false)
  const { avatarUrl, displayName, descText } = getUserRenderData(userInfo)

  const beforeUpload = (file: FileType) => {
    if (loading) {
      return false
    }

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('仅支持上传JPG/PNG')
    }
    const isFileSizeOk = file.size / 1024 / 1024 < 5 // 5MB
    if (!isFileSizeOk) {
      message.error('图片不能超过5MB')
    }
    return isJpgOrPng && isFileSizeOk
  }

  const handleChange: UploadProps['onChange'] = async (info) => {
    const { status } = info.file
    if (status === 'uploading') {
      setLoading(true)
      return
    }

    if (status === 'done') {
      await refreshUserInfo()
      message.success('修改成功')
    }

    setLoading(false) // 除了uploading都关掉
  }

  return (
    <Space size={14}>
      <Upload
        name="avatar"
        showUploadList={false}
        listType="picture-circle"
        headers={{ Authorization: `Bearer ${getToken()}` }}
        action="/api/user/upload-avatar"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Avatar src={avatarUrl} size={100} />
      </Upload>
      <Space direction="vertical" size={6}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{displayName}</div>
        <div>{descText}</div>
      </Space>
    </Space>
  )
}

export const getUserRenderData = (userInfo: UserInfo | null) => {
  const data = { displayName: '', descText: '', avatarUrl: userInfo?.avatar || swpuIcon }
  if (userInfo?.userType === UserType.Student) {
    data.displayName = userInfo.studentName
    data.descText = `${userInfo.graduationYear}届`
  } else if (userInfo?.userType === UserType.Company) {
    data.displayName = userInfo.staffName
    data.descText = userInfo.campanyName
  } else if (userInfo?.userType === UserType.School) {
    data.displayName = userInfo.adminName
    data.descText = userInfo.schoolName
  }

  return data
}
