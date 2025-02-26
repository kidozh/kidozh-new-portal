import * as React from "react"
import Layout from "../../components/layout";
import Seo from "../../components/seo"
import { Link } from "gatsby"
import Robonauts from "../../images/project/robonauts.jpg"
import Spark from "../../images/project/sparks.jpg"
import Window from "../../images/project/window.jpg"
import Drill from "../../images/project/drill.jpg"
import PluseTrace from "../../images/project/pulse-trace.jpg"
import DnaSignalForm from "../../images/project/gene-6527964.jpg"
import GalaxyImage from "../../images/project/galaxy-2357413_1920.jpg"

const ProjectCardDark = ({ title, description, link, keywords, image }) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden
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
                PREVIEW  <svg aria-hidden="true" class="ml-4  w-6 h-6 group-hover:translate-x-4 duration-700 delay-75 ease-in-out"
                    fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>

            <p className="mt-8 font-montserrat text-normal mb-24 
             text-gray-200 border-b-orange-700 ">{description}</p>
            <h2 className="text-2xl font-montserrat font-bold text-white">{title}</h2>
            <hr className="h-1 my-8 w-16 mt-2 mb-6 border-2 bg-orange-400 border-orange-400
             dark:bg-indigo-400 dark:border-indigo-400" />

            <p className="mt-4 font-montserrat text-sm font-light text-gray-300">{keywords}</p>
        </div>
    </div>
);

const ProjectCard = ({ title, description, link, keywords }) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden
        dark:hover:bg-gradient-to-r dark:hover:from-cyan-500 dark:hover:to-blue-500
        hover:bg-gradient-to-r hover:from-orange-200 hover:to-red-200
        hover:scale-105
        group hover:transition-all duration-500 ease-in-out">
        <div className="px-8 py-12">
            <Link to={link} className="font-montserrat inline-flex justify-center items-center
                
                mb-4 text-2xl text-gray-600 group-hover:text-gray-950 group-hover:font-bold dark:text-gray-400 dark:group-hover:text-gray-200">
                PREVIEW  <svg aria-hidden="true" class="ml-4  w-6 h-6 group-hover:translate-x-4 duration-700 ease-in-out"
                    fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>

            <p className="mt-8 font-montserrat text-normal mb-24 text-gray-700
             dark:text-gray-200 border-b-orange-700">{description}</p>
            <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white">{title}</h2>
            <hr className="h-1 my-8 w-16 mt-2 mb-6 bg-orange-500 border-orange-500
             border-2 dark:bg-indigo-500 dark:border-indigo-500
              group-hover:dark:bg-slate-100 group-hover:dark:border-slate-100
               group-hover:bg-red-600 group-hover:border-red-600" />

            <p className="mt-4 font-montserrat text-sm font-light text-gray-700 dark:text-gray-400 group-hover:dark:text-gray-200">{keywords}</p>
        </div>
    </div>
);

