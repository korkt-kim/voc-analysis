import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import { Route } from 'nextjs-routes'

const TAB_ITEMS: { key: string; label: string; route: Route }[] = [
  {
    key: 'analysis',
    label: 'Analysis',
    route: { pathname: '/analysis' },
  },
  {
    key: 'issues',
    label: 'Issues',
    route: { pathname: '/issues' },
  },
]

export const OverviewRouteTab = () => {
  const router = useRouter()

  const activeKey = TAB_ITEMS.find(
    item => item.route.pathname === router.pathname
  )?.key

  const onKeyChange = (key: string) => {
    const route = TAB_ITEMS?.find(item => item.key === key)?.route

    if (!route) {
      return
    }

    router.push(route)
  }

  return (
    <Tabs
      activeKey={activeKey}
      items={TAB_ITEMS}
      defaultActiveKey={activeKey}
      onChange={onKeyChange}
    />
  )
}
