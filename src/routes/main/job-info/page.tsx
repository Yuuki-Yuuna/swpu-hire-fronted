import { useSearchParams } from '@modern-js/runtime/router'
import { Flex } from 'antd'
import { useState } from 'react'
import { JobSearch, type JobSearchProps } from './components/job-search'

const JobInfo = () => {
  const [urlSearchParams, setURLSearchParams] = useSearchParams()

  const [jobSearchData, setJobSearchData] = useState<JobSearchProps['data']>({
    city: urlSearchParams.get('city') || undefined,
    input: ''
  })

  const onJobSearchDataChange = (data: JobSearchProps['data']) => {
    setURLSearchParams((search) => {
      if (!data.city) {
        search.delete('city')
      } else {
        search.set('city', data.city)
      }

      return search
    })

    setJobSearchData(data)
  }

  return (
    <Flex vertical>
      <JobSearch data={jobSearchData} onChange={onJobSearchDataChange} />
    </Flex>
  )
}

export default JobInfo
