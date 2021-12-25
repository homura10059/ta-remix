import cx from 'classnames'
import React, { useEffect, useState } from 'react'

import { Item } from '../../../domain/models'
import { getAllItemsBy } from '../../../domain/service/items'
import { supabase } from '../../../libs/auth'

type Props = {
  items: Item[]
}

const DashBordItem: React.VFC<Item> = ({ title, scrapedAt, url }) => {
  return (
    <a href={url}>
      <dd>
        <dt>{title}</dt>
        <dd>{scrapedAt}</dd>
      </dd>
    </a>
  )
}

export const DashBord: React.VFC<Props> = ({ items }) => {
  return (
    <main
      className={cx([
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-2',
        'auto-cols-auto',
        'p-4'
      ])}
    >
      {items.map(item => (
        <div className={cx(['block', 'border-2', 'border-black'])}>
          <DashBordItem {...item} />
        </div>
      ))}
    </main>
  )
}

const Connect: React.VFC = () => {
  const [items, setItems] = useState<Item[] | null>(null)
  useEffect(() => {
    const session = supabase.auth.session()
    getAllItemsBy(session?.user?.id).then(items => {
      setItems(items)
    })
  }, [])

  return items && <DashBord items={items} />
}

export default Connect
