import Head from "next/head";

const NotFound = () => {
  return (
    <section id="page-not-found">
      <Head>
        <title>404 - David Riches</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>404 - Sorry page no found.</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </section>
  );
};

export default NotFound;
