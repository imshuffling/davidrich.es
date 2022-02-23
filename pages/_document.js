import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="manifest" href="/manifest.json" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name='theme-color' content='#F40088' />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
