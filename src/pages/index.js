import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { theme } from "@styles"
import Hero from "../sections/Hero"

const IndexPage = ({location}) => {

  return (
    <>
      <SEO title="Home" />
        <Layout location={location}>
          <StyledHome>
            <Hero />
          </StyledHome>
        </Layout>
    </>
  )
}

const StyledHome = styled.div`
  font-family: ${theme.fonts.Circular};
`;

export default IndexPage
