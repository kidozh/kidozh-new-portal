import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GoFileMedia, GoLocation } from "react-icons/go";
import Portrait from "../../static/images/portrait.jpeg"
import { Link } from "gatsby";

const CVPage = () => (
    <Layout>
        <section className="bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-gray-200">
            <div className="mx-auto max-w-screen-xl px-6 py-32 rounded-sm">
                {/* Header profile */}
                <div className="w-full">
                    <div class="grid md:grid-cols-2 ">
                        <div className="place-self-start">
                            <div className="bg-cover bg-no-repeat rounded-full h-52 w-52">
                                <img src={Portrait} alt="profile" className="rounded-full h-52 w-52" />
                            </div>
                        </div>
                        <div class="place-self-end grid justify-items-end">
                            <h1 class="text-7xl font-extrabold font-montserrat">Jiduo Zhang</h1>
                            <p class="text-xl mt-5 font-roboto">PhD student in The University of Manchester</p>
                        </div>
                    </div>



                </div>

                <main class="grid md:grid-cols-6 mt-16">
                    <div class="md:col-span-2 place-self-start">

                        <strong class="text-xl font-medium">Contact Details</strong>
                        <ul class="mt-2 mb-10">
                            <li class="px-2 mt-1"><strong class="mr-1">E-mail </strong>
                                <a href="mailto:jiduo.zhang@manchester.ac.uk" class="block">jiduo.zhang@manchester.ac.uk</a>
                            </li>
                            <li class="px-2 mt-1"><strong class="mr-1">Location</strong><span class="block">Manchester,
                                United Kingdom</span></li>
                        </ul>

                        <strong class="text-xl font-medium">Frameworks</strong>
                        <ul class="flex w-full mt-2 mb-10">
                            <li class="px-2 mt-2 w-4/12 bg-pink-600 text-white text-center rounded-tl-lg rounded-bl-lg">Keras
                            </li>
                            <li class="px-2 mt-2 w-4/12 bg-blue-600 text-white text-center">Flutter</li>
                            <li class="px-2 mt-2 w-4/12 bg-yellow-500 text-white text-center rounded-tr-lg rounded-br-lg">PyTorch
                            </li>

                        </ul>

                        <strong class="text-xl font-medium">Research Interests</strong>
                        <ul class="mt-2 mb-10">
                            <li class="px-2 mt-1">Deep learning</li>
                            <li class="px-2 mt-1">Adaptive drilling</li>
                            <li class="px-2 mt-1">Tool condition monitoring</li>
                            <li class="px-2 mt-1">Machine tool</li>
                        </ul>

                        <strong class="text-xl font-medium">Skills</strong>
                        <ul class="mt-2 mb-10">
                            <li class="px-2 mt-1">HTML</li>
                            <li class="px-2 mt-1">CSS</li>
                            <li class="px-2 mt-1">JavaScript</li>
                            <li class="px-2 mt-1">React</li>
                            <li class="px-2 mt-1">Node.js</li>
                            <li class="px-2 mt-1">Python</li>
                            <li class="px-2 mt-1">C/C++</li>
                            <li class="px-2 mt-1">Dart</li>
                            <li class="px-2 mt-1">Java</li>
                            <li class="px-2 mt-1">Kotlin</li>
                        </ul>

                        
                    </div>
                    <div class="md:col-span-4">
                        <section>
                            <h2 class="text-2xl pb-1 border-b font-semibold font-montserrat">About</h2>
                            <p class="mt-4">Jiduo is currently a PhD student at The University of Manchester (UoM).
                            Piror to this, he obtained his BSc and Msc degree in Aircraft Manufacturing at Northwestern
                             Polytechnical University (NPU) in China. By the exchange program between NPU and RWTH Aachen,
                            the bachelor disseration was defended in Aachen in 2017. 
                             His research interests include deep learning, adaptive
                             drilling, tool condition monitoring and machine tool. He is currently working on the research
                             entitled "Preventive process condition monitoring of drilling advanced aerospace materials
                            based on deep learning technology"
                            </p>

                        </section>
                        <section>
                            <h2 class="text-2xl mt-6 pb-1 border-b font-semibold font-montserrat">Projects</h2>
                            {/* <ul class="mt-1">
                                <li class="py-2">
                                    <div class="flex justify-between my-1">
                                        <strong>Rules of 10000 hours</strong>
                                        <p class="flex">
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">HTML</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">CSS</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">JS</span>
                                        </p>
                                    </div>
                                    <ul class="flex mb-2">
                                        <li><a href="#" class="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">Live</a>
                                        </li>
                                        <li><a href="#" class="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">Code</a>
                                        </li>
                                    </ul>
                                    <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
                                        delectus labore enim in minus quod vero dignissimos et, ratione obcaecati quis
                                        maiores? Voluptatem, natus cupiditate perferendis omnis ex hic incidunt!
                                        Earum dolore cupiditate sed et maxime distinctio iure fugiat aspernatur at veniam
                                        laudantium eveniet corporis dicta reiciendis quod consequatur, labore perferendis
                                        dolorum velit quibusdam minus iste dolorem! Officiis, obcaecati maxime</p>
                                </li>
                                <li class="py-2">
                                    <div class="flex justify-between my-1">
                                        <strong>Vending Machine</strong>
                                        <p class="flex">
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">HTML</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">CSS</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">JS</span>
                                        </p>
                                    </div>
                                    <ul class="flex mb-2">
                                        <li><a href="#" class="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">Live</a>
                                        </li>
                                        <li><a href="#" class="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">Code</a>
                                        </li>
                                    </ul>
                                    <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                                        expedita illum optio porro suscipit rerum labore veritatis autem eum totam veniam
                                        repudiandae repellendus perspiciatis eligendi sequi maiores, cum ipsa ut!
                                        Dolorum aliquid quaerat, dolore nemo, vero alias non porro quam totam impedit
                                        repellat voluptas, nobis harum quae dolorem accusantium consequatur. Recusandae
                                        cupiditate possimus natus consequuntur aliquid, molestias provident saepe nobis.
                                    </p>
                                </li>
                                <li class="py-2">
                                    <div class="flex justify-between my-1">
                                        <strong>Landing Page</strong>
                                        <p class="flex">
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">HTML</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">CSS</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">React</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">Node.js</span>
                                        </p>
                                    </div>
                                    <ul class="flex mb-2">
                                        <li><a href="#" class="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">Live</a>
                                        </li>
                                        <li><a href="#" class="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">Code</a>
                                        </li>
                                    </ul>
                                    <p class="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
                                        odio autem non possimus adipisci, sed sequi culpa ipsa necessitatibus repellat
                                        rerum. Obcaecati nobis modi voluptate nam minus praesentium soluta voluptatibus!
                                        Minima temporibus deserunt laborum, expedita ad molestiae perferendis? Ipsa aut,
                                        necessitatibus expedita rem iure minus sit voluptates magni, sequi eum architecto
                                        excepturi tempora dolorum soluta quam odit amet nobis incidunt.</p>
                                </li>
                                <li class="py-2">
                                    <div class="flex justify-between my-1">
                                        <strong>Gamgyul Market</strong>
                                        <p class="flex">
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">HTML</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">CSS</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">React</span>
                                            <span class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">Node.js</span>
                                        </p>
                                    </div>
                                    <ul class="flex mb-2">
                                        <li><a href="#" class="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">Live</a>
                                        </li>
                                        <li><a href="#" class="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">Code</a>
                                        </li>
                                    </ul>
                                    <p class="text-xs">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
                                        suscipit soluta at doloremque ipsa unde, doloribus beatae delectus odio dolorum
                                        consequatur libero esse ratione nostrum nihil quaerat alias cupiditate assumenda?
                                        Nesciunt unde aliquid quam quisquam excepturi deserunt ipsa doloremque culpa itaque.
                                        Esse consectetur odit est laboriosam facilis! Accusamus inventore vel magni sed
                                        aliquid! Aspernatur dolores, nam id fugit ad aliquam.
                                    </p>
                                </li>
                            </ul> */}
                            <p class="mt-4">
                                Please visit the <Link className="text-purple-500
                                 dark:text-purple-300 hover:text-purple-900
                                  hover:dark:text-purple-100" to="/project">projects page</Link> to get detailed information about my projects.</p>
                        </section>

                        <section>
                            <h2 class="text-2xl mt-6 pb-1 border-b font-semibold font-montserrat">Selected Publications</h2>

                            <p class="mt-2 border-l-8 border-blue-600 dark:border-green-600 pl-2 bg-blue-50 dark:bg-green-800 p-4 font-roboto">
                                Please visit the <a className="text-blue-500
                                 dark:text-blue-300 hover:text-blue-900
                                  hover:dark:text-blue-100" href="https://scholar.google.com/citations?user=nudc3xUAAAAJ">Google scholar</a> to view all of my publication.</p>

                            <ul class="mt-1 list-decimal list-inside">
                                <li class="py-2">
                                    <strong class="underline">Jiduo Zhang</strong>, Robert Heinemann, Otto Jan Bakker, Siqi Li, Xiaoyu Xiao, and Yixian Ding. "Minimum Sufficient Signal Condition of Identifying Process Incidence in Stacked Drilling Through Deep Learning." <i>Mechanical Systems and Signal Processing</i>. <span class="text-sm p-1 m-2 bg-blue-600 text-white rounded break-keep">JCR Q1 TOP</span> <span class="text-sm p-1 m-2 bg-blue-600 text-white rounded break-keep">中科院一区 TOP</span>
                                </li>
                                <li class="py-2">
                                    <strong class="underline">Zhang, J.</strong>, Heinemann, R, Bakker OJ. (2025). Process incidence monitoring in material identification during drilling stacked structures using support vector machine. The International Journal of Advanced Manufacturing Technology, 136(2), 827-840. <span class="text-sm p-1 m-2 bg-blue-600 text-white rounded break-keep">JCR Q2</span>
                                </li>

                                <li class="py-2">
                                    Sun, Huibin, <strong class="underline">Jiduo Zhang</strong>, Rong Mo, and Xianzhi Zhang. "In-process tool condition forecasting based on a deep learning method." <i>Robotics and Computer-Integrated Manufacturing</i> 64 (2020): 101924. <span class="text-sm p-1 m-2 bg-blue-600 text-white rounded break-keep">JCR Q1 TOP</span> <span class="text-sm p-1 m-2 bg-blue-600 text-white rounded break-keep">中科院一区 TOP</span>
                                </li>

                                <li class="py-2">
                                    Sun, Huibin, Junlin Pan, <strong class="underline">Jiduo Zhang</strong>, and Dali Cao. "Non-linear Wiener process–based cutting tool remaining useful life prediction considering measurement variability." <i>The International Journal of Advanced Manufacturing Technology</i> 107, no. 11 (2020): 4493-4502. <span class="text-sm p-1 m-2 bg-blue-600 text-white rounded break-keep">JCR Q2</span>
                                </li>

                                <li class="py-2">
                                    Sun, Huibing, Junling Pan, <strong class="underline">Jiduo Zhang</strong>, and Rong Mo. "Digital twin model for cutting tools in machining process." <i>Computer Integrated Manufacturing Systems</i> 25, no. 6 (2019): 1474-1480. <span class="text-sm p-1 m-2 bg-blue-600 text-white rounded break-keep">JCR Q1 TOP</span>
                                </li>
                                
                            </ul>


                            
                        </section>
                        
                        <section>
                            <h2 class="text-2xl mt-6 pb-1 border-b font-semibold font-montserrat">Education</h2>
                            <ul class="mt-2">
                                <li class="pt-4">
                                    <p class="flex justify-between text-sm"><strong class="text-base">The University of Manchester
                                    </strong>2021-present</p>
                                    <p class="flex justify-between text-sm">PhD in Mechanical Engineering</p>
                                </li>
                                <li class="pt-4">
                                    <p class="flex justify-between text-sm"><strong class="text-base">Northwestern Polytechnical Univerisity</strong>2017-2020</p>
                                    <p class="flex justify-between text-sm">MEng in Aircraft Manufacturing<small>GPA 85/100</small></p>
                                </li>
                                <li class="pt-4">
                                    <p class="flex justify-between text-sm"><strong class="text-base">RWTH Aachen University</strong>2016-2017</p>
                                    <p class="flex justify-between text-sm">Research assistant<small>Numerical analysis of friction and pretension effect on composite protruded bolted joints</small></p>
                                </li>
                                <li class="pt-4">
                                    <p class="flex justify-between text-sm"><strong class="text-base">Honors College, Northwestern Polytechnical Univerisity</strong>2013-2017</p>
                                    <p class="flex justify-between text-sm">B.Sc. (Hons) in Aerocraft Manufacturing Engineering<small>GPA 85/100</small></p>
                                </li>
                            </ul>
                        </section>
                    </div>
                </main>
            </div>
        </section>

    </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Curriculum Vitae" />

export default CVPage