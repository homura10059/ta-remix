import { Session } from '@supabase/gotrue-js/src/lib/types'
import cx from 'classnames'
import React, { useState } from 'react'
import { Link } from 'remix'

import { supabase } from '../../../libs/auth'
import Avatar from './Avatar'
import { SignIn } from './SignIn'
import { SignOut } from './SignOut'

type Props = {
  session: Session | null
}
export const User: React.VFC<Props> = ({ session }) => {
  const [opened, setOpened] = useState(false)
  return (
    <Link
      to={'#'}
      onClick={() => setOpened(!opened)}
      className={cx(['relative'])}
    >
      <Avatar session={session} />
      {opened && (
        <ul
          className={cx([
            'absolute',
            'right-0',
            'top-full',
            'z-50',
            'bg-background',
            'border-2',
            'border-surface',
            'p-2'
          ])}
        >
          <li>{session ? <SignOut /> : <SignIn />}</li>
        </ul>
      )}
    </Link>
  )
}

const Connect: React.VFC = () => {
  const session = supabase.auth.session()
  return <User session={session} />
}

export default Connect
