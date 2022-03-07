import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="manifest" href="/manifest.json" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name='theme-color' content='#F40088' />
      <meta name='application-name' content='davidrich.es' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='davidrich.es' />
      <meta name='description' content='Hello I\`m David, A Front-end Developer and part-time hockey player ' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='msapplication-TileColor' content='#F40088' />
      <meta name='msapplication-tap-highlight' content='no' />
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#F40088' />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
