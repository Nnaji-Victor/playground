import React from 'react'
import styled from 'styled-components'

const Banner = () => {
    return (
        <StyledBanner>
            Hello Everyone
        </StyledBanner>
    )
}

const StyledBanner = styled.div`
    height: 60px;
    display: none;
    background: red;
    position: sticky;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
`;

export default Banner
