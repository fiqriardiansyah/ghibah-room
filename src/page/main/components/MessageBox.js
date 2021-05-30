import React,{Fragment,useRef,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp} from '@fortawesome/free-solid-svg-icons'

import ImageExample from '../../../image/ex.jpg';

import {mediaQueries} from '../../../utils/mediaQueries';

//firestore
import {startChat} from '../../../firebase/firestore'

//box message
const BoxMessage = Styled.div`
    margin-top: ${props => props.marginTop || '1rem'};
    background-color: #232325;
    border-radius: 0 2rem 2rem 2rem;
    box-shadow: rgba(0,0,0,1);
    padding: 2rem;
    position: relative;
`
const TextBox = Styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    
`
const Head = Styled.p`
    color: #${props => props.color || 'fff'};
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: ${props => props.show ? '2rem' : '0'};
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mediaQueries("sm")`
        font-size: 1.5rem;
    `}
`
const Time = Styled.span`
    color: rgba(255,255,255,0.5);
    font-size: 1rem;
    margin-left: 3rem;
    position: absolute;
    right: ${props => props.self ? 'auto' : '-5rem'};
    left: ${props => props.self ? '-10rem' : 'auto'};
`
const Message = Styled.p`
    color: rgba(255,255,255,0.7);
    margin: 0;
    font-size: 1.5rem;
    font-weight: 300;

    ${mediaQueries("sm")`
        font-size: 1.8rem;
    `}
`
const BoxSelfMessage = Styled(BoxMessage)`
    border-radius: 2rem 0 2rem 2rem;
    display: flex;
    align-self: flex-end;
    max-width: 60%;
`

// menu
const ContainerMessageAndMenu = Styled.div`
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-top: 1rem;
    max-width: 60%;

    ${mediaQueries("sm")`
        max-width: 70%;
    `}
 `
const MenuButton = Styled.div`
    color: ${props => props.color || 'rgba(255,255,255,0.3)'};
    font-size: 2rem;
    margin-left: 2rem;
    cursor: pointer;
    transition: all .2s;
    position: absolute;
    right: 1rem;

    :hover{
        color: ${props => props.color ? 'black' : 'white'};
    }
`
const MenuPopup = Styled.div`
    min-width: 20rem;
    background-color: white;
    position: absolute;
    z-index: 10;
    padding: 1rem;
    top: 3rem;
    left: 50%;

    display: flex;
    align-items: center;
    border-radius: .5rem;
`
const MenuList = Styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
`
const Menu = Styled.li`
    margin-top: 1rem;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Text = Styled.p`
    cursor: pointer;
    font-size: 1.5rem;
    text-transform: capitalize;
    margin: 0;
    transition: all .2s;
    color: black;

    :hover{
        color: rgba(0,0,0,0.5);
    }

    ${mediaQueries("sm")`
        font-size: 1.8rem;
    `}
`

const GroupList = Styled.ul`
    width: 100%;
    padding-left: 2rem;
    list-style: none;
    box-sizing: border-box;
`
const GroupText = Styled(Text)`
    color: rgba(0,0,0,0.5);

    :hover{
        color: black;
    }
`
const cutNameLength = name => {
    if(name.length >= 10) return `${name.slice(0,10)}...`
    return name;
}

export default function MessageBox(props){

    const date = new Date(props.time);
    const hour = date.getHours();
    const min = date.getMinutes();
    const day = date.getDate();

    const [menuOver,setMenuOver] = useState(false);
    const menuOverHandler = value => setMenuOver(value);

    const [menuClick,setMenuClick] = useState(false);
    const [groupClick,setGroupClick] = useState(false);

    const menuClickHandler =()=>{
        props.setIsClickMenu(true);
        setMenuClick(prev => !prev);
        menuOverHandler(true);
    }

    const groupClickHandler = data => {
        props.inviteGroupHandler(data);
        menuOverHandler(false);
        setGroupClick(false);
        setMenuClick(false);
    }

    const clickChat = async ()=>{
        const userId = localStorage.getItem('uid'); // current user

        const idChat = await startChat({user1: userId + "[*devider*]" + props.userData.name,user2: props.id + "[*devider*]" + props.name});

        if(idChat.success){
            props.isGroupHandler(false);
            props.documentHandler(idChat.id);
        }

    }

    useEffect(()=>{
        if(!props.isClickMenu) setMenuClick(false);
    },[props.isClickMenu]);
    
    return (
        <Fragment>

            {props.selfMessage ? 
            
            <BoxSelfMessage>
                <TextBox>
                    <Head show={props.isGroup && !props.selfMessage} color={props.color}><Time self={props.selfMessage}> {day} / {hour}:{min}</Time></Head>
                    <Message>{props.message}</Message>
                </TextBox>
            </BoxSelfMessage>  :

            <ContainerMessageAndMenu className="messagebox-menu" onMouseOver={()=>menuOverHandler(true)} onMouseLeave={()=>{ !menuClick && menuOverHandler(false) }} >
                
                <BoxMessage marginTop="0">
                    <TextBox>
                        <Head show={props.isGroup} color={props.color}>{props.isGroup ? cutNameLength(props.name) : ''}<Time  self={props.selfMessage}> {day} / {hour}:{min}</Time></Head>
                        <Message>{props.message}</Message>
                    </TextBox>
                </BoxMessage>

                {menuOver && 
                <MenuButton  openMenu={menuClick} onClick={menuClickHandler}>
                    <FontAwesomeIcon icon={menuClick && props.isClickMenu ? faChevronUp : faChevronDown} />
                </MenuButton> }
                
                {menuClick && props.isClickMenu &&
                <MenuPopup>
                    <MenuList>
                        {props.isGroup && <Menu onClick={clickChat}><Text>chat</Text></Menu> }

                        <Menu onClick={()=> setGroupClick(prev => !prev)}>
                            <Text>invite group</Text> 
                            <MenuButton color="rgba(0,0,0,0.5)" >
                                <FontAwesomeIcon icon={groupClick ? faChevronUp : faChevronDown}/>
                            </MenuButton>
                        </Menu>

                        {groupClick && 
                            <GroupList>
                                {props.groups.map((data,index)=>{
                                    return data !== 'global' && 
                                            <Menu onClick={()=> groupClickHandler({idGroup: data,idUserReceiver: props.id})} key={index} >
                                                <GroupText>{data.split("-")[0]}</GroupText>
                                            </Menu>
                                })}                             
                            </GroupList>
                        }

                        <Menu><Text>report</Text></Menu>

                    </MenuList>
                </MenuPopup>}

            </ContainerMessageAndMenu>
                
            }

        </Fragment>
    )

}

