import { AxiosInstance, AxiosResponse } from 'axios'
import { assign, isFunction, isNil, pickBy, range, set } from 'lodash-es'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getAllContent<
  TResponse extends {
    [key: string]: any
  },
>({
  http,
  maxTries,
  queryResult,
}: {
  http: AxiosInstance
  maxTries: number
  queryResult:
    | Promise<AxiosResponse<TResponse>>
    | (() => Promise<AxiosResponse<TResponse>>)
    | null
}) {
  const list: Array<AxiosResponse<TResponse>> = []

  let nextUrl = ''

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of range(maxTries)) {
    let res: AxiosResponse<TResponse, any> | null = null

    if (nextUrl) {
      res = await http.get<TResponse>(nextUrl.replace(/^\/api/, ''))
    } else {
      if (typeof queryResult === 'function') {
        res = await queryResult()
      } else {
        res = await queryResult
      }
    }

    if (isNil(res)) {
      break
    }

    list.push(res)

    if (res.config.url) {
      const url = new URL(res.config.url, res.config.baseURL)

      url.searchParams.set(
        'page',
        isNil(url.searchParams.get('page'))
          ? '2'
          : (Number(url.searchParams.get('page')) + 1).toString()
      )

      nextUrl = url.toString()
    }
  }

  const result = {
    items: [],
  } as any as AxiosResponse<TResponse>['data']

  for (const { data } of list) {
    assign(result, pickBy(data, isFunction))

    result.items.push(...data.items)

    for (const resourceName in data.include) {
      const list = data.include[resourceName]

      for (const resource of list) {
        const id = resource.sys.id

        if (!id) {
          continue
        }

        set(result, ['include', resourceName, id], resource)
      }
    }
  }

  return result
}
