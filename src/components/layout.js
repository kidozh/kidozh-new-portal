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
      {/* <Script src="/js/theme-switch.js" id="theme-switcher-raw" defer strategy="idle"></Script>
      <Script id="render-theme-switcher" defer strategy="idle">{`renderThemeSwitcher();`}</Script> */}

      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      
        <main>{children}</main>
        
        
      
      <Footer />
      
    </>
  )
}

export default Layout
