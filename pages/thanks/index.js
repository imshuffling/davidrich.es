import React from "react";
import Head from "next/head";
import Favicon from "../../components/Favicon";

const Thanks = () => {
  return (
    <section id="thanks">
      <Head>
        <title>Thanks - David Riches</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <Favicon />
      </Head>
      <h1>Thanks for getting in touch.</h1>
      <p>Have a great day!</p>
    </section>
  );
};

export default Thanks;
