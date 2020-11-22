import React from 'react'
import styled from 'styled-components'
import {Link, graphql,  useStaticQuery} from 'gatsby';
import { media, mixins} from '../styles';
import Social from './Social';
import portrait from '../images/portrait.jpg';
import roadmap from '../images/roadmap.svg';
import arrow from '../images/arrow-right.svg';
import { useAnimating, useMenu } from '../hooks';
import gsap from 'gsap';
// import useWPMenu from '../hooks/useWPMenu';

const Menu = () => {
  function handleMouseleave(el) {
    el.currentTarget.classList.add("animate-out")
  }

  function handleTransEnd(el) {
    el.currentTarget.classList.remove("animate-out")
  }

  const [open] = useMenu();
  const menuRef = React.useRef(null);
  const [, setAnimating] = useAnimating();


const data = useStaticQuery(graphql`
{
  main: wordpress {
    menu(id: "dGVybToz") {
      menuItems {
        edges {
          node {
            label
            path
          }
        }
      }
    }
  }

  secondary: wordpress {
    menus(where: {slug: "secondary-menu"}) {
      nodes {
        menuItems {
          nodes {
            childItems {
              edges {
                node {
                  label
                  url
                }
              }
            }
            label
          }
        }
      }
    }
  }

}
`)

  const secondary = data.secondary.menus.nodes[0].menuItems.nodes;
  const main = data.main.menu.menuItems.edges;

  React.useEffect(() => {
    if(open){
      toggle('open')
    }else{
      toggle('close')
    }

    function toggle(action) {
      setAnimating(true);
      const items = gsap.utils.toArray(".menu__item");
      const itemsTotal = items.length;

      if(action === 'open'){
        gsap.set(menuRef.current, {autoAlpha: 1});
      }

      // items to animate
      const mainlinks = gsap.utils.toArray('.mainmenu a.mainmenu__item');
      const sidemenulinks = gsap.utils.toArray(".js-sidemenu");

      // const sidemenuSocial = gsap.utils.toArray(".sidemenu .menulink__inner");
      const roadMapText = ".road-map__text";
      const portraitImg = ".menu__item-map";
      const portraitText = ".menu__item-hoverlink";

      menuRef.current.classList[action === 'open' ? 'add' : 'remove']('menu--open');
        function animationEnd(pos){
          if ( pos === itemsTotal-1 ) {
              setAnimating(false); 
          }
        }; 
      
      items.forEach( (el, pos) => {
        const innerEl = el.querySelector('.menu__item-inner');
        const config = {};
        const configInner = {};
        const direction = el.dataset.direction;

        if (direction === "bt") {
          config.y = "101%"
          configInner.y = "-101%"
          configInner.x = "0%"
        } else if (direction === "tb") {
          config.y = "-101%"
          configInner.y = "101%"
          configInner.x = "0%"
        } else if (direction === "lr") {
          config.x = "-101%"
          configInner.x = "101%"
        } else if (direction === "rl") {
          config.x = "101%"
          configInner.x = "-101%"
        } else {
          config.x = "101%"
          config.y = "101%"
          configInner.x = "-101%"
          configInner.y = "-101%"
        }


        if ( action === 'open' ){
          gsap.set(menuRef.current, {css: {zIndex: 20}})
          gsap.set(el, config);
          gsap.set(innerEl, configInner);
          gsap.to([el,innerEl],{
            ease: "Power4.easeOut",
            x: '0%',
            y: '0%',
            duration: .9, 
            onComplete: () => animationEnd(pos)
        });
      }
      else{
        gsap.to(menuRef.current, {css: {zIndex: -1}})
        gsap.to(el,{
          duration: 0.6,
          ease: "Power4.easeInOut",
          x: config.x || 0,
          y: config.y || 0
        });
        gsap.to(innerEl, {
          duration: 0.6,
          ease: "Power4.easeInOut",
          x: configInner.x || 0,
          y: configInner.y || 0,
          onComplete: () => animationEnd(pos)
        })
      }
      });

      //Indivual animations
      const tl = gsap.timeline();
      tl
        .to([mainlinks], {
          y: 1,
          startAt: action === 'open' ? {y: '50%', opacity: 0} : null,
          ease: action === 'open' ? "Power4.easeOut" : "Power4.easeInOut",
          stagger: action === 'open' ? 0.15 : 0.1,
          opacity: action === 'open' ? 1 : 0,
        },  action === 'open' ? 0.12 : -0.1)
        .to(sidemenulinks, {
          duration: 0.5,
          y: action === 'open' ? '0%' : '100%',
          ease: action === 'open' ? "Power4.easeOut" : "Power4.easeInOut",
          opacity: action === 'open' ? 1 : 0,
        }, action === 'open' ? 0.05 : -0.05)
        .to(portraitImg, {
          duration: 5,
          scale: action === 'open'? 1.6 : null,
          ease: "ease.out",
        },1)
        .from([portraitText, roadMapText], {
          duration: 0.5,
          ease: action === 'open' ? "Power4.easeOut" : "Power4.easeInOut",
          opacity: 0,
          y: action === 'open' ? 10 : 0,
        }, action === 'open' ? 0.5 : -0.5)
    }
  },[open, setAnimating])

    return (
      <StyledMenu className={`menu`} ref={menuRef}>
        <div className="menu__item menu__item--1" data-direction="bt">
          <div className="menu__item-inner">
            <div className="mainmenu">
              {main.map((mainmenu, i) => (
                <div className="mainlink__inner" key={i}>
                  <Link to={mainmenu.node.path} className="mainmenu__item link">
                    {mainmenu.node.label}
                  </Link>
              </div>
              ))}
            </div>
            <p className="label label--topleft label--vert-mirror">
              Animate the hell outta anything
            </p>
            <p className="label label--bottomright label--vert">
              Made by Nnaji Victor
            </p>
          </div>
        </div>
        <div className="menu__item menu__item--2" data-direction="lr">
          <div className="menu__item-inner menu__item-map__inner">
            <StyledImageBg
              bg={portrait}
              className="menu__item-map"
            ></StyledImageBg>
              <div className="mainlink__inner-2">
                <StyledRoadMapText
                  className="menu__item-hoverlink"
                  to="#"
                  onMouseLeave={handleMouseleave}
                  onTransitionEnd={handleTransEnd}
                >
                  About
                </StyledRoadMapText>
              </div>
          </div>
        </div>
        <div
          className="menu__item menu__item--3"
          data-direction={window.screen.width > 768 ? "bt" : "tb"}
        >
          <div className="menu__item-inner">
            <div className="menu__item--3-content">
            {
                secondary.map((sm, i) => {
                  if(sm.childItems.edges.length > 0){
                    return (
                      <div key={i}>
                        <div className="mainlink__inner">
                        <div className="sidemenu__item-heading js-sidemenu">
                          {sm.label}
                        </div>
                       </div>
                       <div className="sidemenu-main-content">
                          {sm.childItems.edges.map((smLink, j) => (
                            <div className="mainlink__inner" key={j}>
                                <Link to={smLink.node.url} className="sidemenu__item-content js-sidemenu">
                                  {smLink.node.label}
                                </Link>
                            </div>
                          ))}
                       </div>
                       <div className="sidemenu__item-content">...</div>
                       </div>
                    )
                  }
                })
              }
              
            </div>
          </div>
        </div>
        <div className="menu__item menu__item--4" data-direction="rl">
          <div className="menu__item-inner">
            <StyledRoadMap className="road-map__container">
              <div className="road-map__image">
                <img src={roadmap} alt="" className="absurd" />
              </div>
              <div className="road-map__text">
                <StyledRoadMapText
                  to="#"
                  onMouseLeave={handleMouseleave}
                  onTransitionEnd={handleTransEnd}
                >
                  See RoadMap
                </StyledRoadMapText>
                <span className="road-map__arrow">
                  <img src={arrow} alt="" />
                </span>
              </div>
            </StyledRoadMap>
          </div>
        </div>
        <div className="menu__item menu__item--5" data-direction="tb">
          <div className="menu__item-inner">
            <div className="sidemenu">
              <Social />
            </div>
          </div>
        </div>
      </StyledMenu>
    )
};


