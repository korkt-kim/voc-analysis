import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

export interface InsightSearchInputProps {
  onSearch: SearchProps['onSearch']
}

export const InsightSearchInput = memo(
  ({ onSearch }: InsightSearchInputProps) => {
    return (
      <Input.Search
        placeholder='인사이트를 얻기위한 메세지를 입력해주세요. ex) 2024년 부정적인 이슈들 모음'
        onSearch={onSearch}
      />
    )
  }
)
