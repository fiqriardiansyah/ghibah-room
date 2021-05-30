import React from 'react';
import Styled from 'styled-components';

import FailImage from '../../../src/image/warning.svg';

const Wrapper = Styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const MessageText = Styled.p`
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 300;
    color: #af4c4c;
`
const BoxImg = Styled.div`
    width: 15rem;

`


const Warning = props => {
    return (
        <Wrapper>
            <BoxImg>
                <img style={{width: '100%',height: '100%',objectFit: 'cover'}} src={FailImage} />
            </BoxImg>
            <MessageText>{props.message}</MessageText>
            {props.children}
        </Wrapper>
    )
}

export default Warning;