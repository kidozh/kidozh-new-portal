import * as React from "react"
import Layout from "../../components/layout";
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Seo from "../../components/seo"
import { Link, graphql } from "gatsby"
import Robonauts from "../../images/project/robonauts.jpg"
import Spark from "../../images/project/sparks.jpg"
import Window from "../../images/project/window.jpg"
import Drill from "../../images/project/drill.jpg"
import PluseTrace from "../../images/project/pulse-trace.jpg"
import DnaSignalForm from "../../images/project/gene-6527964.jpg"
import GalaxyImage from "../../images/project/galaxy-2357413_1920.jpg"
import CloudImage from "../../images/project/cloud-computing.jpg"

const ProjectCardDark = ({ title, description, link, keywords, image }) => {
    const { t } = useTranslation();
    const prefetchPage = (p, ev) => {
        try {
            let pathname = null
            if (ev && ev.currentTarget && ev.currentTarget.href) {
                try {
                    const urlObj = new URL(ev.currentTarget.href)
                    pathname = urlObj.pathname
                } catch (e) {
                    pathname = ev.currentTarget.getAttribute('href') || p || '/'
                }
            } else {
                pathname = p && p.startsWith('/') ? p : `/${p}`
            }
            if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1)
            const url = `/page-data${pathname}/page-data.json`
            fetch(url, { credentials: 'same-origin', mode: 'cors' }).catch(() => {})
        } catch (e) {}
    }
    return (
    <Link to={link} onMouseEnter={(e) => prefetchPage(link, e)} onFocus={(e) => prefetchPage(link, e)} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden
     group hover:transition-all duration-500 ease-in-out hover:scale-105"
            style={{
                background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2) ), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="px-8 py-12">
                <Link to={link} className="font-montserrat inline-flex justify-center items-center
                
                mb-4 text-2xl  group-hover:font-bold text-gray-200 group-hover:text-gray-200">
                    {t("project.preview")}  <svg aria-hidden="true" className="ml-4  w-6 h-6 group-hover:translate-x-4 duration-700 delay-75 ease-in-out"
                        fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>

                <p className="mt-8 font-montserrat text-normal mb-24 
             text-gray-200 border-b-orange-700 ">{description}</p>
                <h2 className="text-2xl font-montserrat font-bold text-white">{title}</h2>
                <hr className="h-1 my-8 w-16 mt-2 mb-6 border-2 bg-orange-400 border-orange-400 group-hover:transition-all duration-800 group-hover:w-full
             dark:bg-indigo-400 dark:border-indigo-400" />

                <p className="mt-4 font-montserrat text-sm font-light text-gray-300">{keywords}</p>
            </div>
        </Link>
    );
}

const ProjectCard = ({ title, description, link, keywords }) => {
    const { t } = useTranslation();
    const prefetchPage = (p, ev) => {
        try {
            let pathname = null
            if (ev && ev.currentTarget && ev.currentTarget.href) {
                try {
                    const urlObj = new URL(ev.currentTarget.href)
                    pathname = urlObj.pathname
                } catch (e) {
                    pathname = ev.currentTarget.getAttribute('href') || p || '/'
                }
            } else {
                pathname = p && p.startsWith('/') ? p : `/${p}`
            }
            if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1)
            const url = `/page-data${pathname}/page-data.json`
            fetch(url, { credentials: 'same-origin', mode: 'cors' }).catch(() => {})
        } catch (e) {}
    }
    return (
    <Link to={link} onMouseEnter={(e) => prefetchPage(link, e)} onFocus={(e) => prefetchPage(link, e)} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden
        dark:hover:bg-linear-to-r dark:hover:from-cyan-500 dark:hover:to-blue-500
        hover:bg-linear-to-r hover:from-orange-200 hover:to-red-200
        hover:scale-105
        group hover:transition-all duration-500 ease-in-out">
            <div className="px-8 py-12">
                <Link to={link} className="font-montserrat inline-flex justify-center items-center
                
                mb-4 text-2xl text-gray-600 group-hover:text-gray-950 group-hover:font-bold dark:text-gray-400 dark:group-hover:text-gray-200">
                    {t("project.preview")}  <svg aria-hidden="true" className="ml-4  w-6 h-6 group-hover:translate-x-4 duration-700 ease-in-out"
                        fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>

                <p className="mt-8 font-montserrat text-normal mb-24 text-gray-700
             dark:text-gray-200 border-b-orange-700">{description}</p>
                <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white">{title}</h2>
                <hr className="h-1 my-8 w-16 mt-2 mb-6 bg-orange-500 border-orange-500
             border-2 dark:bg-indigo-500 dark:border-indigo-500
              dark:group-hover:bg-slate-100 dark:group-hover:border-slate-100 group-hover:transition-all duration-800 group-hover:w-full
               group-hover:bg-red-600 group-hover:border-red-600" />

                <p className="mt-4 font-montserrat text-sm font-light text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200">{keywords}</p>
            </div>
        </Link>
    );
}

