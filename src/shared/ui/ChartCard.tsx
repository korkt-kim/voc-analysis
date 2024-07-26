import { Card, CardProps, theme } from 'antd'
import { memo, useMemo } from 'react'

export const ChartCard = memo(function ChartCard({
  styles,
  style,
  ...props
}: CardProps) {
  const { token } = theme.useToken()

  const _styles = useMemo(() => {
    return {
      header: {
        minHeight: 48,
        backgroundColor: token.colorFillAlter,
        borderBottomColor: token.colorSplit,
        ...styles?.header,
      },
      body: styles?.body,
    }
  }, [styles?.body, styles?.header, token])

  return (
    <Card
      bordered
      style={{ borderColor: token.colorBorder, ...style }}
      {...props}
      styles={_styles}
    />
  )
})
