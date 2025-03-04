import { useLocation, useNavigate } from '@modern-js/runtime/router'
import { useEffect } from 'react'
import { UserType, useUserInfo } from './use-user-info'

const routeMap = {
  [UserType.Student]: '/student',
  [UserType.Company]: '/company',
  [UserType.School]: '/school'
}

export const useRouteGuard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo } = useUserInfo()

  useEffect(() => {
    if (!userInfo) {
      return
    }

    const { userType } = userInfo
    const prefix = routeMap[userType]
    if (!location.pathname.startsWith(prefix)) {
      navigate(prefix)
    }
  }, [userInfo, location, navigate])
}
