import React from 'react';
import Styled from 'styled-components';
import ReactDOM from 'react-dom';

import Backdrop  from './Backdrop';

const Container = Styled.div`
    background-color: ${props => props.bgColor};
    width: ${props => props.width};
    height: 100vh;
    position: absolute;
    top: 0;
    left: ${props => props.show ? '0' : props.left };
    z-index: 10;
    transition: all .4s;
    z-index: 30;
    padding: ${props => props.padding };
    box-sizing: border-box;
    
    display: flex;
    align-items: center;
    justify-content: center;

`
const Content = Styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => props.bgColor};

    display: flex;
    justify-content: center;
`

const DrawerOverlay = props =>{

    return (
        <Container {...props} >
            <Content {...props}>
                {props.children}
            </Content>
        </Container>
    )

}

const Drawer = props =>{
    return (
        <React.Fragment>

            <DrawerOverlay {...props}>
                {props.children}
            </DrawerOverlay>
            
            {props.show && <Backdrop handler={props.handler} />}

        </React.Fragment>
    );
}

export default Drawer;
