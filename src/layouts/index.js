import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.scss'

const Header = () => (
  <header id='Header'>
    <ul id="navigation">
      <li><Link to='/'>About me</Link></li>
      <li><Link to='/services/'>Services</Link></li>
      <li><Link to='/contact/'>Contact</Link></li>
    </ul>
    <div id="logo" className="animated infinite pulse"><Link to='/'>David Riches</Link></div>
  </header>
)

const Footer = () => (
  <footer id="Footer"><div className="Footer-inner"><p>David Riches © 2017</p></div></footer>
)

const TemplateWrapper = ({ children }) => (
  <section>
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
