import { Input } from 'antd'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

export const SearchInput = memo(() => {
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
      placeholder='에어컨 고장'
      onSearch={onSearch}
    />
  )
})
