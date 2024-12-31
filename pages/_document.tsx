import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const link = document.createElement('link');
              link.href = "https://fonts.googleapis.com/css2?family=Karla&family=Oswald&display=swap";
              link.rel = "stylesheet";
              document.head.appendChild(link);
            `,
          }}
        />
      </body>
    </Html>
  );
}
