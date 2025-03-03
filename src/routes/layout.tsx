import { Outlet } from '@modern-js/runtime/router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import './index.css'

dayjs.locale('zh-cn')

const Layout = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet />
    </ConfigProvider>
  )
}

export default Layout
