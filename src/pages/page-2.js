import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { AnimatingProvider, LoadingProvider, MenuProvider } from "../hooks"

const SecondPage = ({location}) => (
  <LoadingProvider>
      <AnimatingProvider>
        <MenuProvider>
          <Layout location={location}>
            <SEO title="Page two" />
            <h1>Hi from the second page</h1>
            <p>Welcome to page 2</p>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
        </MenuProvider>
      </AnimatingProvider>
    </LoadingProvider>
)

export default SecondPage
