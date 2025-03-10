import { useNavigate } from '@modern-js/runtime/router'
import { useEffect } from 'react'

const Company = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/company/hire-job')
  }, [navigate])

  return <></>
}

export default Company
