import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/index.scss'
import 'typeface-karla'
import 'typeface-oswald'
import AOS from 'aos'
import 'aos/dist/aos.css'

class Layout extends Component {

  componentDidMount() {
    AOS.init({
      duration : 1000
    })

    document.querySelectorAll('.card').forEach((elem) => {
      elem.onmouseenter = () => {
        elem.classList.add('hover')
      }
      elem.onmouseleave = () => {
        elem.classList.remove('hover')
      }
    })
  }

  render() {
    const { children } = this.props
    return (
      <div className="container-wrap animated fadeIn">
        <Helmet
          title="About me - David Riches"
          meta={[
            { name: 'description', content: 'Personal portfolio for David Riches.' },
            { name: 'keywords', content: 'Front-end developer London, Drupal front-end developer, Drupal developer london' },
          ]}
        />
        <Header />
          <div id="page-wrap">{children}</div>
        <Footer />
      </div>
    )
  }
}

export default Layout
