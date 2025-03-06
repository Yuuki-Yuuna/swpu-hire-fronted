import { IntershipExpReadonly } from '@/routes/student/job-resume/Internship-exp'
import { EducationExpReadonly } from '@/routes/student/job-resume/education-exp'
import type { ResumeFormData } from '@/routes/student/job-resume/interface'
import { ProjectExpReadonly } from '@/routes/student/job-resume/project-exp'
import { ResumeInfoReadonly } from '@/routes/student/job-resume/resume-info'
import { SelfEvaluationReadonly } from '@/routes/student/job-resume/self-evaluation'

import { Flex } from 'antd'
import { createStyles } from 'antd-style'

export interface StudentResumeProps {
  formData?: ResumeFormData
}

export const StudentResume: React.FC<StudentResumeProps> = (props) => {
  const { formData } = props

  const { styles } = useStyles()

  return (
    <Flex flex={2} vertical className={styles.container}>
      <Flex flex={1} style={{ position: 'relative' }}>
        <div className={styles.resumeContainer}>
          <Flex vertical gap={24} style={{ width: '150%' }}>
            <ResumeInfoReadonly formData={formData} />
            <EducationExpReadonly formData={formData} />
            <IntershipExpReadonly formData={formData} />
            <ProjectExpReadonly formData={formData} />
            <SelfEvaluationReadonly formData={formData} />
          </Flex>
        </div>
      </Flex>
    </Flex>
  )
}

export const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    padding-right: 0;
    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
    overflow: hidden;
  `,
  resumeContainer: css`
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    inset: 0;
  `
}))
