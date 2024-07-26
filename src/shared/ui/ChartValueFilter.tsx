import { Tree, TreeProps } from 'antd'
import { produce } from 'immer'
import { sortBy, uniqBy } from 'lodash-es'
import { Key, useEffect, useState } from 'react'

import { useDeepEffect } from '../hooks/useDeepEffect'

export interface ChartValueFilterProps {
  checkedKeys?: Key[]
  onChange?: (value: Key[]) => void
  defaultCheckedKeys?: Key[]
  baseTreeData: NonNullable<TreeProps['treeData']>
}

export const ChartValueFilter = ({
  baseTreeData,
  defaultCheckedKeys,
  onChange,
  checkedKeys,
}: ChartValueFilterProps) => {
  //   const baseTreeData: NonNullable<TreeProps['treeData']> = [
  //     {
  //       title: 'Total',
  //       key: '0',
  //       disabled: true,
  //       checkable: false,
  //       children: [{ title: 'All', key: 'Total' }],
  //     },
  //     {
  //       title: 'Success',
  //       key: '1',
  //       disabled: true,
  //       checkable: false,
  //       children: [{ title: 'All', key: 'Success' }],
  //     },
  //     {
  //       title: 'Failure',
  //       key: '2',
  //       disabled: true,
  //       checkable: false,
  //       children: [{ title: 'All', key: 'Failure' }],
  //     },
  //   ]
  //   const DEFAULT_TREE_ROOTS: Key[] = ['Total', 'Success', 'Failure']

  const [treeData, setTreeData] = useState(baseTreeData)
  const [_checkedKeys, _setCheckedKeys] = useState<Key[]>(
    defaultCheckedKeys ?? baseTreeData.map(item => item.key)
  )

  useEffect(() => {
    setTreeData(baseTreeData)
  }, [baseTreeData])

  //   useDeepEffect(() => {
  //     if (countsByStatusCode.isFetching) {
  //       return
  //     }

  //     setTreeData(
  //       produce(baseTreeData, draft => {
  //         if (!draft) {
  //           return
  //         }

  //         for (const code of statusCodes) {
  //           if (Number(code) < 400) {
  //             draft[1].children = uniqBy(
  //               [...(draft[1]?.children ?? []), { title: code, key: code }],
  //               item => item.key
  //             )
  //           } else {
  //             draft[2].children = uniqBy(
  //               [...(draft[2]?.children ?? []), { title: code, key: code }],
  //               item => item.key
  //             )
  //           }
  //         }
  //       })
  //     )
  //   }, [statusCodes, countsByStatusCode.isFetching])

  return (
    // <ChartCard
    //   styles={{ body: { height: 260 } }}
    //   title={<Typography.Title level={5}>Status Code</Typography.Title>}
    //   css={{
    //     '.ant-tree-switcher': {
    //       display: 'none',
    //     },
    //     '.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper': {
    //       cursor: 'default',
    //       color: token.colorText,
    //     },
    //   }}>
    <Tree
      checkable
      selectable={false}
      defaultExpandAll
      treeData={treeData}
      checkedKeys={checkedKeys ?? _checkedKeys}
      onCheck={(e, info) => {
        if (info.nativeEvent.metaKey || info.nativeEvent.ctrlKey) {
          _setCheckedKeys([info.node.key])
          onChange?.([info.node.key])
          return
        }
        if (Array.isArray(e)) {
          const newCheckedKeys = sortBy(e, [
            key => {
              const idx = baseTreeData.findIndex(base => base.title === key)

              if (idx < 0) {
                return Number(e)
              }

              return idx
            },
          ])

          _setCheckedKeys(newCheckedKeys)
          onChange?.(newCheckedKeys)
        }
      }}
    />
  )
}
