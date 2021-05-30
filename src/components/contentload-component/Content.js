import React from 'react';
import Styled,{keyframes} from 'styled-components';

const Container = Styled.div`
    height: 100%;
    width: 100%;
    padding: 0 2rem;
    position: absolute;
    top: 0;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const LoadAnim = keyframes`
    0% {
        background-position: -680px 0;
    }
    100% {
        background-position: 680px 0;
    }
`

const Line = Styled.div`
    width: ${props => `${props.width}%` };
    height: 1.5rem;
    border-radius: .5rem;

    -webkit-animation: ${LoadAnim} 1s linear infinite;
            animation: ${LoadAnim} 1s linear infinite;
    -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
    background: #535356;
    background-image: -webkit-gradient(linear,left top,right top,from(#535356),color-stop(20%,#f5f5f5),color-stop(40%,#efefef),to(#535356));
    background-image: linear-gradient(left, #dddddd 0%, #f5f5f5 20%, #efefef 40%, #dddddd 100%);
    background-repeat: no-repeat;
    background-size: cover;
`



const Content = props =>{
    return (
        <Container >
            {
                props.lines.map((el,i) =>{
                    return <Line key={i} width={el} />
                })
            }
        </Container>
    )
    
}

export default Content;