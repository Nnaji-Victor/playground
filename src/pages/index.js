import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { theme } from "@styles"
import { AnimatingProvider, LoadingProvider } from "../hooks"
import Hero from "../sections/Hero"
import { MenuProvider } from "../hooks"

const IndexPage = ({location}) => {

  return (
    <>
      <SEO title="Home" />
        <AnimatingProvider>
          <LoadingProvider>
            <MenuProvider>
              <Layout location={location}>
                <StyledHome>
                  <Hero />
                </StyledHome>
              </Layout>
            </MenuProvider>
          </LoadingProvider>
        </AnimatingProvider>
    </>
  )
}

const StyledHome = styled.div`
  font-family: ${theme.fonts.Circular};
`;

export default IndexPage
