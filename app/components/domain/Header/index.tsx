import { BookOpenIcon } from '@heroicons/react/solid'
import cx from 'classnames'
import React from 'react'
import { Link } from 'remix'

import User from './User'

export const Header: React.VFC = () => {
  return (
    <header
      className={cx(
        'flex',
        'justify-between',
        'content-center',
        'bg-primary-light',
        'p-1'
      )}
    >
      <Link to={'/'}>
        <BookOpenIcon className={'w-10 h-10'} />
      </Link>
      <User />
    </header>
  )
}

const Connect: React.VFC = () => {
  return <Header />
}

export default Connect
