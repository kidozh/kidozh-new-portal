import * as React from "react"


import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link } from "gatsby"
import TppImage from "../../images/project/tpp/tpp.svg"
import TppCNNImage from "../../images/project/tpp/tpp_cnn.svg"
import CIRPICMELogo from "../../images/project/tpp/cirp-icme-logo.webp"
import CSCLogo from "../../images/project/china-scholarship-logo.jpg"

import "../../styles/msu.css"

const TppPage = () => (
  <Layout>
    <section className="bg-gray-50 dark:bg-slate-900 dark:bg-hexagons-bg-dark bg-hexagons-bg-light">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
        <h4 class="text-2xl font-medium text-sky-700 dark:text-indigo-400 text-center font-[roboto]">The basic signal unit representing events in machining condition</h4>
        <h1 className="text-7xl md:text-8xl mt-2 text-center font-bold font-[Inter] text-slate-900 dark:text-white">Minimum Sufficient Unit</h1>
        <p className="mt-16 text-xl mb-0 font-bold font-roboto text-gray-600 max-w-none dark:text-gray-300 text-center">
          <Link to="#">Jiduo Zhang</Link><sup>1*</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/robert.heinemann">Robert Heinemann</Link><sup>1</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/ottojan.bakker">Otto Jan Bakker</Link><sup>1</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="#">Siqi Li</Link><sup>2</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="#">Xiaoyu Xiao</Link><sup>3</sup>, &nbsp;
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 ease-in-out" to="#">Yixian Ding</Link><sup>4</sup>
          
        </p>
          
        <p className="font-bold text-sm font-roboto text-gray-400 max-w-none dark:text-gray-300 mt-8 text-center">
          <sup>1</sup> Department of Mechanical and Aerospace Engineering, The University of Manchester <br />
          <sup>2</sup> Department of Mathematics, The University of Manchester<br />
          <sup>3</sup> Department of Electrical and Electronic Engineering, The University of Manchester <br />
          <sup>4</sup> School of Mechanical, Electronic and Control Engineering, Beijing Jiaotong University <br />
          
          </p>

        <div className="mt-12 flex-1 justify-items-center">
          <div className="flex justify-center">
            <Link className="text-white bg-sky-700 shrink-0
            hover:bg-sky-800 focus:outline-none font-montserrat
            focus:ring-4 focus:ring-sky-300 
            font-medium rounded-full text-normal px-5 py-2.5 
            text-center mr-4 mb-2 dark:bg-sky-600
              dark:hover:bg-sky-700 dark:focus:ring-sky-800" to="#">MSSP</Link>

            <Link className="text-white bg-slate-700 shrink-0
              hover:bg-slate-800 focus:outline-none 
              focus:ring-4 focus:ring-sky-300 font-montserrat
              font-medium rounded-full text-normal px-5 py-2.5 
              text-center mr-2 mb-2 dark:bg-slate-100 dark:text-black
                dark:hover:bg-slate-200 dark:focus:ring-slate-200" to="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4973757" data-tooltip-target="tooltip-default" type="button">Preprint<sup>*</sup></Link>

            <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                Tooltip content
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

          </div>
          <div className="flex justify-center mt-4">
            <p className="text-gray-400 dark:text-gray-600 text-sm">*: The final results is based on the paper published on Mechanical Systems and Signal Processing.</p>
          </div>
          
        </div>
      </div>
        
    </section>

    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16 lg:flex">
        <div className="flex-1 p-6">
          <h1 className="text-4xl mt-0 font-bold text-cyan-700 dark:text-cyan-200 font-montserrat">Playground</h1>
          <p className="text-xl mt-8 font-normal text-slate-500 dark:text-gray-400 max-w-none font-inter">We will make a page allowing you to interactly familiarise yourself with our contribution to the knowledge.</p>
          <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none font-inter">The page will be available soon.</p>
        </div>
        <div className="lg:shrink-0" > 

        </div>
      
      </div>
    </section>
    {/* <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16 lg:flex">
        <div className="flex-1 p-6">
          <h1 className="text-2xl mt-2 font-bold text-cyan-700 dark:text-cyan-200">Minimum Sufficient Frequency</h1>
          <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
            <b className="font-bold text-slate-700 dark:text-gray-100">Four times the spindle frequency.</b>.\ </p>
        </div>
        <div className="lg:shrink-0" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center border-r-8 rounded-2xl dark:shadow-xl dark:bg-slate-200" src={TppImage} alt="TPP model" />
          </div>
          
        </div>
        
      </div>
    </section> */}

    <section className="bg-blue-100 dark:bg-blue-900">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-8 lg:flex align-middle">
        <div className="flex-1 justify-center align-middle">
          <p className="text-4xl p-8 font-normal font-montserrat text-blue-900 dark:text-blue-200 max-w-none">
            Jiduo would like to acknowledge the continuing contribution to this research by&nbsp;
            <Link to="https://www.csc.edu.cn/" className="hover:text-blue-700
            transition-all duration-150 ease-in-out hover:underline font-bold
            dark:hover:text-blue-200 ">China scholarship council</Link>.
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
        <p className="text-2xl mt-2 font-normal text-gray-500 dark:text-gray-200 max-w-none  font-roboto">
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