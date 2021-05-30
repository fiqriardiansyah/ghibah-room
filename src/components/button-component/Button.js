import React from 'react';
import Styled from 'styled-components';

const ButtonCustome = Styled.button`
    justify-content: center;
    align-items: center;
    height: ${props => props.height};
    width: ${props => props.width};
    border-radius: ${props => props.radius ? props.radius : '100px'};
    border: none;
    font-size: ${props => props.fontSize ? props.fontSize : '2rem'};
    display: flex;
    color: ${props => props.color ? props.color : 'white'};
    background-color: ${props => props.backColor ? props.backColor : 'white'};
    transition: all .3s;
    cursor: pointer;
    margin: ${props => props.margin ? props.margin : 'auto'};
    box-shadow: ${props => props.boxShadow };

    :focus{
        outline: none;
    }

    :active{
        box-shadow: 3px 3px 6px rgba(0,0,0,0.5);
    }

    :hover{
        filter: brightnes(1);
    }
`

export default function Button(props){
    return (<ButtonCustome {...props} onClick={props.onclick}>
                    {props.children}
            </ButtonCustome>)
}