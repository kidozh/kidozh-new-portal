import * as React from "react"


import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link } from "gatsby"
import TppImage from "../../images/project/tpp/tpp.svg"
import TppCNNImage from "../../images/project/tpp/tpp_cnn.svg"
import CIRPICMELogo from "../../images/project/tpp/cirp-icme-logo.webp"
import CSCLogo from "../../images/project/china-scholarship-logo.jpg"

const TppPage = () => (
  <Layout>
    <section className="bg-gray-50 dark:bg-slate-600">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
        <h4 class="text-2xl font-medium text-slate-900 dark:text-white text-center">Hybrid prediction</h4>
        <h1
          class="text-6xl md:text-8xl text-center font-bold bg-gradient-to-bl from-[#FF0000] via-[#FF6400] via-[#FFA816] via-[#FF9A87] via-[#F747D1] to-[#AD5DF1] bg-clip-text text-transparent">
          Unified Model for All.
        </h1>

        <p className="mt-16 mb-0 font-bold text-gray-400 max-w-none dark:text-gray-300 text-center">
          <Link to="#">Jiduo Zhang</Link><sup>1*</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/robert.heinemann">Robert Heinemann</Link><sup>1</sup> and&nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/ottojan.bakker">Otto Jan Bakker</Link><sup>1</sup>
        </p>
        <p className="font-bold text-gray-400 max-w-none dark:text-gray-300 mt-0 text-center"><sup>1</sup> Department of Mechanical and Aerospace Engineering, The University of Manchester</p>

        <div className="mt-12 flex-1 justify-items-center">
          <div className="flex justify-center">
            <Link className="text-white bg-blue-700 shrink-0
            hover:bg-blue-800 focus:outline-none 
            focus:ring-4 focus:ring-blue-300 
            font-medium rounded-full text-normal px-5 py-2.5 
            text-center mr-2 mb-2 dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="#">Read our paper (Still remain unopen)</Link>
            {/* <Link className="px-5 py-2.5 
             text-blue-700 dark:text-blue-100
            text-center mr-2 mb-2" 
            to="https://github.com/kidozh/tpp-cnn-network-for-incidence-identification">View data</Link> */}
          </div>

        </div>
      </div>

    </section>

    <section className="bg-slate-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
        <h1 className="text-4xl text-center font-bold mt-2 text-blue-700 dark:text-blue-200 max-w-none">
          The page is still under construction.
        </h1>
        <p className="text-2xl mt-2 text-center font-medium text-slate-500 dark:text-slate-200 max-w-none">
          Please come back later.
        </p>
      </div>
    </section>

    {/* <section className="bg-gray-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16">
        <p className="text-2xl mt-2 text-gray-500 dark:text-gray-300 max-w-none">
          Given that the proposed method could be applied to any signal processing task, high-accuracy and
          immediate monitoring by deep learning approach could be achieved in a wide range of applications.
          Furthermore, we hope that this method could be a potential solution to the problem of general tool condition
          monitoring in the manufacturing industry.
        </p>
      </div>
    </section> */}

    <section className="bg-slate-200 dark:bg-slate-600">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16 lg:flex">
        <div className="lg:shrink-0" >
          <div className="flex-1 justify-item-center">
            <img className="max-w-full flex justify-center border-r-8 rounded-2xl dark:shadow-xl dark:bg-slate-200" src={CIRPICMELogo} alt="CIRP ICME Logo" />
          </div>

        </div>
        <div className="flex-1 p-6">
          <h1 className="text-2xl
          text-gray-500 dark:text-gray-200">
            The paper entitled "In-process unified prediction for process incidence and tool wear based on a deep learning approach"
            has been <b className="text-bold text-gray-900 dark:text-gray-100">accepted</b> by&nbsp;
            <Link className="text-gray-500 dark:text-gray-200
            ease-in-out hover:text-green-700 dark:hover:text-green-400
            hover:underline transition-all duration-300"
              to="https://cirpicme.org/">18th CIRP Conference on
              Intelligent Computation in Manufacturing Engineering.</Link>
          </h1>
        </div>

      </div>
    </section>

    <section className="bg-blue-100 dark:bg-blue-900">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-8 lg:flex align-middle">
        <div className="flex-1 justify-center align-middle">
          <p className="text-4xl p-8 font-normal text-blue-900 dark:text-blue-200 max-w-none">
            Jiduo would like to acknowledge the continuing contribution to this research by&nbsp;
            <Link to="https://www.csc.edu.cn/" className="hover:text-blue-700
            transition-all duration-150 ease-in-out hover:underline font-bold
            dark:hover:text-blue-200">China scholarship council</Link>.
          </p>
        </div>

        <div className="lg:shrink-0" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center 
            h-48 md:h-36
            border-r-8 rounded-2xl dark:shadow-xl dark:bg-slate-200" src={CSCLogo} alt="Logo of China scholarship council" />
          </div>

        </div>


      </div>

    </section>

    <section className="bg-gray-100 dark:bg-gray-700">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-8">
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
export const Head = () => <Seo title="In-process unified prediction for process incidence and tool wear based on a deep learning approach" />

export default TppPage