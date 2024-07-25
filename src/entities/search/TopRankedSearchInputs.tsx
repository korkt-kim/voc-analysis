import { Col, Divider, Flex, Row, Skeleton, theme, Typography } from 'antd'
import Link from 'next/link'
import { Fragment } from 'react'

import { useMetricStore } from '@/shared'

import { useGetSearchHistory } from './api/search-query'

export interface TopRankedSearchInputsProps {
  n: number
}

export const TopRankedSearchInputs = ({ n }: { n: number }) => {
  const { selectedModel } = useMetricStore()
  const { data, isLoading } = useGetSearchHistory(
    selectedModel === 'total' ? undefined : selectedModel,
    { order: ['hits'], limit: n }
  )
  const { token } = theme.useToken()

  //   if (isLoading) {
  //     return (
  //       <>
  //         <Row justify='start' align='middle'>
  //           {new Array(n).fill(null).map((_, index) => (
  //             <Fragment key={index}>
  //               <Col>
  //                 <Skeleton.Input size='small' />
  //               </Col>
  //             </Fragment>
  //           ))}
  //         </Row>
  //       </>
  //     )
  //   }

  return (
    <Row gutter={token.margin} align='middle'>
      <Col span={5}>
        <Typography.Text
          ellipsis
          style={{ fontWeight: token.fontWeightStrong }}>
          인기검색어
        </Typography.Text>
      </Col>
      <Col span={19}>
        {isLoading ? (
          <Row justify='start' align='middle'>
            {new Array(n).fill(null).map((_, index) => (
              <Col key={index} span={24 / n}>
                <Flex align='center'>
                  <Skeleton.Input
                    active
                    size='small'
                    block
                    style={{ width: `calc(100%)` }}
                  />
                  {index < n - 1 && <Divider type='vertical' />}
                </Flex>
              </Col>
            ))}
          </Row>
        ) : (
          <Row justify='start' align='middle'>
            {data?.data.map((item, index) => (
              <Col key={index}>
                <Link href={{ query: { searchText: item.search } }}>
                  {item.search}
                </Link>
                {index < n - 1 && <Divider type='vertical' />}
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  )
}
