import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 24px;
    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
  `,
  title: css`
    position: relative;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 32px;
      height: 4px;
      border-radius: 6px;
      background: ${token.colorPrimary}
    }
  `,
  desc: css`
    color: ${token.colorTextTertiary}
  `,
  itemTitle: css`
    color: ${token.colorTextTertiary}
  `,
  block: css`
    margin-bottom: 12px;
  `,
  textArea: css`
    white-space: pre-line;
  `
}))
