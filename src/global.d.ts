import type { GlobalToken } from 'antd'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends GlobalToken {}
}
