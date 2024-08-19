module.exports = {
  siteMetadata: {
    title: `David Riches - A Front-end developer & part-time hockey player from London.`,
    siteUrl: `https://davidrich.es`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-165591929-1",
        head: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-adapter-netlify`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/thanks/`],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // The option defaults to true
        checkSupportedExtensions: false,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-preload-fonts`,
    `gatsby-plugin-breakpoints`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "David Riches",
        short_name: "davidrich.es",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#F40088",
        display: "minimal-ui",
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        icon_options: {
          // For all the options available, please see:
          // https://developer.mozilla.org/en-US/docs/Web/Manifest
          // https://w3c.github.io/manifest/#purpose-member
          purpose: `maskable`,
        },
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `anjlutb8dq3v`,
        accessToken: `n1zj6PHc2zcvyhXl64nWAT6hCfnOnYYIqQw-1jI_6nA`,
        useNameForId: false,
        // downloadLocal: true,
      },
    },
    {
      resolve: "gatsby-plugin-sri",
      options: {
        hash: "sha512",
      },
    },
    `@skagami/gatsby-plugin-dark-mode`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
        purgeCSSOptions: {
          // https://purgecss.com/configuration.html#options
          // safelist: ['safelist'], // Don't remove this selector
        },
        // More options defined here https://purgecss.com/configuration.html#options
      },
    },
  ],
};
