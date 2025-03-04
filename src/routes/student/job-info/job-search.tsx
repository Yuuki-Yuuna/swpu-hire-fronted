import {
  cityOptions,
  companyNatureOptions,
  companySizeOptions,
  salaryRequirementOptions
} from '@/routes/const'
import { Cascader, Flex, Input, Select, Space, theme } from 'antd'

export interface JobSearchData {
  input: string
  city?: string // adcode
  companySize?: number
  salaryRequirement?: number
  enterpriseNature?: number
}

export interface JobSearchProps {
  data: JobSearchData
  onChange: (data: JobSearchData) => void
}

export const JobSearch: React.FC<JobSearchProps> = (props) => {
  const { data, onChange } = props
  const { companySize, salaryRequirement, enterpriseNature } = data
  const cityValue = data.city ? [data.city.slice(0, 6), data.city.slice(6)] : []

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Flex
      vertical
      gap="middle"
      style={{ padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
      <Input.Search
        onSearch={(value) => onChange({ ...data, input: value })}
        placeholder="请输入公司名或职位名搜索"
        enterButton
      />
      <Space>
        <Cascader
          value={cityValue}
          displayRender={(labels) => labels.at(-1)}
          onChange={(value) => onChange({ ...data, city: (value as string[])?.join('') })}
          options={cityOptions}
          placeholder="全部城市"
        />
        <Select
          value={companySize}
          onChange={(value) => onChange({ ...data, companySize: value })}
          options={companySizeOptions}
          placeholder="公司规模"
          allowClear
          style={{ width: 120 }}
        />
        <Select
          value={salaryRequirement}
          onChange={(value) => onChange({ ...data, salaryRequirement: value })}
          options={salaryRequirementOptions}
          placeholder="薪资要求"
          allowClear
          style={{ width: 120 }}
        />
        <Select
          value={enterpriseNature}
          onChange={(value) => onChange({ ...data, enterpriseNature: value })}
          options={companyNatureOptions}
          placeholder="企业性质"
          allowClear
          style={{ width: 120 }}
        />
      </Space>
    </Flex>
  )
}
