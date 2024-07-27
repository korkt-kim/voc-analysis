import { TableProps, theme } from 'antd'
import { flatMap, groupBy, map, pick, uniq } from 'lodash-es'
import { useCallback } from 'react'

const getAllNames = (
  data: {
    category: string
    value: { name: string; value: number }[]
  }[]
) => uniq(data.flatMap(({ value }) => value.map(({ name }) => name)))

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
  chartType: 'pie' | 'bar' | 'line' | 'semi-pie' | 'table',
  data: {
    category: string
    value: { name: string; value: number }[]
  }[],
  color?: Record<string, string>
) => {
  const { token } = theme.useToken()

  return useCallback(() => {
    const categories = data.map(item => item.category)
    const values = data.map(item => item.value)
    const allNames = getAllNames(data)

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
          graph: {
            color: color,
          },
        }
      case 'semi-pie':
        return {
          tooltip: { show: true },
          series: [
            {
              radius: ['50%', '70%'],
              label: {
                show: false,
                position: 'center',
              },
              legend: { show: true },
              type: 'pie',
              data: data.map(item => ({
                value: item.value[0].value,
                name: item.category,
                itemStyle: { color: color?.[item.category] },
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
            ...allNames.map(name => {
              return {
                title: name,
                dataIndex: name,
                key: name,
              }
            }),
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

              allNames.map(name => {
                temp[name] = item.value.find(i => i.name === name)?.value ?? 0
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
  }, [chartType, color, data, token.colorLink])
}
