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

      <form name="contact-test" method="POST" netlify>
        <p>
          <label>Your Name: <input type="text" name="name" /></label>
        </p>
        <p>
          <label>Your Email: <input type="email" name="email" /></label>
        </p>
        <p>
          <label>Message: <textarea name="message"></textarea></label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>

    </section>
  </section>
)

export default Contact
