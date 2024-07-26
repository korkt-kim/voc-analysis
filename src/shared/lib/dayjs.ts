import _dayjs, { extend } from 'dayjs'
import duration from 'dayjs/plugin/duration'
// 윤년 계산을 위한 plugin
import isLeapYear from 'dayjs/plugin/isLeapYear'

extend(duration)
extend(isLeapYear)

export const dayjs = _dayjs
