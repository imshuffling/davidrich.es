import React, { Component } from "react"
import { Link } from "gatsby"
import { slide as Menu } from 'react-burger-menu'
import X from '../images/x.svg';
import ham from '../images/ham.svg';

class Header extends Component {
  render() {
    return (
      <header>
        <Link className="logo" to='/'>David Riches</Link>
        <Menu pageWrapId={ "page-wrap" } width={'100vw'} bodyClassName={ "no-scroll" } customBurgerIcon={ <img alt="open navigation" src={ham} /> } customCrossIcon={ <img alt="close navigation" src={X} /> } right>
          <ul id="navigation">
            <li><Link to='/' activeClassName="active"><span>About me</span></Link></li>
            <li><Link to='/services' activeClassName="active"><span>Services</span></Link></li>
            <li><Link to='/contact' activeClassName="active"><span>Contact</span></Link></li>
          </ul>
        </Menu>
      </header>
    )
  }
}

export default Header
