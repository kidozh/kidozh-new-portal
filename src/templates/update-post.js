import * as React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import Seo from "../components/seo"

const UpdatePostPage = ({data}) => {
    const post = data.markdownRemark;

    return (
        <Layout>
            <div className="bg-gray-50 dark:bg-gray-800 p-4">
                <section className="w-full mx-auto max-w-screen-xl px-6 py-32">
                    <h4 className="text-md font-bold font-montserrat text-gray-500 dark:text-gray-400 ">
                        {post.frontmatter.date}
                    </h4>
                    <h1 className="text-4xl font-bold mt-4 font-montserrat text-gray-800 dark:text-gray-100 ">
                        {post.frontmatter.title}
                    </h1>
                    
                    <hr className="my-4 mt-4 mb-8 h-1 w-32 bg-orange-600 dark:bg-orange-400" />
                    <div className="prose lg:prose-xl prose-slate dark:prose-invert">
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    </div>

                </section>

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
