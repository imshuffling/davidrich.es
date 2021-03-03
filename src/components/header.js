import React, { useState } from "react"
import { Link } from "gatsby"
import { Helmet } from 'react-helmet'
import ThemeChanger from "../components/themeChanger"

export default function Header(props) {

  const [toggleState, setToggleState] = useState(false);

  function toggle() {
    setToggleState(!toggleState);
  }

  return (
    <>
      <Helmet>
          <body id={toggleState ? 'menu-open' : 'menu-close' } />
      </Helmet>
      <header>
        <Link className="logo" to='/'>David Riches</Link>
        <ThemeChanger/>
        <div role="button" className={toggleState ? 'navbutton active' : 'navbutton' } onClick={toggle} tabIndex={0} onKeyDown={toggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={toggleState ? 'open' : '' }>
          <ul id="navigation">
            <li><Link to='/' activeClassName="active">About me</Link></li>
            <li><Link to='/what-i-can-do' activeClassName="active">What I can do</Link></li>
            <li><a target="_blank" rel="noopener noreferrer" href='https://resume.davidrich.es/'>Resume</a></li>
            <li><Link to='/contact' activeClassName="active">Contact</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
