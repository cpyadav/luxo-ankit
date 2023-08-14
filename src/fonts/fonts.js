import { createGlobalStyle } from "styled-components";

import Giovanna from "./Giovanna.otf";
import SatoshiRegular from "./Satoshi-Regular.otf";
import SatoshiLight from "./Satoshi-Light.otf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Giovanna';
        src: url(${Giovanna})
    }
    @font-face {
        font-family: 'Satoshi Regular';
        src: url(${SatoshiRegular})
    }
    @font-face {
        font-family: 'Satoshi Light';
        src: url(${SatoshiLight})
    }
`;
