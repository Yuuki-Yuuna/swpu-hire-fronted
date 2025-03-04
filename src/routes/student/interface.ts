export interface JobData {
  _id: string
  jobName: string
  position: number // 岗位编码
  positionName: string // 岗位名
  location: number // adcode编码
  locationName: string // 城市
  degreeName: string // 学历
  salaryDesc: string // 薪资描述
  showSkills: string[] // 标签
  company: {
    _id: string // 企业id
    companyName: string // 企业名称
    companyLogo: string // 企业logo
    compoanySize: number // 企业规模(value)
    companySizeName: string // 企业规模
    companyType: number // 企业类型(value)
    companyTypeName: string // 企业类型
  }
}

export interface JobDetailData extends JobData {
  description: string // 岗位描述
  isApply: boolean
}
