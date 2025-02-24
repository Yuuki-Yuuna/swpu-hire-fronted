import { jobApi } from '@/api/job'
import { useSearchParams } from '@modern-js/runtime/router'
import { usePagination } from 'ahooks'
import type { TabsProps } from 'antd'
import { Flex, Tabs } from 'antd'
import { createStyles } from 'antd-style'
import { useMemo, useState } from 'react'
import { JobList } from './job-list'
import { JobSearch, type JobSearchProps } from './job-search'

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

  const { data: recJobData, pagination: recPagination } = usePagination(
    async ({ current, pageSize }) => {
      const result = await jobApi.recommend({ page: current, limit: pageSize })
      return result.data
    }
  )

  const tabItems = useMemo<TabsProps['items']>(
    () => [
      {
        key: 'recommend',
        label: '推荐',
        children: recJobData ? <JobList data={recJobData} pagination={recPagination} /> : <></>
      },
      {
        key: 'last',
        label: '最新',
        children: recJobData ? <JobList data={recJobData} pagination={recPagination} /> : <></>
      }
    ],
    [recJobData, recPagination]
  )

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
