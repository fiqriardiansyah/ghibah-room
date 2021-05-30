import React,{Fragment,useState,useEffect} from 'react';
import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchPlus,faPaperPlane,faPlus ,faEllipsisH} from '@fortawesome/free-solid-svg-icons'

// firestore
import {startChat} from '../../../firebase/firestore'

import img from '../../../image/profile_icon.jpg';

const Container = Styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    transition: all .2s;
    position: relative;
    cursor: ${props => props.cursor || 'auto'};

    :hover{
        background-color: #17171b;
    }
`
const Wrapper = Styled.div`
    display: flex; 
    align-items: center;
`
const ImageBox = Styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
    overflow: hidden;
    margin-right: 1rem;
`
const Image = Styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const NameBox = Styled.p`
    color: ${props => props.textColor || 'rgba(255,255,255,0.7)'};
    font-size: 1.5rem;
    text-transform: capitalize;
    font-weight: 300;
    white-space: nowrap;
`
const StatusBox = Styled.span`
    display: block;
    text-transform: uppercase;
    padding: .5rem 1rem;
    border-radius: 1rem;
    margin-left: 1rem;

    background: ${props => props.status === "admin" ? "rgb(107 132 202 / 26%)" : "transparent"};
    font-size: ${props => props.status === "admin" ? "1.5rem": "1rem"};
    color: ${props => props.status === "admin" ? "#5454af" : "white"};
    border: ${props => props.status === "admin" ? "none" : "1px solid rgba(255,255,255,0.4)"};
`

const Icon = Styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    color: rgba(255,255,255,0.4);
    transition: all .2s;
    cursor: pointer;
    font-size: 1.5rem;

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

const Menu = Styled.div`
    min-width: 10rem;
    background-color: white;
    border-radius: .5rem;
    padding: 1rem;
    position: absolute;
    right: 0;
    top: 70%;
    position: absolute;
    padding: 1rem;
    z-index: 10;
`
const Ul = Styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`
const Li = Styled.li`
    white-space: nowrap;
    font-size: 1.5rem;
    font-weight: 300;
    text-transform: capitalize;
    cursor: pointer;
    margin-top: .5rem;
    transition: all .2s;

    :hover{
        color: rgba(0,0,0,0.5)
    }
`

const MemberBox = props =>{

    const [isHoverMember,setIsHoverMember] = useState(false);
    const hoverMemberHandler = value => {
        if(localStorage.getItem('uid') !== props.member.id){
            setIsHoverMember(value);
        }
    }

    const [isMenuClick,setIsMenuClick] = useState(false);
    const menuClickHandler =()=> {
        props.setIsClickMenu(true);
        setIsMenuClick(prev => !prev);
    }

    useEffect(() => {
        if(!props.isClickMenu) setIsMenuClick(false);
    }, [props.isClickMenu]);

    const cutNameLength = name => {
        if(name.length >= 10) return `${name.slice(0,10)}...`
        return name;
    }

    const deleteMemberHandler = () =>{
        const idGroup = localStorage.getItem('nameDocumentNow');
        props.deleteMember({idGroup,idUser: props.member.id});
    }

    const clickHandler = ()=> props.onClick();

    const clickChat = async ()=>{
        const userId = localStorage.getItem('uid'); // current user

        const idChat = await startChat({user1: userId + "[*devider*]" + props.userData.name,user2: props.member.id + "[*devider*]" + props.member.name});

        if(idChat.success){
            props.isGroupHandler(false);
            props.documentHandler(idChat.id);
        }

    }

    return (
        <Container onClick={clickHandler} cursor={props.cursor} onMouseOver={()=>hoverMemberHandler(true)} onMouseLeave={()=>hoverMemberHandler(false)}>
            <Wrapper>
                <ImageBox><Image src={img} /></ImageBox>
                <NameBox textColor={isHoverMember ? 'white' :props.textColor}>{cutNameLength(props.member.name)}</NameBox>
            </Wrapper>
            {props.isInfo &&

            <Fragment>
                {!isHoverMember && props.member.role !== 'member' && <StatusBox status={props.member.role}>{props.member.role}</StatusBox>}
                {isHoverMember && <Icon className="menu-button" onClick={menuClickHandler}><FontAwesomeIcon icon={faEllipsisH} /></Icon>}
                
                {/* show only that -> this member is not current user */}
                {isMenuClick && props.isClickMenu && localStorage.getItem('uid') !== props.member.id && 
                <Menu>
                    <Ul>
                        {props.member.role !== "admin" && 
                        <Fragment>
                            <Li onClick={deleteMemberHandler}>kick out</Li>
                        </Fragment>}
                        
                        <Li onClick={clickChat}>chat</Li>
                    </Ul>
                </Menu>
                }
            </Fragment>

            }
        </Container>
    )
}

export default MemberBox;