import { useCallback } from 'react'

import { DateRange, DateRangeFormValue } from '@/entities'
import { dayjs, useOverviewStore } from '@/shared'

export const OverviewDateRange = () => {
  const {
    dateRange,
    action: { setDateRange },
  } = useOverviewStore()

  const onChange = useCallback(
    (props: DateRangeFormValue | null) => {
      setDateRange({
        start: props?.start?.toString() ?? dateRange.start,
        end: props?.end?.toString() ?? dateRange.end,
      })
    },
    [dateRange.end, dateRange.start, setDateRange]
  )

  return (
    <DateRange
      value={{ start: dayjs(dateRange.start), end: dayjs(dateRange.end) }}
      onChange={onChange}
    />
  )
}
