import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link, graphql } from "gatsby"
import { useTranslation } from 'gatsby-plugin-react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
  <Layout>
    <section className="bg-gray-50 dark:bg-slate-600">
      <div className="p-36">
        <h1 className="text-4xl font-montserrat  dark:text-white text-black">
          <span className="font-bold text-8xl dark:text-blue-300 text-blue-500">404</span>: {t('notFound.title')}
        </h1>
        <p className="text-2xl mt-8 font-light dark:text-slate-100 text-slate-600">{t('notFound.message')}</p>
        <hr className="h-1 my-8 w-32 mt-16 mb-16 border-2 bg-blue-400 dark:bg-indigo-400" />
  <p className="text-2xl mt-4 font-light dark:text-slate-100 text-slate-600">{t('notFound.backHome')} <Link to="/" className="text-blue-600 dark:text-blue-300">{t('nav.home')}</Link>.</p>
      </div>
      
    </section>
    
  </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

export const query = graphql`
  query ($language: String!) {
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
