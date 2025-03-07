import adcode from '@/assets/adcode.json'
import type { CascaderProps, SelectProps } from 'antd'

export enum ApplyStatus {
  End = 0, // 流程结束
  Apply = 1, // 已申请
  Interview = 2, // 面试中
  Evaluation = 3, // 录用评估
  Hire = 4 // 通过
}

export const applyStatusMap = {
  [ApplyStatus.End]: { text: '流程结束', color: 'grey' },
  [ApplyStatus.Apply]: { text: '已投递', color: 'gold' },
  [ApplyStatus.Interview]: { text: '面试中', color: 'blue' },
  [ApplyStatus.Evaluation]: { text: '录用评估', color: 'cyan' },
  [ApplyStatus.Hire]: { text: '已录用', color: 'green' }
}

export const cityOptions: NonNullable<CascaderProps['options']> = adcode.map((province) => ({
  label: province.name,
  value: province.adcode,
  children: province.citys.map((city) => ({ label: city.name, value: city.adcode }))
}))

export const companySizeOptions: NonNullable<SelectProps['options']> = [
  { label: '0-20人', value: 0 },
  { label: '20-99人', value: 1 },
  { label: '100-499人', value: 2 },
  { label: '500-999人', value: 3 },
  { label: '1000-9999人', value: 4 },
  { label: '10000人以上', value: 5 }
]

export const salaryRequirementOptions: NonNullable<SelectProps['options']> = [
  { label: '3K以下', value: 0 },
  { label: '3-5K', value: 1 },
  { label: '5-10K', value: 2 },
  { label: '10-15K', value: 3 },
  { label: '15-20K', value: 4 },
  { label: '20-30K', value: 5 },
  { label: '30-50K', value: 6 },
  { label: '50K以上', value: 7 }
]

export const companyNatureOptions: NonNullable<SelectProps['options']> = [
  { label: '国企', value: 0 },
  { label: '央企', value: 1 },
  { label: '银行/信用社', value: 2 },
  { label: '研究所/院', value: 3 },
  { label: '外企', value: 4 },
  { label: '民企', value: 5 }
]
