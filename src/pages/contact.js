import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GoFileMedia, GoLocation } from "react-icons/go";

const IndexPage = () => (
    <Layout>
        <section className="bg-gray-50 dark:bg-slate-600">
            <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
                
                <h1 class="text-6xl text-center font-bold text-gray-800 dark:text-white font-montserrat">
                    <GoFileMedia className="inline mr-8" />
                    Email
                    </h1>
                <p class="text-2xl text-center max-w-none break-normal text-gray-600 dark:text-gray-300 mt-6 font-montserrat">
                    jiduo.zhang<span className="dark:text-orange-500 text-orange-600">[AT]</span>postgrad.manchester.ac.uk</p>
                <div class="inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-gray-50 dark:bg-slate-600 left-1/2 dark:text-white ">or</span>
                </div>
                <p class="text-2xl text-center max-w-none text-gray-600 dark:text-gray-300 font-montserrat">
                    kidozh<span className="dark:text-orange-500 text-orange-600">[AT]</span>gmail.com</p>
            </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-900">
            <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
                <h1 class="text-6xl text-center font-bold text-gray-800 dark:text-white font-montserrat">
                    <GoLocation className="inline mr-8" />
                    Location
                </h1>
                <p class="text-2xl text-center max-w-none text-gray-600 dark:text-gray-300 mt-16 font-montserrat">
                    Department of Mechanical and Aerospace Engineering, School of Engineering, The University of Manchester
                </p>
                <p class="text-2xl text-center max-w-none text-gray-600 dark:text-gray-300 font-montserrat mt-4">
                    Core 1 North, Floor 4th, Nancy Rothwell Building, Booth St E, Manchester&nbsp;
                     <span className="dark:text-orange-500 text-orange-600">M13</span>, the United Kingdom</p>
            </div>
        </section>
        <section className="bg-blue-100 dark:bg-blue-900">
            <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
                <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-100 font-montserrat">These email addresses are no longer being monitored:</h1>
                <ul className="list-none p-6 font-roboto list-disc transition-all duration-700">
                    <li className=" text-gray-600 dark:text-gray-300 mt-6">kidozh[AT]mail.nwpu.edu.cn</li>
                    <li className=" text-gray-600 dark:text-gray-300 mt-6">jiduo.zhang[AT]rwth-aachen.de</li>

                </ul>
            </div>
        </section>

    </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Contact" />

export default IndexPage
