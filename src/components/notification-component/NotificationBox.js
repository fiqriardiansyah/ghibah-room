import React,{useState} from 'react';
import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp,faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// components
import Button from '../button-component/Button';


const Container = Styled.div`
    width: 100%;
    margin-top: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Header = Styled.div`
    width: 100%;
    height: 5rem;
    background-color: #607d8b;
    padding: 2rem;
    box-sizing: border-box;
    border-radius: .5rem;
    box-shadow: 0 10px 10px -10px rgba(0,0,0,0.9);
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Content = Styled.div`
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
`

// box notif

const BoxNotif = Styled.div`
    width: 100%;
    background-color: #eceff1;
    padding: 2rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const DisplayBox = Styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Text = Styled.p`
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    text-transform: ${props => props.textTransform};
    text-align: ${props => props.textAlign || 'center'};
    margin: ${props => props.margin || '0 0 0 0'};
    width: 100%;
    display: inline;
`
const Span = Styled.span`
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    text-transform: ${props => props.textTransform};
    text-align: center;
    margin: ${props => props.margin};
`
const Icon = Styled.button`
    font-size: 2rem;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: all .2s;
    background-color: transparent;
    border: none;

    :hover{
        color: ${props => props.hoverColor || 'white'};
    }
    :active{
        outline: none;
    }
    :focus{
        outline: none;
    }
`


const Badge = Styled.div`
    padding: .5rem 1rem;
    border-radius: 1rem;
    font-size: 1rem;
    color: white;
    background-color: #d50000;
    position: absolute;
    top: -10%;
    left: -2%;
`

const time = epochTime => {
    const Time = new Date(parseInt(epochTime));

    const date = Time.getDate();
    const month = Time.getMonth();
    const year = Time.getFullYear();
    const hour = Time.getHours();
    const minutes = Time.getMinutes();

    return `${date.toString().padStart(2, '0')}-${month.toString().padStart(2,'0')}-${year} , ${hour.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
}

const NotificationBox = (props) => {

    const [openContent,setOpenContent] = useState(false);
    const [seenNotif,setSeenNotif] = useState(false)

    const openContentHandler = () =>{
        const idUser = localStorage.getItem('uid');
        setOpenContent(prev => !prev);
        setSeenNotif(true);
        props.seenNotifHandler({idNotif: props.notifData.id,idUser});
    }

    const joinHandler = ()=>{
        props.joinHandler({idGroup: props.notifData.content.group,idNotif: props.notifData.id});
    }

    const deleteNotifHandler =()=>{
        const idUser = localStorage.getItem('uid');
        props.deleteNotifiHandler({idNotif: props.notifData.id,idUser});
    }

    return (
        <Container >
            <Header>
                {props.notifData.seen === false && !seenNotif && <Badge>new</Badge>}
                <Text fontSize="1.5rem" color="white" fontWeight="400" textTransform="capitalize" >
                    {props.notifData.sender.name}
                    <Span margin="0 0 0 1rem" fontSize="1.5rem" color="rgba(255,255,255,0.4)" fontWeight="200" textTransform="lowercase" >{props.notifData.sender.email}</Span>
                </Text>
                <Icon onClick={openContentHandler}><FontAwesomeIcon icon={openContent ? faChevronUp : faChevronDown} /></Icon>
                <Icon hoverColor="#ff1744" onClick={deleteNotifHandler}><FontAwesomeIcon icon={faTrashAlt} /></Icon>
            </Header>
            {openContent &&
                <Content>

                    {props.notifData.title === "invite group" ?
                        <BoxNotif>
                            <Text margin="0 0 1rem 0" textAlign="end" fontSize="1.5rem" fontWeight="300" textTransform="lowercase">{time(props.notifData.send)}</Text>
                            <Text fontSize="1.5rem" fontWeight="300" textTransform="lowercase">{`${props.notifData.sender.name} `}inviting you to join group</Text>
                            <Text fontSize="4rem" margin="2rem" fontWeight="400" textTransform="uppercase">{props.notifData.content.group.split("-")[0]}</Text>
                            <DisplayBox>
                            {!props.notifData.action.accept  && <Button 
                                    onclick={joinHandler}
                                    boxShadow="0 10px 10px -10px rgba(0,0,0,0.9);"
                                    radius=".5rem"
                                    color="white"
                                    width="100%"
                                    height="4rem"
                                    id="accept-group"
                                    type="button"
                                    backColor="#76ff03" >
                                        Join
                            </Button>}
                            </DisplayBox>
                        </BoxNotif>  :

                        <BoxNotif>
                            <Text margin="0 0 1rem 0" textAlign="end" fontSize="1.5rem" fontWeight="300" textTransform="lowercase">{time(props.notifData.send)}</Text>
                            <Text fontSize="1.5rem" fontWeight="300" textTransform="lowercase">{`${props.notifData.sender.name} `} kick you from group</Text>
                            <Text fontSize="4rem" margin="2rem" fontWeight="400" textTransform="uppercase">{props.notifData.content.group.split("-")[0]}</Text>
                        </BoxNotif>


                    }
                        
                </Content>}
    
        </Container>
    )
}

export default NotificationBox;




