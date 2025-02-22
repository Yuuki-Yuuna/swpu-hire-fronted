import { useLocation, useNavigate } from '@modern-js/runtime/router'
import { Layout, Menu, theme } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'

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

export const MainMenu = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const navigate = useNavigate()
  const location = useLocation()

  const [selectMenuKeys, setSelectMenuKeys] = useState<string[]>([])

  useEffect(() => {
    const pathNameArray = location.pathname.split('/')
    const selectKey = pathNameArray.at(-1)
    selectKey && setSelectMenuKeys([selectKey])
  }, [location])

  const onSelect: MenuProps['onSelect'] = (selectInfo) => {
    const [selectedKey] = selectInfo.selectedKeys
    navigate(`/main/${selectedKey}`)
  }

  return (
    <Sider
      width={200}
      style={{
        background: colorBgContainer,
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: 64
      }}
    >
      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={selectMenuKeys}
        defaultOpenKeys={defaultOpenKeys}
        onSelect={onSelect}
      />
    </Sider>
  )
}
