import React from 'react';
import Styled,{keyframes} from 'styled-components';

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
    font-size: 2rem;
    font-weight: 300;
`

const CubeAnimation = keyframes`
    0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
                transform: perspective(140px) rotateX(-180deg);
        opacity: 0; 
    } 25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
                transform: perspective(140px) rotateX(0deg);
        opacity: 1; 
    } 90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
                transform: perspective(140px) rotateY(180deg);
        opacity: 0; 
    }
`

const WrapperCube = Styled.div`
    margin: 20px auto;
    width: 8rem;
    height: 8rem;
    position: relative;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
`

const Cube = Styled.div`
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1); 


    ::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #333;
        -webkit-animation: ${CubeAnimation} 2.4s infinite linear both;
                animation: ${CubeAnimation} 2.4s infinite linear both;
        -webkit-transform-origin: 100% 100%;
            -ms-transform-origin: 100% 100%;
                transform-origin: 100% 100%;
    }
`

const Cube2 = Styled(Cube)`
    -webkit-transform: scale(1.1) rotateZ(90deg);
    transform: scale(1.1) rotateZ(90deg);

    ::before{
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
    }
`

const Cube3 = Styled(Cube)`
    -webkit-transform: scale(1.1) rotateZ(180deg);
    transform: scale(1.1) rotateZ(180deg);

    ::before{
        -webkit-animation-delay: 0.6s;
        animation-delay: 0.6s;
    }
`
const Cube4 = Styled(Cube)`
    -webkit-transform: scale(1.1) rotateZ(270deg);
    transform: scale(1.1) rotateZ(270deg);

    ::before{
        -webkit-animation-delay: 0.9s;
        animation-delay: 0.9s;
    }
`


const Loader = props =>{
    return (
        <Wrapper>
             <WrapperCube>
                <Cube/>
                <Cube2/>
                <Cube4/>
                <Cube3/>
            </WrapperCube>
            <MessageText>{props.message}</MessageText>
        </Wrapper>
    )
}

export default Loader;