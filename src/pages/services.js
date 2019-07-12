import React from 'react'
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

class Services extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Services - David Riches</title>
        </Helmet>
        <section id='services' className="animated fadeIn">
          <h1>Services</h1>
          <ul>
          {this.props.data.allContentfulServices.nodes.map((i) =>
            <li key={i.id}>
              <h3>{i.title}</h3>
              {documentToReactComponents(i.body.json)}
            </li>
          )}
          </ul>
        </section>
      </Layout>
    )
  }
}

export default Services

export const servicesQuery = graphql`
  query servicesQuery {
    allContentfulServices(sort: {fields: id}) {
      nodes {
        title
        id
        body {
          json
        }
      }
    }
  }
`