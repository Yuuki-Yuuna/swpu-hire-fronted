export interface JobData {
  _id: string
  jobName: string
  location: string // 工作地(adcode编码)
  locationName: string // 工作地
  degreeName: string // 学历
  salaryDesc: string // 薪资描述
  salaryMin: number // 最低薪资
  salaryMax: number // 最高薪资
  showSkills: string[] // 标签
  description?: string // 描述
  company: CompanyData
}

export interface CompanyData {
  _id: string // 企业id
  companyName: string // 企业名称
  companyLogo: string // 企业logo
  companySize: number // 企业规模(value)
  companySizeName: string // 企业规模
  companyType: string // 企业类型
  companyNature: number // 企业性质(value)
  companyNatureName: string // 企业性质
  address?: string // 企业地址
  creditCode: string // 社会信用代码
  description?: string // 企业简介
}
