/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import Footer from "./footer"
// Script import removed; theme toggle is React driven in Header

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      {/* Inline critical theme-snippet: run synchronously before render to avoid flash/jank */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function() {
  try {
    var stored = localStorage.getItem('color-theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (stored === null && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    /* ignore */
  }
})();`
        }}
      />
  <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      
        <main>{children}</main>
        
        
      
      <Footer />
      
    </>
  )
}

export default Layout
