import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { GoFileMedia, GoLocation } from "react-icons/go";

const IndexPage = () => {
    const { t } = useTranslation()

    return (
    <Layout>
        <section className="bg-gray-50 dark:bg-slate-600">
            <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-32">
                
                <h1 className="text-6xl text-center font-bold text-gray-800 dark:text-white font-montserrat">
                    <GoFileMedia className="inline mr-8" />
                    {t('contact.email')}
                    </h1>
                <p className="text-2xl text-center max-w-none break-normal text-gray-600 dark:text-gray-300 mt-6 font-montserrat">
                    {t('contact.primaryEmail')}</p>
                <div class="inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-gray-50 dark:bg-slate-600 left-1/2 dark:text-white ">{t('contact.or')}</span>
                </div>
                <p class="text-2xl text-center max-w-none text-gray-600 dark:text-gray-300 font-montserrat">
                    kidozh<span className="dark:text-orange-500 text-orange-600">[AT]</span>gmail.com</p>
            </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-900">
            <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-32">
                <h1 className="text-6xl text-center font-bold text-gray-800 dark:text-white font-montserrat">
                    <GoLocation className="inline mr-8" />
                    {t('contact.location')}
                </h1>
                <p className="text-2xl text-center max-w-none text-gray-600 dark:text-gray-300 mt-16 font-montserrat">
                    {t('contact.department')}
                </p>
                <p className="text-2xl text-center max-w-none text-gray-600 dark:text-gray-300 font-montserrat mt-4">
                    {t('contact.addressPrefix')} <span className="dark:text-orange-500 text-orange-600">{t('contact.postcode')}</span>, {t('contact.country')}</p>
            </div>
        </section>
        <section className="bg-blue-100 dark:bg-blue-900">
            <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-32">
                <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-100 font-montserrat">{t('contact.notMonitored')}</h1>
                <ul className="list-none p-6 font-roboto list-disc transition-all duration-700">
                    <li className=" text-gray-600 dark:text-gray-300 mt-6">kidozh[AT]mail.nwpu.edu.cn</li>
                    <li className=" text-gray-600 dark:text-gray-300 mt-6">jiduo.zhang[AT]rwth-aachen.de</li>

                </ul>
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
export const Head = () => <Seo title="Contact" />

export default IndexPage

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
