import { Col, Flex, Form, Row, theme } from 'antd'

import { TopRankedSearchInputs } from '@/entities/search/TopRankedSearchInputs'
import {
  OverviewDateRange,
  OverviewFilter,
  OverviewSearchInput,
} from '@/features'

export const OverviewFilterSection = () => {
  const { token } = theme.useToken()

  return (
    <Form>
      <Flex vertical gap='small'>
        <Row justify='center'>
          <Col flex='500px'>
            <Form.Item label='Search'>
              <OverviewSearchInput />
              <TopRankedSearchInputs n={3} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify='center' gutter={token.marginXL}>
          <Col span={11}>
            <Form.Item label='Filter' name='filter'>
              <OverviewFilter />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label='Date' name='dateRange'>
              <OverviewDateRange />
            </Form.Item>
          </Col>
        </Row>
      </Flex>
    </Form>
  )
}
