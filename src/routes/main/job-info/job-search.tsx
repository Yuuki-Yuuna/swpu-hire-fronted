import adcode from '@/assets/adcode.json'
import { Cascader, Flex, Input, Select, Space, theme } from 'antd'
import type { CascaderProps, SelectProps } from 'antd'

interface JobSearchData {
  input: string
  city?: string
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
  const cityValue = data.city ? [data.city] : [] // 只用于显示的值

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
          onChange={(value) => onChange({ ...data, city: (value as string[])?.at(-1) })}
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
          options={enterpriseNatureOptions}
          placeholder="企业性质"
          allowClear
          style={{ width: 120 }}
        />
      </Space>
    </Flex>
  )
}

const cityOptions: CascaderProps['options'] = adcode.map((province) => ({
  label: province.name,
  value: province.name,
  children: province.citys.map((city) => ({ label: city.name, value: city.name }))
}))

const companySizeOptions: SelectProps['options'] = [
  { label: '0-20人', value: 0 },
  { label: '20-99人', value: 1 },
  { label: '100-499人', value: 2 },
  { label: '500-999人', value: 3 },
  { label: '1000-9999人', value: 4 },
  { label: '10000人以上', value: 5 }
]

const salaryRequirementOptions: SelectProps['options'] = [
  { label: '3K以下', value: 0 },
  { label: '3-5K', value: 1 },
  { label: '5-10K', value: 2 },
  { label: '10-15K', value: 3 },
  { label: '15-20K', value: 4 },
  { label: '20-30K', value: 5 },
  { label: '30-50K', value: 6 },
  { label: '50K以上', value: 7 }
]

const enterpriseNatureOptions: SelectProps['options'] = [
  { label: '国企', value: 0 },
  { label: '央企', value: 1 },
  { label: '银行/信用社', value: 2 },
  { label: '研究所/院', value: 3 },
  { label: '外企', value: 4 },
  { label: '民企', value: 5 }
]
