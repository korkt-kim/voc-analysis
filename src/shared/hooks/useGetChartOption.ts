import { TableProps, theme } from 'antd'
import { flatMap, groupBy, map, pick } from 'lodash-es'
import { useCallback } from 'react'

const groupByName = (
  values: { name: string; value: number }[][],
  type: string
) => {
  const names = Array.from(new Set(flatMap(values).map(item => item.name)))

  return map(
    groupBy(
      flatMap(
        values.map(value => {
          names.forEach(name => {
            if (
              !value.some(({ name: _name }) => {
                return _name === name
              })
            ) {
              value.push({ name, value: 0 })
            }
          })

          return value
        })
      ),
      'name'
    ),
    (items, name) => ({
      name,
      data: items.map(item => item.value),
      type,
    })
  )
}

export const useGetChartOption = (
  chartType: string,
  data: { category: string; value: { name: string; value: number }[] }[]
) => {
  const { token } = theme.useToken()

  return useCallback(() => {
    const categories = data.map(item => item.category)
    const values = data.map(item => item.value)

    switch (chartType) {
      case 'bar':
        return {
          cursor: 'default',
          legend: { show: true },
          tooltip: { show: true },
          xAxis: { type: 'category', data: categories },
          yAxis: {
            type: 'value',
            minInterval: 1,
          },
          series: groupByName(values, chartType),
        }
      case 'line':
        return {
          legend: { show: true },
          tooltip: { show: true },
          xAxis: { type: 'category', data: categories },
          yAxis: { type: 'value', minInterval: 1 },
          series: groupByName(values, chartType),
        }
      case 'pie':
        return {
          tooltip: { show: true },
          series: [
            {
              legend: { show: true },
              type: 'pie',
              data: data.map(item => ({
                value: item.value[0].value,
                name: item.category,
              })),
              cursor: 'default',
              emphasis: {
                scale: false,
                itemStyle: { borderWidth: 2, borderColor: token.colorLink },
              },
            },
          ],
        }
      case 'table':
        return {
          columns: [
            { title: 'CreatedAt', dataIndex: 'category', key: 'category' },
            ...data.reduce(
              (acc, item) => {
                const names = item.value.map(a => a.name)
                return Array.from(
                  new Set([...acc.map(item => item.title), ...names])
                ).map(item => ({
                  title: item,
                  dataIndex: item.toLowerCase(),
                  key: item.toLowerCase(),
                }))
              },
              [] as { title: string; dataIndex: string; key: string }[]
            ),
          ],
          pagination: {
            position: ['bottomCenter'],
            pageSize: 5,
          } as TableProps['pagination'],
          rowKey: 'category',
          dataSource: data.reduce(
            (acc, item) => {
              const temp = pick(item, 'category') as {
                category: string
              } & Record<string, number>
              item.value.forEach(({ name, value }) => {
                temp[name.toLowerCase()] = value
              })
              acc.push(temp)
              return acc
            },

            [] as ({ category: string } & Record<string, number>)[]
          ),
        }
      default:
        return {}
    }
  }, [chartType, data, token.colorLink])
}
