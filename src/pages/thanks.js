import React from 'react'
import Helmet from 'react-helmet';
import Layout from "../components/layout"

export default () => (
  <Layout>
    <Helmet
      title="Thanks | David Riches"
      bodyAttributes={{
          class: 'contact'
      }}
    />
    <section id='thanks' className="animated fadeIn">
      <h1>Thanks for getting in touch.</h1>
      <p>Have a great day!</p>
    </section>
  </Layout>
)
