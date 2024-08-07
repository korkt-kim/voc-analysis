import { Input } from 'antd'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

export const OverviewSearchInput = memo(() => {
  const router = useRouter()
  const [value, setValue] = useState('')

  const {
    push,
    query: { searchText },
  } = router

  const onSearch = useCallback(
    (value: string) => {
      push({ query: { searchText: value } })
    },
    [push]
  )

  useEffect(() => {
    setValue(searchText as string)
  }, [searchText])

  return (
    <Input.Search
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder='검색어를 입력해주세요. ex) 에어컨 고장'
      onSearch={onSearch}
    />
  )
})
