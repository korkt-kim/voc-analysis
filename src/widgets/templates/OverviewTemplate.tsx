import { PropsWithChildren, ReactNode } from 'react'

import { OverviewRouteTab } from '@/features'

import { OverviewFilterSection } from '../search/OverviewFilterSection'
import { BasePageTemplate } from './BasePageTemplate'

export interface OverviewTemplateProps {
  title: ReactNode
}

export function OverviewTemplate({
  title,
  children,
}: PropsWithChildren<OverviewTemplateProps>) {
  return (
    <BasePageTemplate title={title}>
      <OverviewFilterSection />
      <OverviewRouteTab />
      {children}
    </BasePageTemplate>
  )
}
