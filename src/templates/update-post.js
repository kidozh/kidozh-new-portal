import * as React from "react"
import { graphql } from 'gatsby'
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const UpdatePostPage = ({data}) => {
    const post = data.markdownRemark;

    return (
        <Layout>

            <div className="bg-indigo-200 dark:bg-indigo-400 p-8 bg-fine-wave-bg-light dark:bg-fine-wave-bg-dark">
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <section className="w-full mx-auto max-w-screen-xl px-6 pt-32">
                        <h4 className="text-md font-bold font-montserrat text-gray-500 dark:text-gray-400 ">
                            {post.frontmatter.date}
                        </h4>
                        <h1 className="text-4xl font-bold mt-4 font-montserrat text-gray-800 dark:text-gray-100 ">
                            {post.frontmatter.title}
                        </h1>
                        
                        <hr className="my-4 mt-4 mb-8 h-2 w-32 border-orange-600" />
                        <article className="prose dark:prose-invert md:prose-xl 
                            prose-img:rounded-xl prose-a:text-orange-600 prose-a:hover:text-orange-800
                                transition-all duration-500 ease-in-out prose-a:no-underline
                            dark:prose-a:text-orange-300 dark:prose-a:hover:text-orange-400
                        
                        lg:prose-2xl max-w-none prose-stone" >
                            <div className="mt-8" dangerouslySetInnerHTML={{ __html: post.html }}></div>
                        </article>
                        

                    </section>

                    <section className="w-full mx-auto max-w-screen-xl px-6 pb-16">
                        <div className="mt-16">
                            <p className="text-gray-800 dark:text-gray-100 font-montserrat">
                                <Link to="/update" className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-500">← Back to updates</Link>
                            </p>
                        </div>
                    </section>
                </div>

                
                

            </div>

        </Layout>
    )
}

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({data}) => <Seo title={data.markdownRemark.frontmatter.title} />

export default UpdatePostPage
