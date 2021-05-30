import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components';

import Backdrop from './Backdrop';

const Container = Styled.div`
    min-width: 20rem;
    min-height: 20rem;
    background-color: white;
    border-radius: .5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 2rem;
    z-index: 50;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const ModalOverlay = props => {

    return (
        <Container>
            {props.children}
        </Container>
    )
}

const Modal = props =>{

    return (
        <Fragment>
            {props.show &&  
            <ModalOverlay  >
                {props.children}
            </ModalOverlay>}
            {props.show && <Backdrop handler={props.handler} />}
        </Fragment>
    );
}

export default Modal;