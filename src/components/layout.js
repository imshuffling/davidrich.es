import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/index.scss'
import 'typeface-karla'
import 'typeface-oswald'

class Layout extends Component {
  constructor(){
    super()
    this.state = {
      loaded : undefined
    }
  }

  getLoaded(){
    setTimeout(() => {
      this.setState({loaded: window.sessionStorage.setItem('loaded', 1)})
    }, 4000)
  }

  componentDidMount() {
    // Calling getLoaded - adds sessionStorage after 4 seconds.
    this.getLoaded();

    // TODO Updating state to get our sessionStorage
    //this.setState({loaded: window.sessionStorage.getItem('loaded')})

    // Doing gradient bg on outter wrapper.
    document.querySelector('#___gatsby').onmousemove = (e) => {
      const x = e.pageX - e.currentTarget.offsetLeft
      const y = e.pageY - e.currentTarget.offsetTop
      const logo = document.querySelector('#logo a')

      // halfing this for the logo
      logo.style.setProperty('--x', `${ x / 2 }px`)
      logo.style.setProperty('--y', `${ y / 2 }px`)

      e.currentTarget.style.setProperty('--x', `${ x }px`)
      e.currentTarget.style.setProperty('--y', `${ y }px`)
    }
  }

  render() {
    const { children } = this.props
    return (
      <section className={this.state.loaded ? 'container-wrap loaded' : 'container-wrap'}>
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
