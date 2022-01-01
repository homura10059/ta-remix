import { format } from 'date-fns'
import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import type { LoaderFunction, MetaFunction } from 'remix'
import { useLoaderData } from 'remix'

import { Chart } from '../../components/domain/Item/Chart'
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
  return { item }
}

export default function Items() {
  const data = useLoaderData<Props>()
  const timeline = (data.item?.itemHistories ?? []).map(history => ({
    ...history,
    real: (history.price ?? 0) - (history.points ?? 0),
    timestamp: format(new Date(history.scrapedAt * 1000), 'yyyy/MM/dd')
  }))
  return (
    <>
      <h1>
        <a href={data.item?.url}>{data.item?.title}</a>
      </h1>
      <ul>
        <li>
          更新日時：
          {format(
            new Date((data.item?.scrapedAt ?? 0) * 1000),
            'yyyy/MM/dd HH:mm:ss'
          )}
        </li>
      </ul>
      <Chart timeline={timeline} />
    </>
  )
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : 'Oops...'
  }
}
