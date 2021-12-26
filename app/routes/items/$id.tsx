import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'

import { ItemDetail } from '../../domain/models'
import { getItemDetail } from '../../domain/service/itemHistories'

type Props = {
  item: ItemDetail | null
}

export const loader: LoaderFunction = async ({ params }) => {
  const itemId = params.id
  if (!itemId) {
    return { item: null }
  }
  const item = await getItemDetail(itemId)
  console.log(item)
  return { item }
}

export default function ParamDemo() {
  const data = useLoaderData<Props>()
  return (
    <h1>
      The param is <i style={{ color: 'red' }}>{JSON.stringify(data.item)}</i>
    </h1>
  )
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : 'Oops...'
  }
}
