import React from 'react'
import styled from 'styled-components'
import {gsap} from 'gsap';

const LineMaker = () => {
  React.useEffect(() => {
  class Cursor {
    constructor() {
      this.data = {
        posX: 0,
        posY: 0,
        mouseX: 0,
        mouseY: 0,
      }
      this.dom = {
        cursor: document.querySelector(".circle-cursor--inner"),
        follower: document.querySelector(".circle-cursor--outer"),
        link: gsap.utils.toArray(".link"),
      }

      this.init()
    }

    init() {
      gsap.to(
        {},
        {
          duration: 0.01,
          repeat: -1,
          onRepeat: () => {
            this.data.posX += (this.data.mouseX - this.data.posX) / 9
            this.data.posY += (this.data.mouseY - this.data.posY) / 9

            gsap.set(this.dom.follower, {
              css: {
                left: this.data.posX - 12,
                top: this.data.posY - 12,
              },
            })

            gsap.set(this.dom.cursor, {
              css: {
                left: this.data.mouseX,
                top: this.data.mouseY,
              },
            })
          },
        }
      )

      this.dom.link.forEach((item, index) => {
        item.addEventListener("mouseenter", e => {
          this.dom.cursor.classList.add("active")
          this.dom.follower.classList.add("active")
        })

        item.addEventListener("mouseleave", e => {
          this.dom.cursor.classList.remove("active")
          this.dom.follower.classList.remove("active")
        })
      })

      document.addEventListener("mousemove", e => {
        this.data.mouseX = e.clientX
        this.data.mouseY = e.clientY
      })
    }
  }

  new Cursor()

  }, [])

    return (
      <Line>
        <div className="cursor-holder">
          <div className="circle-cursor circle-cursor--inner"></div>
          <div className="circle-cursor circle-cursor--outer"></div>
        </div>
        <div _ngcontent-c8="" className="wrapper-columns-overlay">
          <div _ngcontent-c8="" className="col col-1"></div>
          <div _ngcontent-c8="" className="col col-2"></div>
          <div _ngcontent-c8="" className="col col-3"></div>
          <div _ngcontent-c8="" className="col col-4"></div>
        </div>
      </Line>
    )
}

const Line = styled.div`
  .circle-cursor {
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
    border-radius: 50%;
    &--outer {
      width: 50px;
      height: 50px;
      border: 1px solid var(--color-white);
      z-index: 12000;
      opacity: 0.5;

      &.active {
          opacity: 0.7;
          transform: scale(1.5);
      }

      &.hovered {
          opacity: 0.08;
      }
      
    }
    &--inner {
      width: 7px;
      height: 7px;
      left: -2.5px;
      top: -2.5px;
      z-index: 11000;
      background: var(--color-white);

      &.active {
        opacity: 0.5;
        transform: scale(0);
      }

      &.hovered {
        opacity: 0.08;
      }
    }
  }

  .cursor-holder {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  [_nghost-c8] {
    display: block;
  }
  .wrapper-columns-overlay[_ngcontent-c8],
  [_nghost-c8] {
    position: absolute;
    pointer-events: none;
  }
  .wrapper-columns-overlay[_ngcontent-c8] {
    width: 100%;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-align: start;
    align-items: flex-start;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .wrapper-columns-overlay[_ngcontent-c8] .col[_ngcontent-c8] {
    -ms-flex: 1 1;
    flex: 1 1;
    height: 100%;
    border-right: 1px solid hsla(0, 0%, 100%, 0.15);
  }
  .wrapper-columns-overlay[_ngcontent-c8] .col[_ngcontent-c8]:last-of-type {
    border-right: 0;
  }

  @media only screen and (max-width: 1024px) and (orientation: portrait) {
    .wrapper-columns-overlay[_ngcontent-c8] .col[_ngcontent-c8]:first-of-type,
    .wrapper-columns-overlay[_ngcontent-c8] .col[_ngcontent-c8]:nth-of-type(2) {
      display: none;
    }
  }

  @media only screen and (max-width: 767px) {
    .wrapper-columns-overlay[_ngcontent-c8] .col[_ngcontent-c8]:first-of-type,
    .wrapper-columns-overlay[_ngcontent-c8] .col[_ngcontent-c8]:nth-of-type(2) {
      display: none;
    }
  }
`

export default LineMaker