const ProjectPage = () => (
    <Layout>
        <div className="bg-indigo-200 dark:bg-indigo-400 p-4">
            <section className="bg-gray-50 dark:bg-slate-600 bg-fine-wave-bg-light dark:bg-fine-wave-bg-dark rounded-3xl">
                <div className="w-full mx-auto max-w-screen-xl px-6 py-16">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white ">
                        PhD academic projects in <span className="bg-purple-200 dark:bg-purple-600 font-montserrat">The University of Manchester</span></h1>
                    <p className="text-normal font-bold text-gray-500 dark:text-gray-200 mt-4 font-normal">Under the supervision of Dr Robert Heinemann and Otto Jan Bakker.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        <ProjectCardDark
                            title="Minimum sufficient signal condition in representing events"
                            description="The most basic unit of signal structure to represent events in machining process."
                            link="/project/manchester-unit"
                            keywords="Deep Learning, Machine Signal"
                            image={DnaSignalForm}
                        />

                        <ProjectCard
                            title="SVM in process incidence identification"
                            description="Accurate and intepretable process incidence identification using support vector machine."
                            link="#"
                            keywords="Machine learning, Feature analysis, Process monitoring"

                        />


                        <ProjectCardDark
                            title="TPP in process incidence identification"
                            description="Remove size limit of preceiving signals to achieve real-time process incidence identification."
                            link="/project/tpp"
                            keywords="Deep learning, Tool wear, Process monitoring"
                            image={GalaxyImage}

                        />

                        <ProjectCard
                            title="Multi-objective prediction in drilling hybrid stacks"
                            description="Achieve multi-objectives prediction in one unified model."
                            link="/project/hybrid-prediction"
                            keywords="Deep learning, Tool wear, Process monitoring"

                        />

                    </div>
                </div>

                <div className="w-full mx-auto max-w-screen-xl px-6 py-16">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white ">
                        MEng academic projects in <span className="bg-blue-200 dark:bg-blue-600 font-montserrat">Northwestern Polytechnical University</span></h1>
                    <p className="text-normal font-bold text-gray-500 dark:text-gray-200 mt-4 font-normal">Under the supervision of Prof. Rong Mo and Huibin Sun.</p>
                    <div className="flex mt-4">
                        <p className="flex flex-auto">
                            <a href="https://www.nwpu.edu.cn" class="hover:transition-all duration-1000 ease-in-out
                         inline-flex justify-center items-center py-1 px-1 pr-4 
                         mb-7 text-sm text-yellow-700 bg-yellow-100 rounded-full
                          dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200
                           dark:hover:bg-yellow-800">
                                <span class="text-xs bg-yellow-600 rounded-full text-white px-4 py-1.5 mr-3">Note</span> <span class="text-sm font-medium">Due to the archieve policy of the university, these projects are no longer maintained.</span>
                                <svg aria-hidden="true" class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            </a>
                        </p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        <ProjectCardDark
                            title="LSTM based tool wear forecast"
                            description="Predict the future tendency of tool wear evolution in an online way."
                            link="https://www.sciencedirect.com/science/article/abs/pii/S0736584519303655"
                            keywords="Deep learning, Tool wear forecast, Long-short term memory"
                            image={Robonauts}
                        />

                        <ProjectCardDark
                            title="Tool wear monitoring in multiple condition"
                            description="A fast and accurate CNN model to monitor tool wear during machining process."
                            link="https://arch-blog.kidozh.com/projects/keras_detect_tool_wear/"
                            keywords="Deep Learning, Machine Tool, Tool wear monitoring, Convolutional Neural Network"
                            image={Drill}
                        />
                        <ProjectCardDark
                            title="The transfer learning in tool wear monitoring"
                            description="One model to predict tool wear in multiple machining condition and its easy transferring to new condition."
                            link="https://arch-blog.kidozh.com/projects/transfer_learning_NASA/"
                            keywords="Deep Learning, Machine Tool, Tool wear monitoring, Transfer Learning"
                            image={Spark}
                        />
                        <ProjectCardDark
                            title="DBSCAN based TDA Visualization"
                            description="Easy, intuitive and accurate way to demonstrate Mechanism of convolutional kernel in processing 1D signal."
                            link="https://arch-blog.kidozh.com/projects/keras_detect_tool_wear/visualization.html"
                            keywords="Deep Learning, Keras, Topology Data Analysis, Visualization"
                            image={PluseTrace}
                        />
                        <ProjectCardDark
                            title="Deep CGAN based tool wear digital twin"
                            description="Simulate real and random signal accordance to tool wear by deep conditional convolutional generative adversarial network"
                            link="https://arch-blog.kidozh.com/projects/digital_twins_by_GAN/"
                            keywords="Deep Learning, Keras, Machine Tool, Digital Twin, Deep Convolutional Generative Adversarial Neural Network"
                            image={Window}
                        />

                    </div>
                </div>

                <div className="w-full mx-auto max-w-screen-xl px-6 py-16">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white font-montserrat">Android & Flutter open source projects</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        <ProjectCard
                            title="Discuz Hub"
                            description="Lightweight Discuz! forum client for Android."
                            link="https://discuzhub.kidozh.com"
                            keywords="MIT License, Since 2018"
                        />

                        <ProjectCard
                            title="DisFly"
                            description="Cross-platform Discuz! forum client for screen in any size."
                            link="https://discuzhub.kidozh.com"
                            keywords="MIT License, Since 2020"
                        />

                    </div>


                </div>
            </section>
        </div>

    </Layout>
);

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Projects" />

export default ProjectPage;