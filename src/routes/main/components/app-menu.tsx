import { useNavigate } from '@modern-js/runtime/router'
import { Layout, Menu, theme } from 'antd'
import type { MenuProps } from 'antd'

const { Sider } = Layout

const menuItems: MenuProps['items'] = [
  {
    key: 'job',
    label: '求职招聘',
    children: [
      { key: 'job-info', label: '招聘信息' },
      { key: 'job-interview', label: '面试管理' },
      { key: 'job-cv', label: '简历管理' }
    ]
  },
  {
    key: 'employment',
    label: '就业事务',
    children: [
      { key: 'employment-info', label: '生源信息' },
      { key: 'employment-protocol', label: '三方协议' }
    ]
  },
  {
    key: 'user',
    label: '系统设置',
    children: [{ key: 'user-center', label: '个人中心' }]
  }
]

const defaultOpenKeys = menuItems.map((item) => item?.key as string)

export const AppMenu = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const navigate = useNavigate()

  const onSelect: MenuProps['onSelect'] = (selectInfo) => {
    const [selectedKey] = selectInfo.selectedKeys
    navigate(`/main/${selectedKey}`)
  }

  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      <Menu mode="inline" items={menuItems} defaultOpenKeys={defaultOpenKeys} onSelect={onSelect} />
    </Sider>
  )
}