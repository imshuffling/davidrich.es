import React, { Component } from "react"
import Media from 'react-media';
import { Link } from "gatsby"
import { Helmet } from 'react-helmet'

// const Header = () => (
//   <header>
//     <ul id="navigation">
//       <li><Link to='/' activeClassName="active"><span>About me</span></Link></li>
//       <li><Link to='/services' activeClassName="active"><span>Services</span></Link></li>
//       <li><Link to='/contact' activeClassName="active"><span>Contact</span></Link></li>
//     </ul>
//     <div id="logo"><Link to='/'>David Riches</Link></div>
//   </header>
// )

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
    //const props = this.props
    return (
      <>
      <Helmet>
        <body className={this.state.toggle ? 'block' : '' } />
      </Helmet>
      <header className={this.state.toggle ? 'open' : '' }>
        <Media query="(max-width: 479px)">
          {matches =>
            matches ? (
              <>
                {/* Mobile */}
                <div className="mobile-nav">
                  <div id="logo"><Link to='/'>David Riches</Link></div>
                  <button className={this.state.toggle ? 'navbutton active' : 'navbutton' } onClick={this.toggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
                {this.state.toggle &&
                  <nav>
                    <ul id="navigation">
                      <li><Link to='/' activeClassName="active"><span>About me</span></Link></li>
                      <li><Link to='/services' activeClassName="active"><span>Services</span></Link></li>
                      <li><Link to='/contact' activeClassName="active"><span>Contact</span></Link></li>
                    </ul>
                  </nav>
                }
              </>
            ) : (
              // Desktop
              <>
                <div id="logo"><Link to='/'>David Riches</Link></div>
                <nav>
                  <ul id="navigation">
                    <li><Link to='/' activeClassName="active"><span>About me</span></Link></li>
                    <li><Link to='/services' activeClassName="active"><span>Services</span></Link></li>
                    <li><Link to='/contact' activeClassName="active"><span>Contact</span></Link></li>
                  </ul>
                </nav>
              </>
            )
          }
        </Media>
      </header>
      </>
    )
  }
}

export default Header
