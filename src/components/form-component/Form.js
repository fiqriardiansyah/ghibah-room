import React from 'react';
import Styled from 'styled-components';

const FormCustome = Styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props=>props.direction ? props.direction : 'row'};
`

export default function Form(props){
    return (
        <FormCustome {...props} onSubmit={props.onsubmit} autocomplete="off">
            {props.children}
        </FormCustome>
    )
}