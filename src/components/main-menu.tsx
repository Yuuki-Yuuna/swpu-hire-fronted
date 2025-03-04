import { type UserInfo, UserType, useUserInfo } from '@/hooks/use-user-info'
import { useLocation, useNavigate } from '@modern-js/runtime/router'
import { Layout, Menu, theme } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'

const { Sider } = Layout

export const MainMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { userInfo } = useUserInfo()

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const { path, menuItems, defaultOpenKeys } = getMenuItems(userInfo)

  const [selectMenuKeys, setSelectMenuKeys] = useState<string[]>([])

  useEffect(() => {
    const pathNameArray = location.pathname.split('/')
    const selectKey = pathNameArray.at(-1)
    selectKey && setSelectMenuKeys([selectKey])
  }, [location])

  const onSelect: MenuProps['onSelect'] = (selectInfo) => {
    const [selectedKey] = selectInfo.selectedKeys
    navigate(`${path}/${selectedKey}`)
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
      {userInfo && (
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={selectMenuKeys}
          defaultOpenKeys={defaultOpenKeys}
          onSelect={onSelect}
        />
      )}
    </Sider>
  )
}

type MenuItemArray = NonNullable<MenuProps['items']>

const studentMenuItems: MenuItemArray = [
  {
    key: 'job',
    label: '求职招聘',
    children: [
      { key: 'job-info', label: '招聘信息' },
      { key: 'job-interview', label: '面试管理' },
      { key: 'job-resume', label: '简历管理' }
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

const companyMenuItems: MenuItemArray = []

const schoolMenuItems: MenuItemArray = [
  {
    key: 'student-work',
    label: '学生事务',
    children: [{ key: 'employment-protocol', label: '三方协议' }]
  },
  {
    key: 'company-work',
    label: '企业事务',
    children: [{ key: 'company-review', label: '企业审查' }]
  },
  {
    key: 'user',
    label: '系统设置',
    children: [{ key: 'user-center', label: '个人中心' }]
  }
]

const getMenuItems = (userInfo: UserInfo | null) => {
  const data = { menuItems: [] as MenuItemArray, defaultOpenKeys: [] as string[], path: '' }
  if (userInfo?.userType === UserType.Student) {
    data.menuItems = studentMenuItems
    data.path = '/student'
  } else if (userInfo?.userType === UserType.Company) {
    data.menuItems = companyMenuItems
    data.path = '/company'
  } else if (userInfo?.userType === UserType.School) {
    data.menuItems = schoolMenuItems
    data.path = '/school'
  }

  data.defaultOpenKeys = data.menuItems.map((item) => item?.key as string)
  return data
}
