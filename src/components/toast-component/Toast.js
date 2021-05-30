import React,{useState,useRef} from 'react';
import Styled from 'styled-components';

import {mediaQueries} from '../../utils/mediaQueries';

const Container = Styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
`
const Box = Styled.div`
    position: absolute;
    background-color: white;
    padding: .5rem 1rem;
    font-size: 1.5rem;
    left: ${props => props.isHover ? '120%' : '0'};
    opacity: ${props => props.isHover ? '1': '0'};
    border-radius: .5rem .5rem .5rem 0;
    border: none;
    font-weight: 500;
    text-transform: capitalize;
    pointer-events: none;
    transition: all .2s;
    min-width: 5rem;

    ${mediaQueries("sm")`
        display: none;
    `}
`
const Text = Styled.p`
    margin: 0;
    display: inline;
    overflow: hidden;
    white-space: nowrap;
`


export default function Toast(props){

    const [hover,setHover] = useState(false);
    
    const hoverHandler =(hover)=> setHover(hover);

    return (
        <Container onMouseOver={()=> hoverHandler(true)} onMouseLeave={()=> hoverHandler(false)} >
            {props.children}
            <Box isHover={hover} ><Text >{props.text}</Text></Box>
        </Container>
    )
}

