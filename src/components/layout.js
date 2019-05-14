import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/index.scss'
import 'typeface-karla'
import 'typeface-oswald'

class Layout extends Component {

  componentDidMount() {
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

    const height = (elem) => {
      return elem.getBoundingClientRect().height
    }

    const distance = (elemA, elemB, prop) => {
      const sizeA = elemA.getBoundingClientRect()[prop]
      const sizeB = elemB.getBoundingClientRect()[prop]
      return sizeB - sizeA
    }

    const factor = (elemA, elemB, prop) => {
      const sizeA = elemA.getBoundingClientRect()[prop]
      const sizeB = elemB.getBoundingClientRect()[prop]
      return sizeB / sizeA
    }

    document.querySelectorAll('.card').forEach((elem) => {

      const head = elem.querySelector('.card__head')
      const image = elem.querySelector('.card__image')
      const author = elem.querySelector('.card__author')
      const body = elem.querySelector('.card__body')
      const foot = elem.querySelector('.card__foot')

      elem.onmouseenter = () => {
        elem.classList.add('hover')

        const imageScale = 1 + factor(head, body, 'height')
        image.style.transform = `scale(${ imageScale })`

        const bodyDistance = height(foot) * -1
        body.style.transform = `translateY(${ bodyDistance }px)`

        const authorDistance = distance(head, author, 'height')
        author.style.transform = `translateY(${ authorDistance }px)`

      }

      elem.onmouseleave = () => {
        elem.classList.remove('hover')
        image.style.transform = `none`
        body.style.transform = `none`
        author.style.transform = `none`
      }
    })
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
