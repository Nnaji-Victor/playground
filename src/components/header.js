import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components";
import { media, mixins } from "../styles";
import {gsap} from 'gsap';
import Logo from '../images/logo.svg';
import { useAnimating, useMenu } from "../hooks";

const Header = () => {
  React.useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".brand .logo", {
      y: 100,
      autoAlpha: 0,
      ease: "Power4.in",
    },{
      y: 0,
      autoAlpha: 1,
      ease: "Power4.in",
    }, "start")
    .fromTo(".hamburger--mask .hamburger", {
      y: 120,
      opacity: 0,
    }, {
      y: 0,
      autoAlpha: 1,
      opacity: 1,
      ease: "expo.in"
    },"start+=0.01")
  }, [])

  const [open , setOpen] = useMenu();
  const [animating] = useAnimating();
  const handleOpen = (e) => {
    e.preventDefault();
    if(animating){
      return;
    }
    setOpen(x => !x);
  }
  return (
      <StyledHeader>
        <Nav>
          <StyledLogo to="/" className="brand link">
            <img src={Logo} alt="brand" className="logo"/>
          </StyledLogo>

          <div className="hamburger--mask">
            <button className={`hamburger link ${open ? 'open': ''}`} onClick={handleOpen}>
                <span></span>
                <span></span>
                <span></span>
            </button>
          </div>

        </Nav>
    </StyledHeader>
  )
}
const Nav = styled.nav`
  ${mixins.flexBetween};
  height: 7rem;
  margin-top: 1rem;
  ${media.phone`height: 6rem`}

  .hamburger {
      display: block;
      width: 35px;
      height: 20px;
      position: relative;
      background-color: transparent;
      border: none;
      z-index: 35;
      transition: .5s ease-in-out;
      transform: rotate(0deg);
      opacity: 0;
      visibility: none;

      &:focus,&:active{
        outline: none;
      }

      &.open span:nth-child(1){
          top: 10px;
          transform: rotate(135deg);
        }
        &.open span:nth-child(2){
          opacity: 0;
          left: -60px;
        }
        &.open span:nth-child(3){
          top: 10px;
          -webkit-transform: rotate(-135deg);
          -moz-transform: rotate(-135deg);
          -o-transform: rotate(-135deg);
          transform: rotate(-135deg);
        }

      span {
        display: block;
        position: absolute;
        left: 50%;
        width: 100%;
        height: 3px;
        background: var(--color-black);
        z-index: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
        left: 0;

        &:nth-child(1) {
          top: 0px;
        }
        &:nth-child(2) {
          top: 8px;
        }
        &:nth-child(3) {
          top: 16px;
        }
        &:before,
        &:after {
          position: absolute;
          content: "";
          display: block;
          top: 0;
          height: 100%;
          width: 0;
          right: 0;
          left: auto;
        }
        &:before {
          z-index: 1;
          background: var(--color-black);
          transition: all 0.15s linear 0s;
        }
        &:after {
          z-index: 2;
          background: var(--color-storm);
          transition: all 0.15s linear 0.3s;
        }
        &:nth-child(2):before {
          transition-delay: 0.15s;
        }
        &:nth-child(3):before {
          transition-delay: 0.3s;
        }
        &:nth-child(2):after {
          transition-delay: 0.45s;
        }
        &:nth-child(3):after {
          transition-delay: 0.6s;
        }
      }

      &:hover{
        span {
          &:after,
          &:before {
            width: 100%;
            left: 0;
            right: auto;
          }
          &:after {
            z-index: 1;
            transition: all 0.15s linear 0s;
          }
          &:before {
            z-index: 2;
            transition: all 0.15s linear 0.3s;
          }
          &:nth-child(2):after {
            transition-delay: 0.15s;
          }
          &:nth-child(3):after {
            transition-delay: 0.3s;
          }
          &:nth-child(2):before {
            transition-delay: 0.45s;
          }
          &:nth-child(3):before {
            transition-delay: 0.6s;
          }
        }
      }
  }

  .hamburger--mask{
    overflow: hidden;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledHeader = styled.header`
  ${mixins.container};
`;

const StyledLogo = styled(Link)`
  overflow: hidden;
  .logo{
    width: 20rem;
    opacity: 0;
    visibility: hidden;
    ${media.phone` width: 15rem`}
  }
`;
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
