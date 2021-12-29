import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { Link } from 'remix'

import { Item } from '../../../domain/models'
import { getAllItemsBy } from '../../../domain/service/items'
import { supabase } from '../../../libs/auth'

type Props = {
  items: Item[]
}

const DashBordItem: React.VFC<Item> = ({ title, scrapedAt, id }) => {
  return (
    <Link to={`/items/${id}`}>
      <dd>
        <dt>{title}</dt>
        <dd>{scrapedAt}</dd>
      </dd>
    </Link>
  )
}

export const DashBord: React.VFC<Props> = ({ items }) => {
  return (
    <div
      className={cx([
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-2',
        'auto-cols-auto'
      ])}
    >
      {items.map(item => (
        <div className={cx(['block', 'border-2', 'border-black'])}>
          <DashBordItem {...item} />
        </div>
      ))}
    </div>
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