const StyledMenu = styled.div`
  &.menu--open {
      pointer-events: auto;
      z-index: 20;
  }
  text-align: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  visibility: hidden;
  display: grid;
  /* z-index: -5; */
  /* pointer-events: none; */

  ${media.phablet`
        grid-template-columns: 100%;
        grid-template-rows: 40% 30% 30%;
        grid-template-areas: 
            "item1"
            "item2"
            "item3"
    `}
  ${media.phone`
        grid-template-columns: 100%;
        grid-template-rows: 40% 20% 40%;
        grid-template-areas: 
            "item1"
            "item2"
            "item3"
  `}


  .menu__item {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .menu__item-inner {
    overflow: hidden;
    transform: translate3d(100%, 0, 0);
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .menu__item--1 .menu__item-inner {
    background: var(--tertiary-color);
    height: 100%;
  }
  .menu__item--2 .menu__item-inner {
    background: var(tertiary-color);
    color: #fff;
    height: 100%;
  }
  .menu__item--3 .menu__item-inner {
    background: var(--prism-bg);
    height: 100%;
    color: #000;
  }
  .menu__item--4 .menu__item-inner {
    background: var(--tertiary-color);
    height: 100%;
    color: #fff;
  }
  .menu__item--5 .menu__item-inner {
    background: var(--prism-bg);
    height: 100%;
  }

  .menu__item--4,
  .menu__item--5 {
    display: none;
  }

  .mainmenu__item {
    /* Open later */
    opacity: 0;
  }

  .label{
    display: none;
  }

  .mainmenu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    counter-reset: menuitem;

  }
  .mainlink__inner{
    overflow: hidden;
  }

  .mainlink__inner-2{
    overflow: hidden;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mainmenu__item,
  .sidemenu__item {
    position: relative;
    overflow: hidden;
    transition: color 0.1s;
    margin: 0.25rem 0;
    display: block;
  }

  .mainmenu__item {
    font-size: 5vw;
    text-transform: lowercase;
    overflow: visible;
    margin: 2rem 0;
    padding: 0 0.5rem;
    position: relative;
    transition: color 0.3s;
    color: var(--primary-color);
  }

  .mainmenu__item {
    text-decoration: none;
    margin: 0.4rem 0;
    ${media.phablet`
        position: relative;
        overflow: hidden;
        transition: color 0.1s;
        margin: 0.4rem 0;
        padding: 0.5rem 0;
        display: block;
        line-height: 30px;
    `}
    ${media.phone`
        padding: initial;
        font-size: 2.5rem;
    `}
  }

  .mainmenu__item:hover {
    color: var(--link-color);
  }

  .mainmenu__item::before {
    counter-increment: menuitem;
    content: counters(menuitem, "", decimal-leading-zero);
    position: absolute;
    font-size: 1.35rem;
    top: 25%;
    left: -2rem;
    color: var(--color-item-alt);
  }

  .sidemenu__item-inner {
    display: block;
    transform: translate3d(0, 100%, 0);
  }

  .sidemenu {
    ${mixins.flexBetween}
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .menu__item-map{
    /* scale: 1; */
  }
  .menu__item-inner:hover .menu__item-map {
    transform: scale3d(1.6, 1.6, 1);
  }

  .menu__item-map__inner {
    overflow: hidden;
  }

  .menu__item-hoverlink{
      color: #fff;
      font-size: 3rem;
      position: relative;
      text-decoration: none;
      text-transform: uppercase;
  }

  .menu__item--3-content {
    height: 70%;
    width: 90%;
    margin: auto auto;
    text-align: left;
    ${media.phablet` height: 85%;`}

    .sidemenu__item-heading {
      text-transform: uppercase;
      font-size: 2rem;
      position: relative;
      text-decoration: none;
      color: var(--heading-color);
      margin-bottom: 3.5rem;
      font-weight: 500;
      display: inline-block;
      ${media.phablet`margin-bottom: 3rem`}
      &:not(:first-child) {
        margin-top: 1.2rem;
      }
    }

    .sidemenu__item-content {
      display: block;
      text-decoration: none;
      color: var(--primary-color);
      font-size: 1.5rem;
      margin-bottom: 15px;
      opacity: 0.7;
      transition: all 0.3s;

      &:hover {
        opacity: 1;
        color: var(--link-color);
      }
    }

    .sidemenu-main-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  
  
  }

  @media screen and (min-width: 53em) {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    grid-template-columns: 25% 25% 50%;
    grid-template-rows: 60% 40%;
    grid-template-areas:
      "item3 item2 item1"
      "item4 item5 item1";
    .menu__item {
      height: 100%;
    }
    .menu__item--1 {
      grid-area: item1;
    }
    .menu__item--2 {
      grid-area: item2;
    }
    .menu__item--3 {
      grid-area: item3;
    }
    .menu__item--4 {
      grid-area: item4;
    }
    .menu__item--5 {
      grid-area: item5;
    }
    .menu__item--5,
    .menu__item--4 {
      display: block;
    }
    .menu__item-inner {
      align-items: center;
    }

    .label {
      display: block;
      color: var(--primary-color);
      position: absolute;
      z-index: 1000;
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
      white-space: nowrap;
      text-transform: capitalize;
      opacity: 0.5;

      ${media.phablet`display: none`}
    }
    .label--topleft {
      top: 2rem;
      left: 2rem;
    }
    .label--vert,
    .label--vert-mirror {
      -webkit-writing-mode: vertical-rl;
      writing-mode: vertical-rl;
    }
    .label--vert-mirror {
      transform: rotate(180deg);
    }
    .label--bottomright {
      bottom: 2rem;
      right: 2rem;
    }
    .label::before {
      content: "________________";
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      letter-spacing: -1px;
      margin: 0 0.75rem 0 0;
    }
    .label--vert::before,
    .label--vert-mirror::before {
      margin: 0.75rem 0;
    }
  }
`

