import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"


const BlogCard = ({ title, author, date, excerpt, link }) => (
  <div to={link} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden
      dark:hover:bg-gradient-to-r dark:hover:from-cyan-500 dark:hover:to-blue-500
      hover:bg-gradient-to-r hover:from-orange-200 hover:to-red-200
      hover:scale-105
      group hover:transition-all duration-500 ease-in-out">
        <Link to={link}>
          <div className="px-8 py-12">
            <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white">{title}</h2>
            <hr className="h-1 my-8 w-32 mt-2 mb-4 bg-orange-500
            border-2 dark:bg-indigo-500 group-hover:dark:bg-slate-100 group-hover:bg-red-600" />
            <p className="mt-4 font-light text-normal text-gray-700
            dark:text-gray-200 border-b-orange-700">{excerpt}</p>

            <p className="font-montserrat text-sm font-light mt-8
            text-gray-700 dark:text-gray-400 group-hover:dark:text-gray-200">{date}</p>
          </div>
        </Link>
      
  </div>
);

const UpdatePage = ({ data }) => {
    const {posts} = data.blog

    return (
        <Layout>
            <section className="bg-gray-50 dark:bg-slate-600">
                <div className="w-full mx-auto max-w-screen-xl px-6 py-16">
                    <h1 class="text-6xl text-center font-bold text-gray-800 dark:text-white font-montserrat">Update</h1>
                </div>
            </section>

            <section className="bg-gray-50 dark:bg-slate-600">
                <div className="w-full mx-auto max-w-screen-xl px-6 py-16 grid grid-cols-1 md:grid-cols-2">
                    {posts.map(post => (
                        <BlogCard 
                          title={post.frontmatter.title} 
                          author={post.frontmatter.author}
                          date={post.frontmatter.date}
                          excerpt={post.frontmatter.excerpt}
                          link={post.fields.slug} />
                        // <article key={post.id}>
                        //     <h2>{post.frontmatter.title}</h2>
                        //     <small>{post.frontmatter.author}, {post.frontmatter.date}</small>
                        //     <p>{post.excerpt}</p>
                        // </article>
                    ))}
                </div>
            </section>

        </Layout>
    )

}

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark {
      posts: nodes {
        frontmatter {
          date(fromNow: true)
          title
          author
          excerpt
        }
        excerpt
        id
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
export const Head = () => <Seo title="Updates" />

export default UpdatePage
