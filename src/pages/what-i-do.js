import React from 'react'

import Layout from "../components/layout"

export default () => (
  <Layout>
    <section id='services' className="animated fadeIn">
      <h1 className="page-title">What I do</h1>
      <ul>
        <li>
          <h3>Front-end Development</h3>
          <p>I write clean, hand-coded HTML, CSS and JavaScript - This site is built using React with Gatsby.js with a Contentful back-end.</p>
        </li>
        <li>
          <h3>UX Design</h3>
          <p>User Experience is a crucial part of my workflow, from research through to development.</p>
        </li>
        <li>
          <h3>Version control</h3>
          <p>A active member of the Github community <a target="_blank" rel="noopener noreferrer" href="https://github.com/imshuffling">follow me</a>.</p>
        </li>
        <li>
          <h3>Content managment systems</h3>
          <p>I have over 6 years<strong>'</strong>&nbsp;experience using Drupal and have used Wordpress and Magento too.</p>
        </li>
        <li>
          <h3>Mobile web apps</h3>
          <p>I build responsive web sites from the ground up, keeping a close eye on the latest trends.</p>
        </li>
        <li>
          <h3>Web optimisation</h3>
          <p>I have good knowledge of page speed optimisation, and some SEO skills.</p>
        </li>
      </ul>
    </section>
  </Layout>
)
