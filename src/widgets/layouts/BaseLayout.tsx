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
  getItem('Search', '/search', { pathname: '/search' }, <SearchOutlined />),
  getItem('Setting', '/setting', { pathname: '/setting' }, <SettingOutlined />),
]

export const BaseLayout = (page: JSX.Element) => {
  const router = useRouter()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const selectedKeys = [router.pathname]

  return (
    <Layout>
      <Layout.Sider width={200} style={{ background: colorBgContainer }}>
        <ModelSelect />
        <Menu
          selectedKeys={selectedKeys}
          style={{ height: '100%', borderRight: 0 }}
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
      <Layout style={{ padding: '0 24px 24px' }}>
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
