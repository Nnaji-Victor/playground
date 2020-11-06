//Copy-paste from https://github.com/bchiang7

import { css } from 'styled-components';

const sizes = {
  giant: 1440,
  desktop: 1200,
  tablet: 900,
  phablet: 768,
  phone: 425,
  tiny: 320,
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export default media;