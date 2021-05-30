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
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 300;
    color: #4CAF50;
`

const RotateCircle = keyframes`
    0% {
        transform: rotate(-45deg);
    }
    5% {
        transform: rotate(-45deg);
    }
    12% {
        transform: rotate(-405deg);
    }
    100% {
        transform: rotate(-405deg);
    }
`

const IconLineTip = keyframes`
    0% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    54% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    70% {
        width: 50px;
        left: -8px;
        top: 37px;
    }
    84% {
        width: 17px;
        left: 21px;
        top: 48px;
    }
    100% {
        width: 25px;
        left: 14px;
        top: 45px;
    }
`

const IconLineLong = keyframes`
    0% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    65% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    84% {
        width: 55px;
        right: 0px;
        top: 35px;
    }
    100% {
        width: 47px;
        right: 8px;
        top: 38px;
    }
`

const SuccessCheckmark = Styled.div`
    width: 80px;
    height: 115px;
    margin: 0 auto;
`
const CheckIcon = Styled.div`
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 50%;
    box-sizing: content-box;
    border: 4px solid #4CAF50;

    ::before{
        top: 3px;
        left: -2px;
        width: 30px;
        transform-origin: 100% 50%;
        border-radius: 100px 0 0 100px;
        content: '';
        height: 100px;
        position: absolute;
        background: #FFFFFF;
        transform: rotate(-45deg);
    }

    ::after{
        top: 0;
        left: 30px;
        width: 60px;
        transform-origin: 0 50%;
        border-radius: 0 100px 100px 0;
        animation: ${RotateCircle} 4.25s ease-in;
        content: '';
        height: 100px;
        position: absolute;
        background: #FFFFFF;
        transform: rotate(-45deg);
    }
`
const IconLine = Styled.div`
    height: 5px;
    background-color: #4CAF50;
    display: block;
    border-radius: 2px;
    position: absolute;
    z-index: 10;
`

const LineTip = Styled(IconLine)`
    top: 46px;
    left: 14px;
    width: 25px;
    transform: rotate(45deg);
    animation: ${IconLineTip} 0.75s;
`
const LineLong = Styled(IconLine)`
    top: 38px;
    right: 8px;
    width: 47px;
    transform: rotate(-45deg);
    animation: ${IconLineLong} 0.75s;
`
const IconCircle = Styled.div`
    top: -4px;
    left: -4px;
    z-index: 10;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    box-sizing: content-box;
    border: 4px solid rgba(76, 175, 80, 0.5);
`

const IconFix = Styled.div`
    top: 8px;
    width: 5px;
    left: 26px;
    z-index: 1;
    height: 85px;
    position: absolute;
    transform: rotate(-45deg);
    background-color: #FFFFFF;
`


const Success = props =>{
    return (
        <Wrapper>
            <SuccessCheckmark>
                <CheckIcon>
                    <LineTip/>
                    <LineLong/>
                    <IconCircle/>
                    <IconFix/>
                </CheckIcon>
            </SuccessCheckmark>
            <MessageText>{props.message}</MessageText>
            {props.children}
        </Wrapper>
    )
}

export default Success;