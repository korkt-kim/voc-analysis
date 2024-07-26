import { Col, DatePicker, Row, Select, theme } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { Dayjs } from 'dayjs'
import { memo, useCallback, useMemo, useState } from 'react'

import { dayjs } from '@/shared'

export interface DateRangeFormValue {
  start: Dayjs | null
  end: Dayjs | null
}

export interface DateRangeProps
  extends Omit<RangePickerProps, 'value' | 'onChange'> {
  value?: DateRangeFormValue
  onChange?: (args: DateRangeFormValue | null) => void
  minDuration?: string | null
  maxDuration?: string
}

export const DateRange = memo(
  ({
    value: _value,
    onChange,
    minDuration,
    maxDuration,
    ...props
  }: DateRangeProps) => {
    const { token } = theme.useToken()

    const init = handleInputValue(_value)

    const [value, setValue] = useState<DateRangeFormValue | null>(init.value)
    const [range, setRange] = useState<PresetRange | null>(init.range)
    const [isOpen, setIsOpen] = useState(false)

    const { presets, minDate, maxDate } = useMemo(() => {
      const now = dayjs()

      return {
        presets: [
          { label: 'Last Week', value: [now.add(-1, 'week'), now] },
          { label: 'Last Month', value: [now.add(-1, 'month'), now] },
          { label: 'Last Year', value: [now.add(-1, 'year'), now] },
        ] as RangePickerProps['presets'],
        ...(maxDuration
          ? {
              minDate: now.subtract(dayjs.duration(maxDuration)).startOf('day'),
            }
          : {}),
        maxDate: now.endOf('day'),
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxDuration, minDuration, isOpen])

    const onSelectChange = useCallback(
      (range: PresetRange) => {
        const now = dayjs()
        const start = now.subtract(dayjs.duration(range))
        const value = { start, end: now } as const

        setRange(range)
        setValue(value)
        onChange?.(value)
      },
      [onChange]
    )

    const onChangeRangePicker = useCallback<
      NonNullable<RangePickerProps['onChange']>
    >(
      props => {
        const [start, end] = props ?? []

        if (!start) {
          setRange(null)
          setValue(null)
          onChange?.(null)
          return
        }

        if (!end) {
          setRange(null)
          setValue(null)
          onChange?.(null)
          return
        }

        if (start.isAfter(end) || end.isBefore(start)) {
          return
        }

        const diff = dayjs
          .duration(end.set('ms', 0).diff(start.set('ms', 0)))
          .toISOString()

        const isPreset = PickerOptions.find(({ value }) => value === diff)

        setRange(isPreset ? (diff as PresetRange) : 'Custom')
        setValue({ start, end })
        onChange?.({ start, end })
      },
      [onChange]
    )

    return (
      <Row gutter={token.marginXS}>
        <Col span={8}>
          <Select
            style={{ width: '100%' }}
            value={range}
            onChange={onSelectChange}
            options={PickerOptions.map(item => ({
              ...item,
              disabled: minDate
                ? dayjs.duration(item.value).asMilliseconds() >
                  dayjs().diff(minDate)
                : false,
            }))}
          />
        </Col>
        <Col span={16}>
          <DatePicker.RangePicker
            allowEmpty
            allowClear={false}
            picker='date'
            presets={presets}
            minDate={minDate}
            maxDate={maxDate}
            open={isOpen}
            onOpenChange={setIsOpen}
            value={useMemo(
              () => (value ? [value.start, value.end] : null),
              [value]
            )}
            onChange={onChangeRangePicker}
            style={{ width: '100%' }}
            {...props}
          />
        </Col>
      </Row>
    )
  }
)

function handleInputValue(value?: DateRangeFormValue) {
  if (!value) {
    return { value: null, range: null }
  }

  if (!value.start || !value.end) {
    return { value, range: null }
  }

  let diff = dayjs.duration(value.end.diff(value.start)).toISOString()
  // 윤년 처리. P1Y는 365일이 1년으로 처리되고 add, subtract/add는 366일도 1년으로 처리됨
  if (
    dayjs(value.end).isLeapYear() &&
    dayjs(value.start).add(1, 'year').isSame(value.end)
  ) {
    diff = 'P1Y'
  }

  const isPreset = PickerOptions.find(({ value }) => value === diff)

  return {
    range: isPreset ? (diff as PresetRange) : 'Custom',
    value,
  }
}

type PresetRange = 'P7D' | 'P30D' | 'P1Y' | 'Custom'

const PickerOptions: {
  label: string
  value: PresetRange
}[] = [
  { label: '1 Week', value: 'P7D' },
  { label: '1 Month', value: 'P30D' },
  { label: '1 Year', value: 'P1Y' },
]

export const getDefaultDateRangeFormValue = (baseDuration?: string) => {
  const now = dayjs()

  return {
    start: baseDuration
      ? now.subtract(dayjs.duration(baseDuration))
      : dayjs().subtract(12, 'hours'),
    end: now,
  } as const
}
