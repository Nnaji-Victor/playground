// import { Link } from 'gatsby';
import React from 'react'
import styled from 'styled-components';
import { media, mixins } from '../styles';

const Hero = () => {
    return (
      <StyledHero>
        <HeroContentContainer>
          <div className="text">
            <div className="dot-patterns dots">
              <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {/* <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div> */}
            </div>
            <StyledHeroTexts>
                <h1>Discover Designs</h1>
                <h1>in <span>AnimeJs.</span></h1>
            </StyledHeroTexts>
          </div>
          <div className="image">image</div>
        </HeroContentContainer>
      </StyledHero>
    )
}

const StyledHero = styled.section`
    ${mixins.container};
    margin-top: 80px;
    ${media.phablet`margin-top: 50px`}
`;

const HeroContentContainer = styled.div`
  ${mixins.flexBetween};
  ${media.tablet`display: block`}

  .text {
    position: relative;
    .dot-patterns {
      /* background-color: red; */
      position: absolute;
      /* left: -10vh; */
      z-index: 15;
      top: -20px;
    }

    .dots {
      width: 18.44vh;
      height: 30vh;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      /* transform: translate(1.56vh, -6.22vh); */
      

      &:not(.animatedIn) {
        & > div > span {
          will-change: transform;
        }
      }

      & > div {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(4, auto);
        transform: translate3d(0, 0, 0);
        transition: 0.7s $pop;

        @for $row from 0 through 4 {
          &:nth-child(#{$row + 1}) {
            transition-delay: 0.1s * $row;

            & > span {
              @for $column from 0 through 3 {
                &:nth-child(#{$column + 1}) {
                  transition-delay: 0.1s * $row + 0.05s * $column;
                }
              }
            }
          }
        }

        & > span {
          @include scaleSvg;
          transform: scale(1);
          width: 5px;
          height: 5px;
          background: var(--link-color);
          opacity: 0.9;
          border-radius: 50%;
          transition: 0.7s cubic-bezier(.2,1.3,.6,3);;
        }
      }
    }

    .isPassiveDotPattern {
      & > div {
        transform: translate3d(-5px, 5px, 0);

        & > span {
          transform: scale(0) translate(-3px, 7px);
        }
      }
    }

    .animatedIn {
      & > div {
        transform: translate(0, 0);
      }
    }
  }
`;

const StyledHeroTexts = styled.div`
    font-size: 80px;
    transform: translate(5.56vh,2.78vh);
    font-weight: 900;
    line-height: 100px;
    color: var(--heading-color);

    span{
        color: var(--link-color);
    }

`;

export default Hero
