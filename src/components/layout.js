import React from "react"
import PropTypes from "prop-types"
import "./layout.css"
import styled from "styled-components"
import { useLoader } from "../hooks"
import Banner from "./Banner"
import Loading from "./Loading"
import LineMaker from "./LineMaker"
import { theme } from "../styles"
import FontFaces from "../styles/fonts"
import Header from "./header"
import Menu from "./Menu"
import PageLoading from "./PageLoading"

const Layout = ({ children, location }) => {

  const isHome = location.pathname === '/';
  const [isLoading, setLoading] = useLoader();
  React.useEffect(() => {
    // TODO change to true
    setLoading(false);
  }, [setLoading])

  return (
    <>
      {isLoading && isHome ? (
          <Loading />
      ) : isLoading && !isHome ? (
        <PageLoading />
      ) : (
        <>
        <Banner />
        <StyledLayout>
          <LineMaker />
          <Header />
          <Menu />
          {children}
        </StyledLayout>
        </>
      )}
    </>
  )
}
const StyledLayout = styled.section`
  ${FontFaces}
  height: 100vh;
  font-family: ${theme.fonts.Circular}
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
