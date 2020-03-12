import React, { Component } from "react"
import { Link } from "gatsby"
import Helmet from 'react-helmet'
// import { slide as Menu } from 'react-burger-menu'
// import X from '../images/x.svg';
// import ham from '../images/ham.svg';

class Header extends Component {

  state = {
    toggle: false
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    return (
      <>
        <Helmet>
            <body className={this.state.toggle ? 'menu-open' : 'menu-close' } />
        </Helmet>
        <header>
          <Link className="logo" to='/'>David Riches</Link>
          <div role="button" className={this.state.toggle ? 'navbutton active' : 'navbutton' } onClick={this.toggle} tabIndex={0} onKeyDown={this.handleClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={this.state.toggle ? 'open' : '' }>
            <ul id="navigation">
              <li><Link to='/' activeClassName="active"><span>About me</span></Link></li>
              <li><Link to='/services' activeClassName="active"><span>Services</span></Link></li>
              <li><Link to='/contact' activeClassName="active"><span>Contact</span></Link></li>
            </ul>
          </nav>
        </header>
      </>
    )
  }
}

export default Header
