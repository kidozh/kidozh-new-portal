import * as React from "react"


import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link, graphql } from "gatsby"
import TppImage from "../../images/project/tpp/tpp.svg"
import TppCNNImage from "../../images/project/tpp/tpp_cnn.svg"
import CIRPICMELogo from "../../images/project/tpp/cirp-icme-logo.webp"
import CSCLogo from "../../images/project/china-scholarship-logo.jpg"

const TppPage = () => (
  <Layout>
    <section className="bg-gray-50 dark:bg-slate-600">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-18 py-32">
        <h1
          className="text-3xl md:text-4xl text-center font-bold text-blue-800 dark:text-white font-montserrat">
          The Design of Minimal Deep Learning Systems for Online Tool Condition Monitoring in Stacked Drilling
        </h1>
        
        <p className="mt-16 text-xl text-center max-w-none break-normal text-gray-600 dark:text-gray-300 font-inter">
          Jiduo Zhang<sup>1</sup>, Dongze He<sup>2, 3, *</sup>, Robert Heinemann<sup>1</sup>, Otto Jan Bakker<sup>1</sup>
        </p>
        <p className="mt-4 text-normal text-center max-w-none break-normal text-gray-400 dark:text-gray-300 font-inter">
          <sup>1</sup> Department of Mechanical and Aerospace Engineering, The University of Manchester<br/>
          <sup>2</sup> Henry Royce Institute, Department of Materials, The University of Manchester<br/>
          <sup>3</sup> National X-ray Computed Tomography
        </p>

        

        <div className="mt-16 flex-1 justify-items-center">
          <div className="flex justify-center">
            <Link className="text-white bg-blue-700 shrink-0 font-montserrat
                    hover:bg-blue-800 focus:outline-hidden 
                    focus:ring-4 focus:ring-blue-300 
                    font-medium rounded-full text-normal px-5 py-2.5 
                    text-center mr-2 mb-2 dark:bg-blue-600
                      dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="#">Preprint<sup>*</sup></Link>
                    {/* <Link className="px-5 py-2.5 
                     text-blue-700 dark:text-blue-100
                    text-center mr-2 mb-2" 
                    to="https://github.com/kidozh/tpp-cnn-network-for-incidence-identification">View source </Link> */}
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-300 mt-2 text-center">
            <span className="text-blue-500 dark:text-blue-400">*</span> : The preprint shall be subject to change and do not represent the final peer-reviewed version.
          </p>
                  
        </div>
      </div>
    </section>

    <section className="bg-gray-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16">
        <h1 className="text-4xl text-center font-bold mt-2 text-blue-700 dark:text-blue-200 max-w-none font-montserrat">
          The paper is currently under the review process.
        </h1>
        <p className="text-2xl mt-4 text-center font-medium text-slate-500 dark:text-slate-200 max-w-none">
          This page is not affected by the site inactivity. It will be updated once the paper is accepted. Please check back later.
        </p>
      </div>
    </section>

    

    <section className="bg-gray-200 dark:bg-gray-700">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8">
        <p className="text-2xl mt-2 font-normal text-gray-500 dark:text-gray-200 max-w-none">
          If you have any questions or suggestions, please feel free to&nbsp;
           <Link to="/contact" className="text-blue-500 dark:text-blue-200 hover:text-blue-700
           transition-all duration-150 ease-in-out underline
           dark:hover:text-blue-200">contact us</Link>.
        </p>  
      </div>

    </section>

  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="In-process tool incidence identification based on temporal pyramid pooling and convolutional neural network" />

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