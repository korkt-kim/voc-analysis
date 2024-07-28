import { Typography } from 'antd'
import { useEffect, useState } from 'react'

import { useMetricStore } from '@/shared'

export const Summary = () => {
  const { selectedModel } = useMetricStore()
  const [events, setEvents] = useState<string[]>([])

  const model = selectedModel === 'total' ? undefined : selectedModel
  useEffect(() => {
    const eventSource = new EventSource(
      model
        ? `http://www.example.com/api/${model}/history/summary`
        : 'http://www.example.com/api/history/summary'
    )

    eventSource.onmessage = event => {
      setEvents([event.data])
    }

    eventSource.onerror = () => {
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [model])

  return (
    <Typography.Paragraph>
      <div
        dangerouslySetInnerHTML={{
          __html: events,
        }}></div>
    </Typography.Paragraph>
  )
}
