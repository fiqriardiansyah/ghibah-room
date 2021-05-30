import React from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components';

const Container = Styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 20;
`

const Backdrop = props =>{
    // return ReactDOM.createPortal(<Container onClick={()=> props.handler(false)}/>,document.getElementById('backdrop-drawer'));
    return <Container onClick={()=> props.handler(false)} />
}

export default Backdrop;