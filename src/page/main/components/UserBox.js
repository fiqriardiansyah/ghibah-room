import React,{useState,useEffect} from 'react';
import Styled from 'styled-components';

import {mediaQueries} from '../../../utils/mediaQueries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'


const Container = Styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    cursor: pointer;
    background-color: ${props => props.active ? '#050507' : 'transparent'};
    position: relative;
    transition: all .2s;

    :hover{
        background-color: #050507;
    }
`
const Info = Styled.div`
    display: flex;
    align-items: center;
`
const BoxImg = Styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
`
const Name = Styled.p`
    font-size: 1.6rem;
    color: ${props => props.hover || props.active ? 'white' : 'rgba(255,255,255,0.5)'};
    text-transform: capitalize;
    font-weight: 300;

    ${mediaQueries("sm")`
        font-size: 2rem;
    `};
`

const ButtonMenu = Styled.button`
    background-color: transparent;
    border: none;
    color: rgba(255,255,255,0.5);
    font-size: 1.5rem;
    display: flex;
    justify-content: center;    
    align-items: center;
    cursor: pointer;

    :hover{
        color: white;
    }
    :active{
        outline: none;
    }
    :focus{
        outline: none;
    }
`

const MenuBox = Styled.div`
    max-width: 15rem;
    padding: 1rem 2rem;
    background-color: white;
    border-radius: .5rem;
    position: absolute;
    right: 0;
    top: 70%;
    z-index: 2;
`
const Ul = Styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`
const Li = Styled.li`
    font-size: 1.6rem;
    color: rgba(0,0,0,0.6);
    transition: all .2s;
    cursor: pointer;

    :hover{
        color: black;
    }

    ${mediaQueries("sm")`
        font-size: 2rem;
    `};

`

const getName = nameDocument =>{
    const thisUser = localStorage.getItem('uid');
    return nameDocument.split(".").find(el => !el.includes(thisUser)).split("-")[0];
}

const cutNameLength = name => name.length > 12 ? `${name.slice(0,12)}...` : name ;

const UserBox = props =>{

    const [isHover,setIsHover] = useState(false);
    const [isShowMenu,setIsShowMenu] = useState(false);

    const clickMenu = e =>{
        e.stopPropagation();
        setIsShowMenu(prev => !prev);
        props.setIsClickMenu(true);
    };

    useEffect(()=>{
        if(!props.isClickMenu) setIsShowMenu(false);
    },[props.isClickMenu]);

    const deleteChat = e =>{
        e.stopPropagation();
        props.deleteChat(props.data.idChat);
        setIsShowMenu(prev => !prev);
    }

    const addFriendHandler =(e)=>{
        e.stopPropagation();
        const idUser = localStorage.getItem('uid');
        props.addFriendHandler({idUser,friend: props.data.idUser + "[*devider*]" + props.data.name});
        setIsShowMenu(prev => !prev);
    }

    return (
        <Container active={props.active === "active"} onClick={props.onClick} onMouseOver={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
            <Info>
                <BoxImg>
                    <img style={{width: '100%',height: '100%',objectFit: 'cover'}} src={props.image} />
                </BoxImg>
                <Name active={props.active === "active"} hover={isHover} >{cutNameLength(props.data.name)}</Name>
            </Info>
            {isHover && <ButtonMenu className="chat-menu" onClick={clickMenu}><FontAwesomeIcon icon={faEllipsisH} /></ButtonMenu> }

            {isShowMenu && props.isClickMenu &&
                <MenuBox className="chat-menu">
                    <Ul>
                        <Li onClick={deleteChat}>Delete</Li>
                        <Li>Pin</Li>
                        {!props.isFriend && <Li onClick={addFriendHandler}>Add friend</Li>}
                    </Ul>
                </MenuBox>
            }
        </Container>
    )
}

export default UserBox;