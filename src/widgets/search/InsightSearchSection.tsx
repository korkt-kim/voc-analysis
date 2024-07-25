import { Flex } from 'antd'

import { SearchInput } from '@/features/search/SearchInput'

export const InsightSearchSection = () => {
  return (
    <Flex gap='small' vertical style={{ maxWidth: 500 }}>
      <SearchInput />
    </Flex>
  )
}
