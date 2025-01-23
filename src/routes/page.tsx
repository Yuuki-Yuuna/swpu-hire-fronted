import { getToken } from '@/utils/token'
import { useNavigate } from '@modern-js/runtime/router'
import { useEffect } from 'react'

const App: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()

    if (!token) {
      navigate('/login')
    } else {
      navigate('/main')
    }
  }, [navigate])

  return <></>
}

export default App
