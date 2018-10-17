import React from "react"
//import { Link } from "gatsby"

// this is only active when the location pathname is exactly
// the same as the href.

// <li><Link to='/' getProps={isActive}><span>About me</span></Link></li>
// <li><Link to='/services' getProps={isActive}><span>Services</span></Link></li>
// <li><Link to='/contact' getProps={isActive}><span>Contact</span></Link></li>
//
//
// const isActive = ({ isCurrent }) => {
//   return isCurrent ? { className: "active" } : null
// }

const Header = () => (
  <header>
    <ul id="navigation">
      <li><a href="/"><span>About me</span></a></li>
      <li><a href="/services"><span>Services</span></a></li>
      <li><a href="/contact"><span>Contact</span></a></li>
    </ul>
    <div id="logo"><a href="/">David Riches</a></div>
  </header>
)

export default Header
