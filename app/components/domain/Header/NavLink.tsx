import cx from 'classnames'
import { NavLink } from 'remix'

export const NavList = () => {
  const activeStyle = (props: { isActive: boolean }) =>
    cx({ underline: props.isActive })

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="dashbord" className={activeStyle}>
            DashBord
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
