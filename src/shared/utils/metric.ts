import { groupBy } from 'lodash-es'

import { dayjs } from '../lib/dayjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupDataBy = <T extends { createdAt: string }>(
  data: T[],
  unit: 'day' | 'week' | 'month',
  groupByAttribute?: keyof T
) => {
  const grouped = groupBy(data, item => {
    return dayjs(item.createdAt).startOf(unit).format('YYYY-MM-DD')
  })

  return Object.keys(grouped)
    .map(key => ({
      category: key,
      value:
        typeof groupByAttribute !== 'undefined'
          ? (groupBy(grouped[key], groupByAttribute) as { [key: string]: T[] })
          : grouped[key],
    }))
    .sort((a, b) => dayjs(a.category).diff(dayjs(b.category)))
}
