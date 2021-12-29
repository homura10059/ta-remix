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
      <ResponsiveContainer aspect={16 / 9}>
        <ComposedChart data={timeline}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="timestamp" />
          <YAxis yAxisId={'left-yaxis'} />
          <YAxis
            yAxisId={'right-yaxis'}
            unit={'%'}
            orientation={'right'}
            allowDecimals={false}
          />
          <Tooltip cursor={true} />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <Brush
            dataKey="timestamp"
            stroke="#ffc658"
            startIndex={timeline.length - 14}
            endIndex={timeline.length - 1}
          />
          <Area
            type="monotone"
            stackId="1"
            dataKey="real"
            name={'実質価格'}
            yAxisId={'left-yaxis'}
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Line
            type="monotone"
            dataKey="discountRate"
            stroke="#8884d8"
            name={'値引率'}
            unit={'%'}
            yAxisId={'right-yaxis'}
          />
          <Line
            type="monotone"
            dataKey="pointsRate"
            stroke="#82ca9d"
            name={'ポイント率'}
            unit={'%'}
            yAxisId={'right-yaxis'}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  )
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : 'Oops...'
  }
}
