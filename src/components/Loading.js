import React, {useEffect} from 'react'
import styled from 'styled-components';
import logo from "../images/logo.svg";
import { gsap } from "gsap"
import { useLoader } from '@hooks';
import { media } from '../styles';

const Loading = () => {
    const [,setLoading] = useLoader();

    useEffect(() => {
      setLoading(true);
       const mask = ".js-mask";
       const slices = gsap.utils.toArray(".js-mask__slice");
       const lines = gsap.utils.toArray(".js-mask-line");
       const logo = ".js-logo";

       const tl = gsap.timeline({
        onComplete: () => {
            setLoading(false);
          }
       })
       .set(logo, {css: {display: 'block'}})

       tl
       .set(mask, {autoAlpha: 1})
       .fromTo([slices], {
        xPercent: 100,
    }, {
        xPercent: 0,
        ease: "expo.inOut",
        duration: 1.5,
        stagger: 0.06,
    }, -0.09)

    .add("loadingStart")

    .set([logo, lines[0]], {autoAlpha: 1})
    .fromTo(logo, {
        yPercent: -100,
        rotation: 1
    }, {
        yPercent: 0,
        rotation: 0,
        ease: "expo.out",
        duration: 1
    })
    .fromTo(lines, {
        scaleX: 0
    }, {
        scaleX: 1,
        duration: 1,
        ease: "expo.inOut",
        stagger: 0.75,
    }, "-=1")
    .set(lines, {
        transformOrigin: 'right'
      })
      .fromTo(lines[0], {
        scaleX: 1
     }, {
         duration: 1,
         scaleX: 0,
         ease: "expo.inOut",
     })
     .to(logo, {
         yPercent: 150,
         ease: "expo.in",
         duration: 1
     }, "-=0.4")
     .fromTo(slices, {
        xPercent: 0
    },{
      duration: 1.5,
      stagger: 0.095,
      xPercent: 100,
      ease: "expo.inOut"
    }, "-=0.2")
    .set(mask, {
      autoAlpha: 0
    })
       
    }, [setLoading])
    
    return (
      <StyledLoading>
        <div className="mask js-mask">
            <div className="mask__slice js-mask__slice"></div>
            <div className="mask__slice js-mask__slice"></div>
            <div className="mask__slice js-mask__slice"></div>
            <div className="mask__inner">
                <figure className="logo logo--mask">
                    <img className="js-logo" src={logo} alt=""/>
                </figure>
                <div className="mask-line js-mask-line">
                <div className="mask-line__inner js-mask-line"></div>
                </div>
            </div>
            </div>
      </StyledLoading>
    )
}

const StyledLoading = styled.div`
  .mask {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    visibility: hidden;
    opacity: 0;
  }
  .mask__slice {
    -webkit-box-flex: 1;
    flex: 1;
    background-color: #3171c0;
    background-color: #93b4c2;
    background-color: var(--tertiary-color);
  }
  .mask__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    overflow: hidden !important;
  }
  .mask-line {
    position: relative;
    -webkit-transform-origin: left;
    transform-origin: left;
    width: 105%;
    height: 2px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.25);
    visibility: hidden;
    opacity: 0;
  }
  .mask-line__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--link-color);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
  .logo--mask {
    overflow: hidden !important;
  }
  .logo--mask img {
    width: 100%;
    width: 30vw;
    height: auto;
    ${media.tablet`width: 35vw`};
    ${media.phone`width: 45vw`};
    margin: 0 auto;
    visibility: hidden;
    opacity: 0;
    display: none;
  }
`

export default Loading
