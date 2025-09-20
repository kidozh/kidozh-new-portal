import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { graphql, Link } from "gatsby"
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Robonauts from "../../images/project/robonauts.jpg"
import DnaSignalForm from "../../images/project/gene-6527964.jpg"
import GalaxyImage from "../../images/project/galaxy-2357413_1920.jpg"

// Card component supports optional image background
const ProjectCard = ({ title, description, link, previewLabel, image }) => (
  <div className="shadow rounded overflow-hidden">
    {image ? (
      <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="h-40" />
    ) : null}
    <div className="p-6 bg-white dark:bg-gray-800">
      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm mt-2 text-gray-700 dark:text-gray-200">{description}</p>
      {link && (
        <p className="mt-3">
          <Link to={link} className="text-blue-600 underline">{previewLabel}</Link>
        </p>
      )}
    </div>
  </div>
)

const ProjectPage = () => {
  const { t } = useTranslation()
  const previewLabel = t('project.preview')

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">{t('project.phdTitlePrefix')}</h1>
        <p className="text-sm text-gray-600">{t('project.phdUniversity')}</p>
        <p className="mt-4">{t('project.phdSupervisor')}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            title={t('project.manTitle')}
            description={t('project.manDescription')}
            link="/project/manchester-unit"
            previewLabel={previewLabel}
            image={DnaSignalForm}
          />

          <ProjectCard
            title={t('project.tppTitle')}
            description={t('project.tppDescription')}
            link="/project/tpp"
            previewLabel={previewLabel}
            image={GalaxyImage}
          />

          <ProjectCard
            title={t('project.lstmtitle')}
            description={t('project.lstmDescription')}
            link="https://www.sciencedirect.com/science/article/abs/pii/S0736584519303655"
            previewLabel={previewLabel}
            image={Robonauts}
          />
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Projects" />

export default ProjectPage

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
