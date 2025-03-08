/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
const React = require("react")
exports.onRenderBody = ({ setHtmlAttributes, setPostBodyComponents }) => {
  setHtmlAttributes({ lang: `en` });
  setPostBodyComponents([
    // <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" key="flowbite-css" />,
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js" key="flowbite-js"></script>,
    // <script src={'/js/theme-switch.js'} key="theme-switch-load-js" defer></script>,
    // <script key="render-theme-switcher-in-ssr" defer
    //   dangerouslySetInnerHTML={{
    //   __html: `
    //     (function() {
    //      renderThemeSwitcher();
    //     })();   
    //  `,
    //   }}
    // />,
  ]);
  

}
