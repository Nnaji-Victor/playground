import { css } from 'styled-components'

import CircularBlack from '@fonts/Circular/CircularSpotifyBlack.woff2'
import CircularLight from '@fonts/Circular/CircularSpotifyLight.woff2'
import CircularRegular from '@fonts/Circular/CircularSpotifyRegular.woff2'
import CircularBold from '@fonts/Circular/CircularSpotifyBold.woff2'

const FontFaces = css`
    @font-face{
        font-family:CircularLight;
        font-weight:300;
        font-style:normal;
        font-display:swap;
        src: url(${CircularLight}) format("woff2"),
        url(${CircularLight}) format("woff")
    }
    @font-face{
        font-family:CircularRegular;
        font-weight:400;
        font-style:normal;
        font-display:swap;
        src: url(${CircularRegular}) format("woff2"),
        url(${CircularRegular}) format("woff")
    }
    @font-face{
        font-family:CircularBold;
        font-weight:700;
        font-style:normal;
        font-display:swap;
        src: url(${CircularBold}) format("woff2"),
        url(${CircularBold}) format("woff")
    }
    @font-face{
        font-family:CircularBlack;
        font-weight:900;
        font-style:normal;
        font-display:swap;
        src: url(${CircularBlack}) format("woff2"),
        url(${CircularBlack}) format("woff")
    }
`;

export default FontFaces;