import type { GlobalToken } from 'antd'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends GlobalToken {}
}

declare module 'next' {
  export declare type NextPageWithLayout<
    P = Record<string, unknown>,
    IP = P,
  > = NextPage<P, IP> & {
    getLayout: (component: JSX.Element) => JSX.Element
  }
}
