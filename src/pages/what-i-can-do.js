import React from 'react'
import { graphql } from "gatsby"
import { Helmet } from "react-helmet-async";
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Services({data}) {
  return (
    <Layout>
      <Helmet>
        <title>What I can do - David Riches</title>
      </Helmet>
      <section>
        <h1>What I can do</h1>
        <ul id="services">
        {data.allContentfulServices.nodes.map((i, index) =>
          <li key={index}>
            <h3>{i.title}</h3>
            {documentToReactComponents(i.body.json)}
          </li>
        )}
        </ul>
      </section>
    </Layout>
  )
}

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
