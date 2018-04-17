import React from "react"
import favicon from './favicon.png';

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css

    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#A864A8" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="shortcut icon" type="image/png" href={favicon} />
          {this.props.headComponents}
          {css}
          <noscript>Your browser does not support JavaScript!</noscript>
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />

          <script
              dangerouslySetInnerHTML={{ __html:
                `

                window.onload = function() {
                  setTimeout(function() {
                      document.body.classList.add('loaded');
                  }, (4*1000)); //4 seconds
                }
                `,
              }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
