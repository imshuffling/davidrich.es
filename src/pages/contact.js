import React from 'react'
import Link from 'gatsby-link'

const Contact = () => (
  <section id='contact' className="animated fadeIn">

    <section>
      <h1 className="page-title">Contact me</h1>
      <h2>I am available for small projects and contract work.<br />
        <span className="email">
          E-mail me at&nbsp;
          <a href="mailto:hi@davidrich.es"><span>hi</span>
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
        </span>
      </h2>

      <form method="POST" action="https://formspree.io/hi@davidrich.es">
        <input type="email" name="email" placeholder="Your email" required/>
        <textarea name="message" placeholder="Your message" required></textarea>
        <button type="submit">Send</button>
      </form>


    </section>
  </section>
)

export default Contact
