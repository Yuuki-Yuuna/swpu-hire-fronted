export interface CompanyQualificateProps {
  formData?: QualificateFormData & { isExamine: boolean }
  setEditable: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CompanyFormData {
  companyName: string
  companySize: number
  companyNature: number
  companyType: string
  address?: string
  creditCode: string
  description?: string
}

export interface QualificateFormData extends CompanyFormData {
  companySizeName: string
  companyNatureName: string
}
