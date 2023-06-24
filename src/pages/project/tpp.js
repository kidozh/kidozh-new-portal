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
        <h4 class="text-2xl font-medium text-cyan-700 dark:text-green-100 text-center">Remove input barrier in the way of deep learning in signal processing</h4>
        <h1 className="text-8xl mt-2 text-center font-bold text-slate-900 dark:text-white">Temporal Pyramid Pooling</h1>
        <p className="mt-16 mb-0 font-bold text-gray-400 max-w-none dark:text-gray-300 text-center">
          <Link to="#">Jiduo Zhang</Link><sup>1*</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/robert.heinemann">Robert Heinemann</Link><sup>1</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/ottojan.bakker">Otto Jan Bakker</Link><sup>1</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://www.researchgate.net/profile/Menghui-Zhu">Menghui Zhu</Link><sup>1</sup></p>
        <p className="font-bold text-gray-400 max-w-none dark:text-gray-300 mt-0 text-center"><sup>1</sup> School of Engineering, The University of Manchester</p>

        <div className="mt-12 flex-1 justify-items-center">
          <div className="flex justify-center">
            <Link className="text-white bg-blue-700 shrink-0
            hover:bg-blue-800 focus:outline-none 
            focus:ring-4 focus:ring-blue-300 
            font-medium rounded-full text-normal px-5 py-2.5 
            text-center mr-2 mb-2 dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="/">Read our paper</Link>
            <Link className="px-5 py-2.5 
             text-blue-700 dark:text-blue-100
            text-center mr-2 mb-2" to="/">View source </Link>
          </div>
          
        </div>
      </div>
        
    </section>
    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16 lg:flex">
        {/* should place a TPP model here */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl mt-2 font-bold text-cyan-700 dark:text-cyan-200">Divide and pool</h1>
          <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
            <b className="font-bold text-slate-700 dark:text-gray-100">Constant-shaped
            output.</b> As shown in the figure, 
            three pool numbers (1, 2 and 4) are employed, which produces 
            regions consisting of one vector with shape (N, L, C),
             two vectors with shape (N, L/2, C) and four vectors
              with shape (N, L/4, C). Then max pooling operations 
              are conducted in these vectors, and the resulting
               maximum values are concentrated into a one-dimensioned 
               vector shaped as (N, (1+2+4)*C) , which produces a constant
                shaped output for an input of any length. </p>
        </div>
        <div className="lg:shrink-0" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center border-r-8 rounded-2xl dark:shadow-xl dark:bg-slate-200" src={TppImage} alt="TPP model" />
          </div>
          
        </div>
        
      </div>
    </section>
    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl px-6 pt-16">
        <div className="flex-1 p-6">
          <h1 className="text-2xl mt-2 font-bold text-cyan-700 dark:text-cyan-200">A perfect match</h1>
          <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <b className="font-bold text-slate-700 dark:text-gray-100">Incredible speed and minimum size.</b>&nbsp;
            With the utilisation of convolutional neural network (CNN), the TPP-CNN model could recognise
            both fine and macro structures of the signal with shared weights and minimum parameters, deployable for
            embleed devices and their integrated system.
          </p>
        </div>
        
        

        


      </div>
      <div className="w-full mx-auto max-w-screen-xl px-6 pb-16" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center border-r-8 p-6 rounded-2xl 
            dark:shadow-xl dark:bg-slate-200" src={TppCNNImage} alt="TPP model" />
          </div>
          
        </div>
    </section>
    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16 grid md:grid-cols-4">
        <div className="flex justify-center">
          <div className="p-6 mb-16 md:mb-0 bg-slate-700
          bg-gradient-to-r from-slate-700 to-slate-900
          dark:bg-gradient-to-r dark:from-slate-500 dark:to-slate-600
          align-middle 
          w-32 h-32 ">
            <h1 className="text-2xl mt-2 font-bold text-center align-middle text-gray-100 ">TPP<br/>CNN</h1>
          </div>
        </div>
        

        <div className="">
          <h6 className="font-bold text-normal text-gray-500 dark:text-gray-400">Accuracy</h6>
          <h1 className="text-4xl mt-2 text-gray-900 dark:text-gray-100">
            <span className="text-bold text-8xl">99</span>%</h1>
          <p className="font-bold text-normal text-gray-500 dark:text-gray-400">In identify incidence.</p>
        </div>

        <div className="">
        <h6 className="font-bold text-normal text-gray-500 dark:text-gray-400">Accommodatable time</h6>
          <h1 className="text-4xl mt-2 text-gray-900 dark:text-gray-100"><span className="text-bold text-8xl">∞</span></h1>
          <p className="font-bold text-normal text-gray-500 dark:text-gray-400">
            Input in any size permitted.<sup>2</sup></p>
        </div>

        <div className="">
          <h6 className="font-bold text-normal text-gray-500 dark:text-gray-400">Up to</h6>
          <h1 className="text-4xl mt-2 text-gray-900 dark:text-gray-100"><span className="text-bold text-8xl">50</span></h1>
          <p className="font-bold text-normal text-gray-500 dark:text-gray-400">
            Identification times in 1 second.<sup>3</sup></p>
        </div>
      </div>
      
      <div className="w-full mx-auto max-w-screen-xl px-6 py-8">
        <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <b className="font-bold text-slate-700 dark:text-gray-100">One for all.</b>&nbsp;
            The proposed method allows deep learning model to process signal in any length, which could archieve
            both high accuracy and immediate response at one model.
        </p>

        <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <b className="font-bold text-slate-700 dark:text-gray-100">Wide-spectrum and reusable.</b>&nbsp;
            Compared with the traditional model, the proposed method could accurately identify process incidences 
            for different combination of frequency and duration
            once it get well trained, thereby saving the time in rebuilding, retraining
             and retesting the models .
        </p>

        <p className="text-sm mt-16 font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <sup>2</sup>: Subject to the hardware and software environment, 
          excessive sized input will generate gaint feature maps and therefore exhaust computation resources.
        </p>
        <p className="text-sm font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <sup>3</sup>: The test was conducted on the environment of NVIDIA RTX 3080 with CUDA 11,
          and sampling duration is 0.1s with the frequency of 1KHz.
        </p>

      </div>
    </section>

    <section className="bg-gray-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16">
        <p className="text-2xl mt-2 text-gray-500 dark:text-gray-300 max-w-none">
          Given that the proposed method could be applied to any signal processing task, high-accuracy and
          immediate monitoring by deep learning approach could be achieved in a wide range of applications.
          Furthermore, we hope that this method could be a potential solution to the problem of general tool condition
          monitoring in the manufacturing industry.
        </p>
      </div>
    </section>

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
            The paper entitled "In-process tool incidence identification based 
            on temporal pyramid pooling and convolutional neural network" 
            has been <b className="text-bold text-gray-900 dark:text-gray-100">accepted</b> by&nbsp;
            <Link className="text-gray-500 dark:text-gray-200
            ease-in-out hover:text-green-700 dark:hover:text-green-400
            hover:underline transition-all duration-300"
             to="https://cirpicme.org/">17th CIRP Conference on
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
            transition-all duration-150 ease-in-out hover:underline
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
export const Head = () => <Seo title="In-process tool incidence identification based on temporal pyramid pooling and convolutional neural network" />

export default TppPage