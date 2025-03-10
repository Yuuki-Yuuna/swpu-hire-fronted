import { useNavigate } from '@modern-js/runtime/router'
import { useEffect } from 'react'

const Student = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/student/job-info')
  }, [navigate])

  return <></>
}

export default Student
