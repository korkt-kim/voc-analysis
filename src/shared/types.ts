/* eslint-disable @typescript-eslint/no-explicit-any */
import { Models } from './consts'

export type Model = (typeof Models)[number]

export interface VOC {
  author: string
  email: string
  category: string
  division: string
  gubun: 'KO' | 'US'
  model: Model
  title: string
  detail: string
  attachments: string
}

export type QueryParams<TObj = any> = TObj extends JSONObject
  ?
      | SelectFilter<TObj>
      | OrderFilter<TObj>
      | EqualityFilter<TObj>
      | InequalityFilter<TObj>
      | SetFilter<TObj>
      | FullTextFilter<TObj>
      | SubsetFilter<TObj>
      | ExistanceFilter<TObj>
      | RangeFilter<TObj>
      | LocationFilter<TObj>
      | FixedPagedOptions
      | FixedQueryOptions
      | JSONObject
  : any

type SelectFilter<TObj extends JSONObject> = {
  select?: Leaves<TObj>[]
}
type OrderFilter<TObj extends JSONObject> = {
  order?: (Leaves<TObj> | `-${Leaves<TObj>}`)[]
}
type EqualityFilter<TObj extends JSONObject> = ConditionalQueries<TObj>
type InequalityFilter<TObj extends JSONObject> = ConditionalQueries<
  TObj,
  '[ne]'
>
type SetFilter<TObj extends JSONObject> = ConditionalQueries<
  TObj,
  '[all]',
  (string | number)[]
>
type FullTextFilter<TObj extends JSONObject> = ConditionalQueries<
  TObj,
  '[match]',
  string
>
type SubsetFilter<TObj extends JSONObject> =
  | ConditionalQueries<TObj, '[in]', (string | number)[]>
  | ConditionalQueries<TObj, '[nin]', (string | number)[]>
type ExistanceFilter<TObj extends JSONObject> = ConditionalQueries<
  TObj,
  '[exists]',
  boolean
>
type RangeFilter<TObj extends JSONObject> =
  | ConditionalQueries<TObj, '[lt]'>
  | ConditionalQueries<TObj, '[lte]'>
  | ConditionalQueries<TObj, '[gt]'>
  | ConditionalQueries<TObj, '[gte]'>
type LocationFilter<TObj extends JSONObject> =
  | ConditionalQueries<TObj, '[near]', [latitude: number, longitude: number]>
  | ConditionalQueries<
      TObj,
      '[within]',
      | [
          blLatitude: number,
          blLongitude: number,
          trLatitude: number,
          trLongitude: number,
        ]
      | [latitude: number, longitude: number, radius: number]
    >
type FixedPagedOptions = {
  skip?: number
  limit?: number
}
type FixedQueryOptions = {
  include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  query?: string
}

type JSONObject = Record<string, any>
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never
type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]]
type Leaves<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends Array<never>
    ? ''
    : T extends JSONObject
      ? {
          [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>>
        }[keyof T]
      : ''

type ConditionalQueries<
  TObj extends JSONObject = JSONObject,
  TQueryFilter extends string = '',
  TValue = string | number,
> = {
  [FieldName in Leaves<TObj> as `${string & FieldName}${TQueryFilter}`]?: TValue
}
