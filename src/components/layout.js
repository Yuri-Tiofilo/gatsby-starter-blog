import * as React from "react"
import { Link } from "gatsby"
import Bio from "../components/bio"

import { FiArrowLeft } from 'react-icons/fi'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        <FiArrowLeft /> Voltar para home
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Bio />
      <div className="wrapper">
        <header className="global-header">{header}</header>
        <main>{children}</main>
      </div>
      
    </div>
  )
}

export default Layout
