import React from "react"
import { Link } from "gatsby"

// this is only active when the location pathname is exactly
// the same as the href.
const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "active" } : null
}

const Header = () => (
  <header>
    <ul id="navigation">
      <li><Link to='/' getProps={isActive}><span>About me</span></Link></li>
      <li><Link to='/services' getProps={isActive}><span>Services</span></Link></li>
      <li><Link to='/contact' getProps={isActive}><span>Contact</span></Link></li>
    </ul>
    <div id="logo"><Link to='/'>David Riches</Link></div>
  </header>
)

export default Header
