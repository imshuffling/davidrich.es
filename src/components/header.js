import React, { Component } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet-async"

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
              <li><Link to='/' activeClassName="active">About me <span role="img" alt="OK emoji" aria-label="OK">👌</span></Link></li>
              <li><Link to='/skills' activeClassName="active">Skills <span role="img" alt="OK emoji" aria-label="OK">👌</span></Link></li>
              <li><a target="_blank" rel="noopener noreferrer" href='https://resume.davidrich.es/'>Resume</a></li>
              <li><Link to='/contact' activeClassName="active">Contact <span role="img" alt="OK emoji" aria-label="OK">👌</span></Link></li>
            </ul>
          </nav>
        </header>
      </>
    )
  }
}

export default Header
