import React, {useEffect} from 'react'
import styled from 'styled-components';
import { gsap } from "gsap"
import { useLoader } from '@hooks';

const PageLoading = () => {
    const [,setLoading] = useLoader();
    
    useEffect(() => {
        const mask = ".js-mask";
        const slices = gsap.utils.toArray(".js-mask__slice");

        const tl = gsap.timeline({
            onComplete: () => {
                setLoading(false);
              }
           })

           tl
       .set(mask, {autoAlpha: 1})
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
        <StyledPageLoader>
            <div className="mask js-mask">
                <div className="mask__slice js-mask__slice"></div>
                <div className="mask__slice js-mask__slice"></div>
                <div className="mask__slice js-mask__slice"></div>
            </div>
        </StyledPageLoader>
    )
}

const StyledPageLoader = styled.div`
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
  }
`;

export default PageLoading
