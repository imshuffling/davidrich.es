import React, { Component } from "react"
import { Link } from "gatsby"

class Header extends Component {
  render() {
    return (
      <header>
        <Link className="logo" to='/'>David Riches</Link>
        <nav>
          <ul id="navigation">
            <li><Link to='/' activeClassName="active"><span>About me</span></Link></li>
            <li><Link to='/services' activeClassName="active"><span>Services</span></Link></li>
            <li><Link to='/contact' activeClassName="active"><span>Contact</span></Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
