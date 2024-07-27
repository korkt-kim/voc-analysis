import { Collapse } from 'antd'

import { Summary } from '@/entities'

export const SummarizeCollapse = () => {
  return (
    <Collapse
      defaultActiveKey='1'
      items={[
        {
          key: '1',
          label: 'Summarize',
          children: <Summary />,
        },
      ]}
    />
  )
}
