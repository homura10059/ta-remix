import { BookOpenIcon } from '@heroicons/react/solid'
import { Session } from '@supabase/gotrue-js/src/lib/types'
import cx from 'classnames'
import React from 'react'

import { Spinner } from '../../headless/Spinner'

type Props = {
  session: Session | null
  loading: boolean
}
export const User: React.VFC<Props> = ({ session, loading }) => {
  if (loading) {
    return <Spinner />
  }
  if (session === null) {
    return <></>
  }
  return (
    <div
      className={cx(
        'flex',
        'justify-between',
        'content-center',
        'bg-primary-light',
        'p-1'
      )}
    >
      <BookOpenIcon className={'w-10 h-10'} />
    </div>
  )
}

const Connect: React.VFC = () => {
  return <User session={null} loading={true} />
}

export default Connect
