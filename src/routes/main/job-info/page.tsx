import { useSearchParams } from '@modern-js/runtime/router'
import type { TabsProps } from 'antd'
import { Flex, Tabs } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'
import { JobList, type JobListProps } from './components/job-list'
import { JobSearch, type JobSearchProps } from './components/job-search'

const mockData: JobListProps['data'] = [
  {
    jobId: '90d9af6ec5dc3ae903J62d6',
    jobName: '维保工程师',
    position: 300626,
    positionName: '电梯工',
    location: 101281900,
    locationName: '揭阳',
    degreeName: '中专/中技',
    salaryDesc: '4-9K·13薪',
    showSkills: ['电梯维保', '故障维修'],
    companyId: 'ddd8e431e825bebc03x82t27Ew'
  }
]

const tabItems: TabsProps['items'] = [
  {
    key: 'recommend',
    label: '推荐',
    children: <JobList data={mockData} />
  },
  {
    key: 'last',
    label: '最新',
    children: <></>
  }
]

const JobInfo = () => {
  const { styles } = useStyles()
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
      <Tabs items={tabItems} defaultActiveKey="recommend" className={styles.tabs} size="small" />
    </Flex>
  )
}

export default JobInfo

const useStyles = createStyles(({ token, css }) => ({
  tabs: css`
    padding: 8px 24px;

    .ant-tabs-nav::before {
      display: none;
    }

    .ant-tabs-tab {
      color: ${token.colorTextTertiary};
    }
  `
}))
