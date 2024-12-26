import { Flex, Input, Select, Space, theme } from 'antd'
import type { SelectProps } from 'antd'

export const JobSearch: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Flex
      vertical
      gap="middle"
      style={{ padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}
    >
      <Input.Search placeholder="请输入公司名或职位名搜索" enterButton />
      <Space>
        <Select
          options={companySizeOptions}
          placeholder="公司规模"
          allowClear
          style={{ width: 120 }}
        />
        <Select
          options={salaryRequirementOptions}
          placeholder="薪资要求"
          allowClear
          style={{ width: 120 }}
        />
        <Select
          options={enterpriseNatureOptions}
          placeholder="企业性质"
          allowClear
          style={{ width: 120 }}
        />
      </Space>
    </Flex>
  )
}

const companySizeOptions: SelectProps['options'] = [
  { label: '0-20人', value: '1' },
  { label: '20-99人', value: '2' },
  { label: '100-499人', value: '3' },
  { label: '500-999人', value: '4' },
  { label: '500-9999人', value: '5' },
  { label: '1000人以上', value: '6' }
]

const salaryRequirementOptions: SelectProps['options'] = [
  { label: '3K以下', value: '1' },
  { label: '3-5K', value: '2' },
  { label: '5-10K', value: '3' },
  { label: '10-15K', value: '4' },
  { label: '15-20K', value: '5' },
  { label: '20-30K', value: '6' },
  { label: '30-50K', value: '7' },
  { label: '50K以上', value: '8' }
]

const enterpriseNatureOptions: SelectProps['options'] = [
  { label: '国企', value: '1' },
  { label: '央企', value: '2' },
  { label: '银行/信用社', value: '3' },
  { label: '研究所/院', value: '4' },
  { label: '外企', value: '5' },
  { label: '民企', value: '6' }
]
