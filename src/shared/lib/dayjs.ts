import _dayjs, { extend } from 'dayjs'
import duration from 'dayjs/plugin/duration'

extend(duration)

export const dayjs = _dayjs
