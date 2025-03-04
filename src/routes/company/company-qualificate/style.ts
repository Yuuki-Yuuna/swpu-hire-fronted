import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    border-radius: ${token.borderRadiusLG}px;
    background: ${token.colorBgContainer};
  `,
  title: css`
    font-size: 18px;
    font-weight: 700;
  `,
  itemTitle: css`
    color: ${token.colorTextTertiary}
  `
}))
