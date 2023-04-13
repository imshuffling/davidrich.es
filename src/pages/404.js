import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { Link } from "gatsby";

const NotFound = () => {
  return (
    <Layout>
      <Helmet>
        <title>Whoops 404 - David Riches</title>
      </Helmet>
      <section id="page-not-found">
        <h1>Sorry page not found 😢</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/">Lets go back to the homepage</Link>
      </section>
    </Layout>
  );
};

export default NotFound;
