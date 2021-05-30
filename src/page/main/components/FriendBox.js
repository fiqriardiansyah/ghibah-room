import React,{useState} from 'react';
import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons'


const Container = Styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    transition: all .2s;

    :hover{
        background-color: #050507;
    }
`
const ImageBox = Styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
`
const Image = Styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Text = Styled.p`
    font-size: ${props => props.fontSize };
    font-weight: ${props => props.fontWeight};
    color: ${props => props.color };
    text-transform: ${props => props.textTransform};

`
const Name = Styled.div`

`
const MenuButton = Styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 100px;

    :hover{
        background-color: rgba(255,255,255,0.1);
        color: white;
    }
`

const cutNameLength = name => name.length > 12 ? `${name.slice(0,12)}...` : name ;

const FriendBox = props =>{

    const name = props.data.split("[*devider*]")[1];
    const idUser = props.data.split("[*devider*]")[0];

    const [isHover,setIsHover] = useState(false);
    const hoverHandler = value =>{
        setIsHover(value);
    };

    return (
        <Container onMouseOver={()=>hoverHandler(true)} onMouseLeave={()=>hoverHandler(false)}>

            <div style={{display: 'flex',alignItems: 'center'}}>
                <ImageBox>
                    <Image src={props.DummyImg} />
                </ImageBox>
                <Name>
                    <Text   
                            fontSize="1.7rem" 
                            textTransform="capitalize"
                            color={isHover ? "white" : "rgba(255,255,255,0.5)"}
                            fontWeight="300">
                            {cutNameLength(name)}
                    </Text>
                </Name>
            </div>
            <div style={{width: '3rem',height: '3rem'}}>
                {isHover && 
                <MenuButton>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </MenuButton> }
            </div>

        </Container>
    );
}

export default FriendBox;