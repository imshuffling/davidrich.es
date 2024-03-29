import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";

const Thanks = () => {
  return (
    <Layout>
      <Helmet>
        <title>Thanks - David Riches</title>
      </Helmet>
      <section id="thanks">
        <h1>Thanks for getting in touch.</h1>
        <p>Have a great day!</p>
      </section>
    </Layout>
  );
};

export default Thanks;
