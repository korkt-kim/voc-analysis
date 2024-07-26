import { CloseOutlined, RiseOutlined } from '@ant-design/icons'
import { Button, Collapse, Flex, Typography } from 'antd'
import { uniqueId } from 'lodash-es'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { IssueList } from '@/entities'
import { SummarizeCollapse } from '@/entities/metric/SummarizeCollapse'
import { useOverviewStore } from '@/shared'
import { BaseLayout } from '@/widgets'
import { OverviewTemplate } from '@/widgets/templates/OverviewTemplate'

const Title = 'Overview - Voc List'

export default function Page(): NextPageWithLayout {
  const {
    query: { searchText },
  } = useRouter()
  const { filter, dateRange } = useOverviewStore()
  const [show, setShow] = useState(false)

  const onClickSummarize = () => {
    setShow(true)
  }

  useEffect(() => {
    setShow(false)
  }, [searchText, filter, dateRange])

  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>

      <OverviewTemplate title={Title}>
        <Flex vertical gap='large'>
          <Flex justify='flex-end'>
            <Button icon={<RiseOutlined />} onClick={onClickSummarize}>
              Summarize
            </Button>
          </Flex>
          {show && <SummarizeCollapse />}
          <IssueList />
        </Flex>
      </OverviewTemplate>
    </>
  )
}

Page.getLayout = BaseLayout
