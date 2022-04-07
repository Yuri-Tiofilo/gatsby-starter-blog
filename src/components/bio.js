/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="https://avatars.githubusercontent.com/u/49408968?v=4"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && <strong>{author.name}</strong>}
      <span>Develop Fullstack in Typescript.</span>
      <span style={{paddingTop: 10}}>Frameworks: React, React Native, Angular, NodeJS.</span>
      {author?.name && (
        <p>
          Blog totalmente voltado a programação
        </p>
      )}
    </div>
  )
}

export default Bio
