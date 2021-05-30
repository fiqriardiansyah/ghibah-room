import React from 'react';
import Styled,{keyframes} from 'styled-components';

const ldsDualRing = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Container = Styled.div`
    display: inline-block;
    width: ${props => props.width};
    height: ${props => props.height};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    &::after{
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 6px solid #fcf;
        border-color: #fcf transparent #fcf transparent;
        animation: ${ldsDualRing} 1.2s linear infinite;
        box-sizing: border-box;
    }
`

const Loading =props=> <Container {...props} />

export default Loading;