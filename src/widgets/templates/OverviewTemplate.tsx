import { Input, TabsProps } from 'antd'
import { PropsWithChildren, ReactNode } from 'react'

import { OverviewFilterSection } from '../search/OverviewFilterSection'
import { BasePageTemplate } from './BasePageTemplate'

export interface OverviewTemplateProps {
  title: ReactNode
}

const items: TabsProps['items'] = []

export function OverviewTemplate({
  title,
  children,
}: PropsWithChildren<OverviewTemplateProps>) {
  return (
    <BasePageTemplate title={title}>
      <OverviewFilterSection />

      {children}
    </BasePageTemplate>
  )
}
