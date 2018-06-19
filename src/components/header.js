import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header>
    <ul id="navigation">
      <li><Link exact to='/'>About me</Link></li>
      <li><Link to='/services' activeClassName="active">Services</Link></li>
      <li><Link to='/contact' activeClassName="active">Contact</Link></li>
    </ul>
    <div id="logo"><Link to='/'>David Riches</Link></div>
  </header>
)

export default Header