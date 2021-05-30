import React,{forwardRef} from 'react';
import Styled from 'styled-components';

import {mediaQueries} from '../../utils/mediaQueries';

const Container = Styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: ${props => props.margin ? props.margin : 'auto'};
`

const InputCustome = Styled.input`
    border-radius: ${props => props.radius ? props.radius : '1rem'};
    width: 100%;
    height: ${props => props.height };
    border: ${props => props.border ? props.border : 'none'};
    background: ${props => props.background };
    font-size: ${props => props.fontSize };
    color: white;
    padding-left: ${props => props.padLeft ? props.padLeft : '2rem'};
    box-sizing: border-box;
    padding-right: ${props => props.padRight ? props.padRight : '2rem'};

    :focus{
        outline: none;
        box-shadow: 0 0 2px 1px rgba(255,255,255,0.4);
    }

    ::placeholder{
        color: rgba(255,255,255,0.3);
        letter-spacing: .2rem;
    }

    ${mediaQueries("sm")`
        font-size: ${props =>{
            const explode =  props.fontSize.split("");
            const num = parseInt(explode[0]) + ( parseInt(explode[0]) / 2 );
            console.log(`${num}${explode.slice(1,explode.length).join("")}`)
            return `${num}${explode.slice(1,explode.length).join("")}`
        }};
    `};
`
const LabelCustome = Styled.label`
    font-size: 1.5rem;
    font-weight: 200;
    color: white;
    display: flex;
    align-self: flex-start;
`
const Wrapper = Styled.div`
    position: relative;
    display: flex;
    align-items: center;
`


const Input = forwardRef((props,ref)=>{
    return (
        <Container {...props}>
            {props.useLabel && <LabelCustome htmlFor={props.id}>{props.label}</LabelCustome>}
            <Wrapper >
                <InputCustome ref={ref} autoComplete="off" {...props} />
                {props.icon && props.icon}
            </Wrapper>
        </Container>
    )
})


export default Input;