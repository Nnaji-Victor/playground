import gsap from 'gsap';
import React from 'react'
import styled from 'styled-components';
import {socialMedia} from '../config';
import { media, mixins } from '../styles';
import { FormattedIcon } from './icons';

const Social = () => {
    React.useEffect(() => {
        gsap.to(".menulink__inner", {
            y: -5,
            // startAt: {y: '50%', opacity: 0},
            ease:  "Power4.easeOut" ,
            duration: 0.15,
            stagger: 0.15,
            opacity: 1,
          },  0.12)
    }, [])
    return (
        <StyledList>
           {socialMedia &&
           socialMedia.map( ({url, name}, i)=> (
             <li key={i}>
                <div className="menulink__inner">
                    <StyledLink
                        href={url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label={name}
                        className="link"
                        >
                        <FormattedIcon name={name} />
                        <span className="name">{name}</span>
                    </StyledLink>
                </div>
             </li>   
           ))}
        </StyledList>
    )
}

const StyledList = styled.ul`

`

const StyledLink = styled.a`
    ${mixins.flexBetween}
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--primary-color);
    text-decoration: none;
    &:hover{
        color: var(--link-color);
        /* opacity: 0.4; */
    }

    ${media.phablet`font-size: 1.3rem; margin-bottom: 15px;`}

    svg {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        fill: currentColor;
    }

    .menulink__inner{
        display: block;
        transform: translate3d(0, 100%, 0);
    }
`;


export default Social
