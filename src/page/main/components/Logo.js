import React from 'react';
import Styled from 'styled-components';

import LogoImage from '../../../image/logo.svg';

import { mediaQueries} from '../../../utils/mediaQueries';

const Container = Styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = Styled.img`
    width: 30%;
    pointer-events: none;

    ${mediaQueries("sm")`
        width: 70% !important;
    `}
`

export default function Logo(props){
    return (
        <Container>
            <Image src={LogoImage} />
        </Container>
    )
}