import styled from '@emotion/styled'
import { GlobalToken, theme, Typography } from 'antd'
import { ComponentProps, PropsWithChildren, ReactNode } from 'react'

export interface BasePageTemplateProps {
  title: ReactNode
}

export const BasePageTemplate = ({
  children,
  title,
}: PropsWithChildren<BasePageTemplateProps>) => {
  const { token } = theme.useToken()

  return (
    <BasePageTemplateWrapper>
      <TitleWrapper token={token}>
        <Typography.Title level={3}>{title}</Typography.Title>
      </TitleWrapper>
      <ContentWrapper token={token}>{children}</ContentWrapper>
    </BasePageTemplateWrapper>
  )
}

const BasePageTemplateWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`
const TitleWrapper = styled.div<ComponentProps<'div'> & { token: GlobalToken }>`
  margin: ${props => `0 0 ${props.token.marginXL}px 0`};
`

const ContentWrapper = styled.div<
  ComponentProps<'div'> & { token: GlobalToken }
>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  backgroundcolor: ${props => (props.token.colorBgBase ? 'asdf' : 'qwer')};
`
