import React from 'react'
import Link from 'gatsby-link'

const Contact = () => (
  <section id='contact' className="animated fadeIn">

    <section>
      <h1 className="page-title">Contact me</h1>
      <h2>I am available for small projects and contract work.</h2>
      <p>E-mail me at
      <a href="mailto:hi@davidrich.es"> <span>hi</span>
      <span>@</span>
      <span>d</span>
      <span>a</span>
      <span>v</span>
      <span>i</span>
      <span>d</span>
      <span>r</span>
      <span>i</span>
      <span>c</span>
      <span>h</span>
      <span>.</span>
      <span>e</span>
      <span>s</span></a>
      </p>
    </section>
    <aside id="what-ive-been">
      <h3>What have I been up to...</h3>
      <ul>
        <li>
          <p>Mirum</p>
          <span className="tag">March 2017 - current</span>
        </li>
        <li>
          <p>NDP - Drupal developer</p>
          <span className="tag">November 2013 - February 2017</span>
        </li>
        <li>
          <p>Tui travel - Front-end developer</p>
          <span className="tag">July 2012 - November 2013</span>
        </li>
        <li>
          <p>Tui travel - Junior Drupal developer</p>
          <span className="tag">March 2010 - July 2012</span>
        </li>
      </ul>
    </aside>
  </section>
)

export default Contact
