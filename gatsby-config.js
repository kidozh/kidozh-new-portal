/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `kidozh`,
    description: `new kidozh portal page.`,
    author: `@kidozh`,
    siteUrl: `https://kidozh.com/`,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#ffb465`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        languages: ["en", "zh"],
        defaultLanguage: "en",
        siteUrl: `https://kidozh.com/`,
        // Path to your translation JSON files
        localeJsonSourceName: `locales`, // name given to gatsby-source-filesystem for locales
        // you can enable automatic redirection based on browser language
        redirect: true,
        // react-i18next options: disable Suspense to avoid navigation being blocked
        i18nextOptions: {
          react: {
            useSuspense: false
          }
        }
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/post/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locales`,
        path: `${__dirname}/src/locales/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Add your gatsby-remark-* plugins here
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
        ],
        // Enable JS for https://github.com/jonschlinkert/gray-matter#optionsengines (default: false)
        // It's not advised to set this to "true" and this option will likely be removed in the future
        jsFrontmatterEngine: false,
      },
    },
    'gatsby-plugin-remove-serviceworker'
    
  ],
}