const StyledImageBg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: ${props => `linear-gradient(to bottom, rgba(100, 255, 218, 0.52), rgba(100, 255, 218, 0.73)), url(${props.bg})`};
    background-repeat: no-repeat;
    background-size: cover;
    transition: transform 0.8s cubic-bezier(0.2, 1, 0.8, 1);
`;

const StyledRoadMap = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 100%;
  height: 80%;
  width: 90%;
  margin: auto auto;
  justify-content: space-between;
  

 .road-map__image, .road-map__text{
   height: 100%;
   width: 100%;
   ${mixins.flexBetween}
   justify-content: center;
 }

 .road-map__image{
   .absurd{
     max-width: 60%;
   }
 }

 .road-map__text{
   display: flex;
   align-items: center;
   height: 100%;
   width: 100%;
   position: relative;

   .road-map__arrow{
     margin-left: 5px;
     img{
       margin: 0;
        width: 12px;
        height: 12px;
        color: #fff;
     }
   }
 }

`;

const StyledRoadMapText = styled(Link)`
  font-size: 2.5rem;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.1vw;
  position: relative;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  opacity: 1;

  &::after{
    display: block;
    content: '';
    height: 2px;
    background-color: var(--primary-color);
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateX(-101%);
  }

  &:hover::after{
    transition: transform 0.3s ease-out;
    transform: translateX(0);
  }

  &.animate-out::after{
    transition: transform 0.3s ease-in;
    transform: translateX(100%);
  }
`;

export default Menu
