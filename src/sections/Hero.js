import { Link } from 'gatsby';
import React from 'react'
import styled from 'styled-components';

const Hero = () => {
    return (
        <StyledHero>
           hello
           <Link to="/page-2">page2</Link>
        </StyledHero>
    )
}

const StyledHero = styled.section`
   
`;

export default Hero
