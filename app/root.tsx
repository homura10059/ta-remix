import { useCallback } from 'react'
import type { LinksFunction } from 'remix'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from 'remix'

import styles from '~/styles/generated.css'

import { supabase } from './libs/auth'

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title ? title : ''}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

const signIn = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'discord'
  })
  console.log(user)
  console.log(session)
  console.log(error)
}

function Layout({ children }: { children: React.ReactNode }) {
  const user = supabase.auth.user()
  console.log(user)
  const session = supabase.auth.session()
  console.log(session)
  const callback = useCallback(() => signIn(), [])
  return (
    <div>
      <header>
        Header
        <div>
          <button onClick={callback}>SignIn</button>
          <nav aria-label="Main navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="https://remix.run/docs">Remix Docs</a>
              </li>
              <li>
                <a href="https://github.com/remix-run/remix">GitHub</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}
