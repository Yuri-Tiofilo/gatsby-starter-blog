import * as React from "react"
import { Link, graphql } from "gatsby"
import { FiLinkedin, FiGithub } from "react-icons/fi"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer className="footer">
          <div>Gostou? Agradeço por ter lido até aqui, Att Yuri</div>

          <div style={{ marginTop: 10 }}>
            <a
              style={{ textDecoration: "none" }}
              href="https://www.linkedin.com/in/%F0%9F%A7%91%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB-yuri-ti%C3%B3filo-silva-863806185/"
            >
              <FiLinkedin />{" "}
              <span style={{ color: "#000000" }}>Yuri Silva</span>
            </a>
            <a
              style={{ textDecoration: "none", marginLeft: 10 }}
              href="https://github.com/Yuri-Tiofilo"
            >
              <FiGithub />{" "}
              <span style={{ color: "#000000" }}>Yuri Silva</span>
            </a>
          </div>
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
