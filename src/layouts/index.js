import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.scss'

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

const Footer = () => (
  <footer>
    <div className="Footer-inner">
      <p>David Riches © 2018 🏑</p>
    </div>
  </footer>
)


const TemplateWrapper = ({ children }) => (
  <section className="container-wrap">
    <Helmet
      title="David Riches - Front-end developer, London - UK"
      meta={[
        { name: 'description', content: 'Personal portfolio website for David Riches.' },
        { name: 'keywords', content: 'Front-end developer London, Drupal front-end developer, Drupal developer london' },
      ]}
    />
    <Header />
      {children()}
    <Footer />
  </section>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
