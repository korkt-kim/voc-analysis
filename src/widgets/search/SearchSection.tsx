import { Flex } from 'antd'

import { TopRankedSearchInputs } from '@/entities/search/TopRankedSearchInputs'
import { SearchInput } from '@/features/search/SearchInput'

const TopRankSearchCount = 3

export const SearchSection = () => {
  return (
    <Flex gap='small' vertical style={{ maxWidth: 500 }}>
      <SearchInput />
      <TopRankedSearchInputs n={TopRankSearchCount} />
    </Flex>
  )
}
