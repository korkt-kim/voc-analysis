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
    <Flex gap='large'>
      <Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
        인기 검색어
      </Typography.Text>
      {isLoading ? (
        <Row justify='start' align='middle'>
          {new Array(n).fill(null).map((_, index) => (
            <Col key={index}>
              <Skeleton.Input size='small' style={{ width: '30%' }} />
              {index < n - 1 && <Divider type='vertical' />}
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
    </Flex>
  )
}
