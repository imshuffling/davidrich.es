import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header>
    <ul id="navigation">
      <li><Link to='/' activeClassName="active"><span>About me</span></Link></li>
      <li><Link to='/services' activeClassName="active"><span>Services</span></Link></li>
      <li><Link to='/contact' activeClassName="active"><span>Contact</span></Link></li>
    </ul>
    <div id="logo"><Link to='/'>David Riches</Link></div>
  </header>
)

export default Header
