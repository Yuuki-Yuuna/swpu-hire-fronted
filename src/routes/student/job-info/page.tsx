import { jobApi } from '@/api/job'
import { useSearchParams } from '@modern-js/runtime/router'
import { usePagination } from 'ahooks'
import { Spin, type TabsProps } from 'antd'
import { Flex, Tabs } from 'antd'
import { createStyles } from 'antd-style'
import { useMemo, useState } from 'react'
import { JobList } from './job-list'
import { JobSearch, type JobSearchData } from './job-search'

const JobInfo = () => {
  const { styles } = useStyles()
  const [urlSearchParams, setURLSearchParams] = useSearchParams()

  const [jobSearchData, setJobSearchData] = useState<JobSearchData>({
    city: urlSearchParams.get('city') || undefined,
    input: ''
  })

  const onJobSearchDataChange = (data: JobSearchData) => {
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

  const {
    loading: jobListLoading,
    data: jobListData,
    pagination: listPagination
  } = usePagination(
    async ({ current, pageSize }) => {
      const result = await jobApi.list({ ...jobSearchData, page: current, limit: pageSize })
      return result.data
    },
    { refreshDeps: [jobSearchData] }
  )

  const {
    loading: lastestLoading,
    data: lastestData,
    pagination: lastestPagination
  } = usePagination(
    async ({ current, pageSize }) => {
      const result = await jobApi.lastestList({ ...jobSearchData, page: current, limit: pageSize })
      return result.data
    },
    { refreshDeps: [jobSearchData] }
  )

  const tabItems = useMemo<TabsProps['items']>(
    () => [
      {
        key: 'all',
        label: '全部',
        children: jobListData && <JobList data={jobListData} pagination={listPagination} />
      },
      {
        key: 'recommend',
        label: '推荐',
        children: <></>
      },
      {
        key: 'lastest',
        label: '最新',
        children: lastestData && <JobList data={lastestData} pagination={lastestPagination} />
      }
    ],
    [jobListData, listPagination, lastestData, lastestPagination]
  )

  return (
    <Spin spinning={jobListLoading || lastestLoading}>
      <Flex vertical>
        <JobSearch data={jobSearchData} onChange={onJobSearchDataChange} />
        <Tabs items={tabItems} defaultActiveKey="all" className={styles.tabs} size="small" />
      </Flex>
    </Spin>
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
