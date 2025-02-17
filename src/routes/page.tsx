import { useNavigate } from '@modern-js/runtime/router'
import { useEffect } from 'react'

const App: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/main')
  }, [navigate])

  return <></>
}

export default App
