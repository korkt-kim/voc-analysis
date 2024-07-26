import { css } from '@emotion/css'
import { Cascader, theme } from 'antd'
import { useMemo } from 'react'

import { Labels, Sentiments, useMetricStore, useOverviewStore } from '@/shared'

import { useGetInfiniteTags } from './api/tag-query'
import { useGetInfiniteUsers } from './api/user-query'

interface Option {
  value: string | number
  label: string
  children?: Option[]
  disableCheckbox?: boolean
  isLeaf?: boolean
}

export const OverviewFilter = () => {
  const { selectedModel } = useMetricStore()
  const {
    filter,
    action: { setFilter },
  } = useOverviewStore()
  const { token } = theme.useToken()

  const model = selectedModel === 'total' ? undefined : selectedModel
  // get Authors, get Tags, Asignees, types
  const asignees = useGetInfiniteUsers(model, { type: 'employee' })
  const authors = useGetInfiniteUsers(model, { type: 'user' })
  const tags = useGetInfiniteTags(model)

  const options: Option[] = useMemo(() => {
    return [
      {
        label: 'Asignees',
        value: 'asignees',

        children: asignees.data?.pages.flatMap(page => {
          return page.data.flatMap(data => ({
            value: data.id,
            label: data.username,
            isLeaf: true,
          }))
        }),
      },
      {
        label: 'Authors',
        value: 'authors',
        children: authors.data?.pages.flatMap(page => {
          return page.data.flatMap(data => ({
            value: data.id,
            label: data.username,
            isLeaf: true,
          }))
        }),
      },
      {
        label: 'Tags',
        value: 'tags',
        children: tags.data?.pages.flatMap(page => {
          return page.data.flatMap(data => ({
            value: data.id,
            label: data.tagName,
            isLeaf: true,
          }))
        }),
      },
      {
        label: 'Labels',
        value: 'labels',
        children: Labels.map(label => ({
          value: label,
          label,
          isLeaf: true,
        })),
      },
      {
        label: 'Sentiments',
        value: 'sentiments',
        children: Sentiments.map(label => ({
          value: label,
          label,
          isLeaf: true,
        })),
      },
    ]
  }, [asignees.data?.pages, authors.data?.pages, tags.data?.pages])

  const onChange = (_value: (string | number)[][]) => {
    setFilter(
      _value.reduce<(string | number)[][]>((acc, value) => {
        const index = acc.findIndex(ac => {
          return ac.some((a, index) => value[index] === a)
        })
        if (index >= 0) {
          acc.splice(index, 1)
        }
        return [...acc, value]
      }, [])
    )
  }

  return (
    <Cascader
      popupClassName={css`
        .ant-cascader-checkbox {
          display: none;
        }

        .ant-cascader-menu-item[aria-checked='true']:has([data-leaf='true']) {
          color: ${token.colorPrimary};
        }
      `}
      value={filter}
      style={{ width: '100%' }}
      multiple
      options={options}
      showCheckedStrategy={Cascader.SHOW_CHILD}
      displayRender={labels => {
        return labels.join(' / ')
      }}
      dropdownRender={menu => {
        return menu
      }}
      optionRender={item => {
        return <div data-leaf={item.isLeaf}>{item.label}</div>
      }}
      onChange={onChange}
    />
  )
}
