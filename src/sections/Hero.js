// import { Link } from 'gatsby';
import React from 'react'
import styled from 'styled-components';
import { mixins } from '../styles';

const Hero = () => {
    return (
        <StyledHero>
           
        </StyledHero>
    )
}

const StyledHero = styled.section`
    ${mixins.container};
    margin-top: 80px;
`;

export default Hero
