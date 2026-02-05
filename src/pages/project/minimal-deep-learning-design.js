import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link, graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import TppImage from "../../images/project/tpp/tpp.svg"
import SaturatedFrequency from "../../images/project/msu/accuracy-score-tendency-with-spectrum-modified.svg"

const TppPage = () => {
  const { t } = useTranslation()
  const contributions = t("project.minimalDesign.contributions", { returnObjects: true }) || []
  const findings = t("project.minimalDesign.findings", { returnObjects: true }) || []
  const tableRows = t("project.minimalDesign.keyTable.rows", { returnObjects: true }) || []
  const tableFindings = t("project.minimalDesign.tableFindings.list", { returnObjects: true }) || []
  const figureTakeaways = t("project.minimalDesign.figureTakeaways.list", { returnObjects: true }) || []

  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-slate-600">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-18 py-32">
          <h2 className="mt-4 text-xl text-center text-slate-600 dark:text-blue-400 font-inter mb-4">
            {t("project.minimalDesign.subtitle")}
          </h2>

          <h1 className="text-3xl md:text-4xl text-center font-bold text-blue-800 dark:text-white font-montserrat">
            {t("project.minimalDesign.title")}
          </h1>

          <p className="mt-16 text-xl text-center max-w-none break-normal text-gray-600 dark:text-gray-300 font-inter">
            Jiduo Zhang<sup>1</sup>, Dongze He<sup>2, 3, *</sup>, Robert Heinemann<sup>1</sup>, Otto Jan Bakker<sup>1</sup>
          </p>
          <p className="mt-4 text-normal text-center max-w-none break-normal text-gray-400 dark:text-gray-300 font-inter">
            <sup>1</sup> {t('project.minimalDesign.affiliation1')}
            <br />
            <sup>2</sup> {t('project.minimalDesign.affiliation2')}
            <br />
            <sup>3</sup> {t('project.minimalDesign.affiliation3')}
          </p>

          <div className="mt-16 flex-1 justify-items-center">
            <div className="flex justify-center gap-3">
              <Link
                className="text-white bg-blue-700 shrink-0 font-montserrat
                    hover:bg-blue-800 focus:outline-hidden
                    focus:ring-4 focus:ring-blue-300
                    font-medium rounded-full text-normal px-5 py-2.5
                    text-center mr-2 mb-2 dark:bg-blue-600
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                to="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6136222"
              >
                {t("project.minimalDesign.preprint")}<sup>*</sup>
              </Link>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-300 mt-2 text-center">
              <span className="text-blue-500 dark:text-blue-400">*</span> : {t("project.minimalDesign.preprintNote")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-slate-700">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16">
          <h2 className="text-4xl text-center font-bold mt-2 text-blue-700 dark:text-blue-200 max-w-none font-montserrat">
            {t("project.minimalDesign.overviewHeading")}
          </h2>
          <p className="text-xl mt-6 text-center font-medium text-slate-500 dark:text-slate-200 max-w-none">
            {t("project.minimalDesign.summary")}
          </p>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-slate-800">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-200 font-montserrat">
            {t("project.minimalDesign.contributionHeading")}
          </h2>
          <ul className="list-disc list-inside mt-6 text-lg text-slate-600 dark:text-slate-200 space-y-2">
            {contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-slate-700">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-200 font-montserrat">
            {t("project.minimalDesign.findingHeading")}
          </h2>
          <ul className="list-disc list-inside mt-6 text-lg text-slate-600 dark:text-slate-200 space-y-2">
            {findings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mt-10 text-slate-700 dark:text-slate-200 font-montserrat">
            {t("project.minimalDesign.implicationHeading")}
          </h3>
          <p className="text-lg mt-4 font-normal text-slate-600 dark:text-slate-200">
            {t("project.minimalDesign.implications")}
          </p>
        </div>
      </section>

      {/* <section className="bg-gray-50 dark:bg-slate-800">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-200 font-montserrat">
            {t("project.minimalDesign.figureHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <figure className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md">
              <img className="w-full h-auto rounded-lg bg-white p-2" src={TppImage} alt={t("project.minimalDesign.figure1Alt")} />
              <figcaption className="text-sm mt-4 text-slate-500 dark:text-slate-300">
                {t("project.minimalDesign.figure1Caption")}
              </figcaption>
            </figure>
            <figure className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md">
              <img className="w-full h-auto rounded-lg bg-white p-2" src={SaturatedFrequency} alt={t("project.minimalDesign.figure2Alt")} />
              <figcaption className="text-sm mt-4 text-slate-500 dark:text-slate-300">
                {t("project.minimalDesign.figure2Caption")}
              </figcaption>
            </figure>
          </div>
          <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-100 font-montserrat">
              {t("project.minimalDesign.figureTakeaways.heading")}
            </h3>
            <ul className="list-disc list-inside mt-3 text-base text-slate-600 dark:text-slate-200 space-y-2">
              {figureTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-slate-700">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-200 font-montserrat">
            {t("project.minimalDesign.keyTable.heading")}
          </h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-600">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">{t("project.minimalDesign.keyTable.columns.aspect")}</th>
                  <th className="px-4 py-3 font-semibold">{t("project.minimalDesign.keyTable.columns.evidence")}</th>
                  <th className="px-4 py-3 font-semibold">{t("project.minimalDesign.keyTable.columns.designRule")}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-200">
                {tableRows.map((row, index) => (
                  <tr key={`${row.aspect}-${index}`} className="border-t border-gray-200 dark:border-slate-700">
                    <td className="px-4 py-3 font-medium">{row.aspect}</td>
                    <td className="px-4 py-3">{row.evidence}</td>
                    <td className="px-4 py-3">{row.designRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-100 font-montserrat">
              {t("project.minimalDesign.tableFindings.heading")}
            </h3>
            <p className="text-base mt-3 text-slate-600 dark:text-slate-300">
              {t("project.minimalDesign.tableFindings.intro")}
            </p>
            <ul className="list-disc list-inside mt-4 text-base text-slate-600 dark:text-slate-200 space-y-2">
              {tableFindings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}

      <section className="bg-gray-200 dark:bg-gray-700">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8">
          <p className="text-2xl mt-2 font-normal text-gray-500 dark:text-gray-200 max-w-none">
            {t("project.minimalDesign.contactPromptPrefix")}&nbsp;
            <Link
              to="/contact"
              className="text-blue-500 dark:text-blue-200 hover:text-blue-700
           transition-all duration-150 ease-in-out underline
           dark:hover:text-blue-200"
            >
              {t("project.minimalDesign.contactUs")}
            </Link>
            {t("project.minimalDesign.contactPromptSuffix")}
          </p>
        </div>
      </section>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="The Design of Minimal Deep Learning Systems for Online Tool Condition Monitoring in Stacked Drilling" />

export default TppPage

export const query = graphql`
  query TppPageQuery($language: String!) {
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
