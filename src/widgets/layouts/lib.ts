import { MenuProps } from 'antd'
import { LinkProps } from 'next/link'

export type MenuItem = Required<MenuProps>['items'][number]

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  href?: LinkProps['href'],
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  disabled?: boolean
): MenuItem {
  return {
    key,
    icon,
    href,
    children,
    label,
    type,
    disabled,
  } as MenuItem
}

export function findMenuFromMenuClickEvent(
  menu: MenuProps['items'],
  e: Parameters<NonNullable<MenuProps['onClick']>>[0]
) {
  let children = menu
  let item: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (NonNullable<MenuProps['items']>[number] & { [key: string]: any }) | null =
    null

  for (const key of e.keyPath.reverse()) {
    const cur = children?.find(el => el?.key === key)

    if (!cur) {
      return null
    }

    item = cur

    if ('children' in cur) {
      children = cur.children
    }
  }

  return item
}
