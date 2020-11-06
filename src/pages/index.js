import React from "react"
import styled from "styled-components"
// import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { theme } from "@styles"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <StyledHome>
        
      </StyledHome>
    </Layout>
  )
}

const StyledHome = styled.div`
  font-family: ${theme.fonts.Circular};
`;

export default IndexPage
