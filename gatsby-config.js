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
  plugins: [
    `gatsby-plugin-image`,
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
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/post/`,
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
        plugins: [],
        // Enable JS for https://github.com/jonschlinkert/gray-matter#optionsengines (default: false)
        // It's not advised to set this to "true" and this option will likely be removed in the future
        jsFrontmatterEngine: false,
      },
    },
    'gatsby-plugin-remove-serviceworker'
    
  ],
}
