import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { Flex } from 'antd'

import { Sentiments } from '../consts'

export interface SentimentTagProps {
  sentiment: (typeof Sentiments)[number]
}

export const SentimentTag = ({ sentiment }: SentimentTagProps) => {
  switch (sentiment) {
    case 'critical':
      return (
        <Wrapper align='center' gap='small'>
          <FrownOutlined style={{ color: 'red' }} /> {sentiment}
        </Wrapper>
      )
    case 'negative':
      return (
        <Wrapper align='center' gap='small'>
          <FrownOutlined style={{ color: 'orange' }} /> {sentiment}
        </Wrapper>
      )
    case 'neutral':
      return (
        <Wrapper align='center' gap='small'>
          <MehOutlined /> {sentiment}
        </Wrapper>
      )
    case 'positive':
      return (
        <Wrapper align='center' gap='small'>
          <SmileOutlined style={{ color: 'green' }} /> {sentiment}
        </Wrapper>
      )
    default:
      return <span>{sentiment}</span>
  }
}

const Wrapper = styled(Flex)`
  display: inline-block;
`
