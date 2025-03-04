import { Button, Flex, Input } from 'antd'
import { createStyles } from 'antd-style'

export const JobFilter: React.FC = () => {
  const { styles } = useStyles()

  return (
    <Flex wrap gap={16} className={styles.container}>
      <Flex flex={1} align="center" gap={12}>
        <div className={styles.title}>岗位名:</div>
        <Input />
      </Flex>
      <Flex flex={1} align="center" gap={12}>
        <div className={styles.title}>发布人:</div>
        <Input />
      </Flex>
      <Flex align="center" gap={12}>
        <Button>重置</Button>
        <Button type="primary">搜索</Button>
      </Flex>
    </Flex>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    border-radius: ${token.borderRadiusLG}px;
    background: ${token.colorBgContainer};
  `,
  title: css`
    white-space: nowrap;
  `
}))
