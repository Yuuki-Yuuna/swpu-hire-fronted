import { useUserInfo } from '@/hooks/use-user-info'

const Main = () => {
  const { userInfo } = useUserInfo()

  if (!userInfo) {
    return <></>
  }

  return <>main content</>
}

export default Main
