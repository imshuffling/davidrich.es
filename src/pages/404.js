import React from 'react'
import Helmet from 'react-helmet';
import Layout from "../components/layout"

export default () => (
  <Layout>
      <Helmet>
        <title>404 - David Riches</title>
      </Helmet>
    <section id='page-not-found' className="animated fadeIn">
      <h1>404 - Sorry page no found.</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </section>
  </Layout>
)
