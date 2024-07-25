import {
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Layout, Menu, MenuProps, theme } from 'antd'
import { useRouter } from 'next/router'

import { ModelSelect } from '@/features'

import { findMenuFromMenuClickEvent, getItem } from './lib'

const menuItems: MenuProps['items'] = [
  getItem('Overview', '/', { pathname: '/' }, <HomeOutlined />),
  getItem('Insight', '/insight', { pathname: '/insight' }, <SearchOutlined />),
]

export const BaseLayout = (page: JSX.Element) => {
  const router = useRouter()
  const {
    token: { colorBgContainer, borderRadiusLG, paddingXS },
  } = theme.useToken()
  const selectedKeys = [router.pathname]

  return (
    <Layout style={{ minWidth: 1200, minHeight: '100dvh' }}>
      <Layout.Sider width={200} style={{ background: colorBgContainer }}>
        <ModelSelect />
        <Menu
          selectedKeys={selectedKeys}
          style={{ borderRight: 0 }}
          items={menuItems}
          onClick={e => {
            const href = findMenuFromMenuClickEvent(menuItems, e)?.href

            if (!href) {
              return
            }

            router.push(href)
          }}
        />
      </Layout.Sider>
      <Layout style={{ padding: `0  0 0 ${paddingXS}px` }}>
        <Layout.Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          {page}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
