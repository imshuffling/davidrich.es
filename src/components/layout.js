import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/index.scss'
import 'typeface-karla'
import 'typeface-oswald'


class Layout extends Component {
  componentWillUnmount () {
    //
  }

  componentDidMount () {
    document.querySelector('#___gatsby').onmousemove = (e) => {
      const x = e.pageX - e.target.offsetLeft
      const y = e.pageY - e.target.offsetTop
      e.target.style.setProperty('--x', `${ x }px`)
      e.target.style.setProperty('--y', `${ y }px`)
    }
  }

  render() {
    const { children } = this.props
    return (
      <section className="container-wrap">
        <Helmet
          title="About me - David Riches"
          meta={[
            { name: 'description', content: 'Personal portfolio for David Riches.' },
            { name: 'keywords', content: 'Front-end developer London, Drupal front-end developer, Drupal developer london' },
          ]}
        />
        <Header />
          {children}
        <Footer />
      </section>
    )
  }
}

export default Layout
