import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/index.scss'

// if (typeof window !== 'undefined') {
//   // Make scroll behavior of internal links smooth
//   //require('smooth-scroll')('a[href*="#"]');
// }

const Layout = ({ children }) => (
  <section className="container-wrap">
    <Helmet
      title="David Riches - Front-end developer, London - UK"
      meta={[
        { name: 'description', content: 'Personal portfolio website for David Riches.' },
        { name: 'keywords', content: 'Front-end developer London, Drupal front-end developer, Drupal developer london' },
      ]}
    />
    <Header />
      {children}
    <Footer />
  </section>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout