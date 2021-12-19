import React from 'react'
import { Link as RemixLink } from 'remix'

type Props = {
  href: string
  className?: string
  children?: React.ReactNode
}

export const Link: React.VFC<Props> = ({ href, className, children }) => {
  return (
    <RemixLink to={href} className={className}>
      {children}
    </RemixLink>
  )
}
