import { useSearchParams } from '@modern-js/runtime/router'
import type { TabsProps } from 'antd'
import { Flex, Tabs } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'
import { JobList, type JobListProps } from './job-list'
import { JobSearch, type JobSearchProps } from './job-search'

const mockData: JobListProps['data'] = Array.from(new Array(10).keys()).map((_, index) => ({
  jobId: `90d9af6ec5dc3ae903J62d6${index}`,
  jobName: '维保工程师',
  position: 300626,
  positionName: '电梯工',
  location: 101281900,
  locationName: '揭阳',
  degreeName: '中专/中技',
  salaryDesc: '4-9K·13薪',
  showSkills: ['电梯维保', '故障维修'],
  companyId: 'ddd8e431e825bebc03x82t27Ew',
  companyName: '升达电梯',
  companyLogo:
    'https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png',
  compoanySize: 1,
  companySizeName: '20-99人',
  companyType: 101106,
  companyTypeName: '其他生活服务'
}))

const tabItems: TabsProps['items'] = [
  {
    key: 'recommend',
    label: '推荐',
    children: <JobList data={mockData} />
  },
  {
    key: 'last',
    label: '最新',
    children: <JobList data={mockData} />
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
    padding: 8px 0;

    .ant-tabs-nav {
      padding: 0 24px;

      &::before {
        display: none;
      }
    }

    .ant-tabs-tab {
      color: ${token.colorTextTertiary};
    }
  `
}))
