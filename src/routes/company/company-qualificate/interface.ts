import type { CompanyData } from '@/routes/interface'

export interface CompanyQualificateProps {
  formData?: QualificateFormData & { isExamine: boolean }
  setEditable: React.Dispatch<React.SetStateAction<boolean>>
}

export type QualificateFormData = Omit<CompanyData, '_id' | 'companyLogo'>

export type CompanyFormData = Omit<QualificateFormData, 'companySizeName' | 'companyNatureName'>
