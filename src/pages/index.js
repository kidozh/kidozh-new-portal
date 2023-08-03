import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({data}) => {
  const {posts} = data.update

  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-slate-600 bg-fine-wave-bg-light dark:bg-fine-wave-bg-dark">
        <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
          <h1 class="text-6xl font-bold text-gray-800 dark:text-white font-montserrat">Hi
            <span className="dark:text-orange-500 text-orange-600">.</span></h1>
          <p class="text-2xl text-gray-600 dark:text-gray-300 mt-6 font-montserrat">
            I am Jiduo Zhang and a Ph.D. student majoring in Mechanical Engineering at
            The University of Manchester<span className="dark:text-orange-500 text-orange-600">.</span></p>
  
          <div className="mt-8">
            <Link to="https://github.com/kidozh"
              type="button" class="text-white font-montserrat bg-gray-900 hover:bg-gray-800 
            focus:outline-none focus:ring-4  focus:ring-blue-300 font-medium 
            rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800
             dark:hover:bg-gray-900 dark:focus:ring-gray-900">Github</Link>
  
            <Link to="https://www.researchgate.net/profile/Jiduo-Zhang"
              type="button" class="text-white font-montserrat bg-green-700 hover:bg-green-800 
            focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium 
            rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500
             dark:hover:bg-green-600 dark:focus:ring-green-700">ResearchGate</Link>
  
            <Link to="https://scholar.google.com/citations?user=nudc3xUAAAAJ&hl=en"
              type="button" class="text-white font-montserrat bg-blue-500 hover:bg-blue-600 
            focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium 
            rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600
             dark:hover:bg-blue-700 dark:focus:ring-blue-800">Google Scholar</Link>
  
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-900">
        <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
          <h1 className="text-4xl font-bold font-montserrat text-gray-800 dark:text-white">📢 Latest <span className="bg-orange-300 dark:bg-orange-600 text-underline">update</span></h1>
            {
            posts.map(post => (
              <p key={post.excerpt} className="text-light text-gray-800 dark:text-gray-200 break-normal mt-4 font-normal">
                <span className="text-gray-400 dark:text-gray-500 mr-3 font-extrabold">{post.frontmatter.date}</span>
                <Link to={post.fields.slug}
                 className="text-gray-700 dark:text-gray-300 font-bold
                  transition-all duration-300 ease-in-out
                  hover:text-gray-600 hover:underline-offset-4
                  dark:hover:text-gray-300 dark:hover:underline-offset-4">{post.frontmatter.excerpt}</Link>
              </p>
              ))
            }
          
          
        </div>
      </section>
      <section className="bg-blue-100 dark:bg-blue-800">
        <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-400">Looking for something else?</h1>
          <p className="text-normal font-bold text-gray-500 dark:text-gray-200 mt-4">
            There are a few changes in the pages due to site maintenance which causes loss to serveral contents of this site.</p>
        </div>
      </section>
  
    </Layout>
  )
}

export const pageQuery = graphql`
  query MyQuery {
    update:allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1) {
      posts:nodes {
        excerpt
        frontmatter {
          author
          date(formatString: "YYYY-MM-DD")
          excerpt
          title
        }
        html
        fields {
          slug
        }
      }
    }
  }
`


/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */



export const Head = () => <Seo title="Home" />

export default IndexPage