const ProjectPage = () => {
    const { t } = useTranslation()
    return (
        <Layout>
            <div className="bg-indigo-200 dark:bg-indigo-400 p-4">
                <section className="bg-gray-50 dark:bg-slate-600 bg-fine-wave-bg-light dark:bg-fine-wave-bg-dark rounded-3xl">
                    <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white ">
                            {t("project.phdTitlePrefix")} <span className="bg-purple-200 dark:bg-purple-600 font-montserrat">{t("project.phdUniversity")}</span></h1>
                        <p className="text-normal font-bold text-gray-500 dark:text-gray-200 mt-4 font-normal">{t("project.phdSupervisor")}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                            <ProjectCard
                                title={t("project.cards.minimalDesign.title")}
                                description={t("project.cards.minimalDesign.description")}
                                link="/project/minimal-deep-learning-design/"
                                keywords={t("project.cards.minimalDesign.keywords")}
                            />

                            <ProjectCardDark
                                title={t("project.cards.ebpc.title")}
                                description={t("project.cards.ebpc.description")}
                                link="/project/ebpc"
                                keywords={t("project.cards.ebpc.keywords")}
                                image={CloudImage}
                            />

                            <ProjectCardDark
                                title={t("project.cards.msu.title")}
                                description={t("project.cards.msu.description")}
                                link="/project/manchester-unit"
                                keywords={t("project.cards.msu.keywords")}
                                image={DnaSignalForm}
                            />

                            <ProjectCard
                                title={t("project.cards.svm.title")}
                                description={t("project.cards.svm.description")}
                                link="#"
                                keywords={t("project.cards.svm.keywords")}

                            />


                            <ProjectCardDark
                                title={t("project.cards.tpp.title")}
                                description={t("project.cards.tpp.description")}
                                link="/project/tpp"
                                keywords={t("project.cards.tpp.keywords")}
                                image={GalaxyImage}

                            />

                            <ProjectCard
                                title={t("project.cards.hybrid.title")}
                                description={t("project.cards.hybrid.description")}
                                link="/project/hybrid-prediction"
                                keywords={t("project.cards.hybrid.keywords")}

                            />

                        </div>
                    </div>

                    <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                            {t("project.mengTitlePrefix")} <span className="bg-blue-200 dark:bg-blue-600 font-montserrat">{t("project.mengUniversity")}</span></h1>
                        <p className="text-normal font-bold text-gray-500 dark:text-gray-200 mt-4 font-normal">{t("project.mengSupervisor")}</p>
                        <div className="flex max-w-(--breakpoint-xl) mt-4 group hover:scale-102 transition-all">
                            <p className="flex flex-auto">
                                <a href="https://www.nwpu.edu.cn" className="hover:transition-all duration-1000 ease-in-out
                            inline-flex justify-center items-center py-1 px-1 pr-4 
                            mb-7 text-sm text-yellow-700 bg-yellow-100 rounded-full
                            dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200
                            dark:hover:bg-yellow-800">
                                    <span className="text-xs bg-yellow-600 rounded-full text-white px-4 py-1.5 mr-3">{t("project.note")}</span> <span className="text-sm font-medium">{t("project.archivedNote")}</span>
                                    <svg aria-hidden="true" className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </a>
                            </p>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                            <ProjectCardDark
                                title={t("project.cards.lstmWear.title")}
                                description={t("project.cards.lstmWear.description")}
                                link="https://www.sciencedirect.com/science/article/abs/pii/S0736584519303655"
                                keywords={t("project.cards.lstmWear.keywords")}
                                image={Robonauts}
                            />

                            <ProjectCardDark
                                title={t("project.cards.multiCond.title")}
                                description={t("project.cards.multiCond.description")}
                                link="https://arch-blog.kidozh.com/projects/keras_detect_tool_wear/"
                                keywords={t("project.cards.multiCond.keywords")}
                                image={Drill}
                            />
                            <ProjectCardDark
                                title={t("project.cards.transfer.title")}
                                description={t("project.cards.transfer.description")}
                                link="https://arch-blog.kidozh.com/projects/transfer_learning_NASA/"
                                keywords={t("project.cards.transfer.keywords")}
                                image={Spark}
                            />
                            <ProjectCardDark
                                title={t("project.cards.tda.title")}
                                description={t("project.cards.tda.description")}
                                link="https://arch-blog.kidozh.com/projects/keras_detect_tool_wear/visualization.html"
                                keywords={t("project.cards.tda.keywords")}
                                image={PluseTrace}
                            />
                            <ProjectCardDark
                                title={t("project.cards.cgan.title")}
                                description={t("project.cards.cgan.description")}
                                link="https://arch-blog.kidozh.com/projects/digital_twins_by_GAN/"
                                keywords={t("project.cards.cgan.keywords")}
                                image={Window}
                            />

                        </div>
                    </div>

                    <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white font-montserrat">{t("project.androidHeading")}</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                            <ProjectCard
                                title={t("project.cards.discuz.title")}
                                description={t("project.cards.discuz.description")}
                                link="https://discuzhub.kidozh.com"
                                keywords={t("project.cards.discuz.keywords")}
                            />

                            <ProjectCard
                                title={t("project.disflyTitle")}
                                description={t("project.disflyDescription")}
                                link={t("project.disflyLink")}
                                keywords={t("project.disflyKeywords")}
                            />

                        </div>


                    </div>
                </section>
            </div>

        </Layout>
    );
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Projects" />

export default ProjectPage;

export const query = graphql`
    query ProjectIndexQuery($language: String!) {
        locales: allLocale(filter: { language: { eq: $language } }) {
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
