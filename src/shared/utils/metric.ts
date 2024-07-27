import { groupBy } from 'lodash-es'

import { dayjs } from '../lib/dayjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupDataBy = <T extends { createdAt: string }>(
  data: T[],
  categoryAttribute: keyof T | 'day' | 'week' | 'month',
  groupByAttribute?: keyof T
) => {
  const grouped = groupBy(data, item => {
    if (
      categoryAttribute === 'day' ||
      categoryAttribute === 'week' ||
      categoryAttribute === 'month'
    ) {
      return dayjs(item.createdAt)
        .startOf(categoryAttribute)
        .format('YYYY-MM-DD')
    } else {
      return item[categoryAttribute]
    }
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
