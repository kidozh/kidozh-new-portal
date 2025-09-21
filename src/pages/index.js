import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from 'gatsby-plugin-react-i18next'

const IndexPage = ({data}) => {
  const { t } = useTranslation()
  const {posts} = data.update

  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-slate-600 bg-fine-wave-bg-light dark:bg-fine-wave-bg-dark">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-32">
          <h1 class="text-6xl font-bold text-gray-800 dark:text-white font-montserrat">{t('index.hi')}
            <span className="dark:text-orange-500 text-orange-600">.</span></h1>
          <p class="text-2xl text-gray-600 dark:text-gray-300 mt-6 font-montserrat">
            {t('index.description')}<span className="dark:text-orange-500 text-orange-600">.</span></p>
  
          <div className="mt-8">
            <Link to="https://github.com/kidozh"
              type="button" class="text-white font-montserrat bg-gray-900 hover:bg-gray-800 
            focus:outline-hidden focus:ring-4  focus:ring-blue-300 font-medium 
            rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800
             dark:hover:bg-gray-900 dark:focus:ring-gray-900 break-words">{t('index.github')}</Link>
  
            <Link to="https://www.researchgate.net/profile/Jiduo-Zhang"
              type="button" class="text-white font-montserrat bg-green-700 hover:bg-green-800 
            focus:outline-hidden focus:ring-4 focus:ring-blue-300 font-medium 
            rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500
             dark:hover:bg-green-600 dark:focus:ring-green-700 break-words">{t('index.researchgate')}</Link>
  
            <Link to="https://scholar.google.com/citations?user=nudc3xUAAAAJ&hl=en"
              type="button" class="text-white font-montserrat bg-blue-500 hover:bg-blue-600 
            focus:outline-hidden focus:ring-4 focus:ring-blue-300 font-medium 
            rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600
             dark:hover:bg-blue-700 dark:focus:ring-blue-800 break-words">{t('index.googleScholar')}</Link>
  
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-900">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16">
          <h1 className="text-4xl font-bold font-montserrat text-gray-800 dark:text-white">📢 {t('index.latest')} <span className="bg-orange-300 dark:bg-orange-600 text-underline hover:bg-orange-600 hover:text-white dark:hover:bg-orange-800 hover:transition-all duration-500 ease-in-out">{t('index.update')}</span></h1>
            {
            posts.map((post, index) => (
              <p key={post.excerpt} className="text-light p-4 text-gray-800 dark:text-gray-200 break-normal mt-4 font-normal hover:scale-101 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg
               hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-gray-700
              transition-all duration-500 ease-in-out">
                {index == 0 && <span className="text-gray-800 dark:text-gray-200 font-bold mr-2 pr-4 pl-4 pt-1 pb-1 text-sm bg-orange-300 rounded-lg font-mono dark:bg-orange-500
                 dark:bg-orange-600">{t('index.newest')}</span>}
                <span className="text-gray-400 dark:text-gray-500 mr-3 font-extrabold">{post.frontmatter.date}</span>
                <Link to={post.fields.slug}
                 className="text-gray-700 dark:text-gray-300 font-bold
                  transition-all duration-300 ease-in-out
                  hover:text-gray-600 hover:underline-offset-4
                  dark:hover:text-gray-300 dark:hover:underline-offset-4">{post.frontmatter.excerpt}</Link>
              </p>
              ))
            }
          
          
        </div>
      </section>
  
    </Layout>
  )
}

export const pageQuery = graphql`
  query MyQuery($language: String!) {
    update:allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 3) {
      posts:nodes {
        excerpt
        frontmatter {
          author
          date(formatString: "YYYY-MM-DD")
          excerpt
          title
        }
        html
        fields {
          slug
        }
      }
    }
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`


/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */



export const Head = () => <Seo title="Home" />

export default IndexPage
