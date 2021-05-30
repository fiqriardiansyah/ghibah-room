import React,{Fragment,useContext,useState,useRef} from 'react';
import Styled from 'styled-components';

import NotificationBox from './NotificationBox';

// cloud firestore
import {deleteNotification,seenNotification,addMember,changeStatusActionNotification} from '../../firebase/firestore';

// context
import {UserContext} from '../../context/userContext';

//components
import Modal from '../modal-component/Modal';
import Success from '../success-component/Success';
import Failed from '../failed-component/Failed';
import Loader from '../loader-component/Loader';
import Button from '../button-component/Button';



const Container = Styled.div`
    width: 50rem;
    height: 50rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
const Header = Styled.div`
    width: 100%;
    height: 8rem;
    
    display: flex;
    justify-content: center;
    align-items: center;

`
const Text = Styled.p`
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    text-transform: capitalize;
    text-align: center;
    margin: 0;
`
const Content = Styled.div`
    width: 100%;
    flex: 1;
    overflow: auto;
    padding: 0 2rem;
    box-sizing: border-box;
`
const Footer = Styled.div`
    width: 100%;
`


const Notification = props =>{

    const notifELement = useRef();

    //context
    const [userData] = useContext(UserContext);

    const [modal,setModal] = useState(false);
    const [contentModal,setContentModal] = useState();

    const seenNotifHandler = data =>{
        seenNotification(data);
    }

    const deleteNotifiHandler = data =>{
        deleteNotification(data);
    }

    const changeActionNotifHandler = data =>{
        changeStatusActionNotification(data);
    }

    const joinHandler = async data =>{
        setContentModal(<Loader message={"loading..."} />);
        setModal(true);
        // why second parameter is true? because this pass by notification
        const request = await addMember({...data,idUser: localStorage.getItem('uid'),name: userData.name,role: 'member'},true);
        
        if(request.success){
            setContentModal(
            <Success message={"you are in!"} >
                <Button 
                        onclick={()=>setModal(false)}
                        margin="1rem 1rem"
                        boxShadow="0 10px 10px -10px rgba(0,0,0,0.9);"
                        radius=".5rem"
                        color="white"
                        width="100%"
                        height="4rem"
                        id="success-join"
                        type="button"
                        backColor="#76ff03" >
                            ok
                </Button>
            </Success>);

            changeActionNotifHandler({idUser: localStorage.getItem('uid'),idNotif: data.idNotif,accept: true});

        }else{
            setContentModal(
                <Failed message={request.message} >
                    <Button 
                        onclick={()=>setModal(false)}   
                        margin="1rem 1rem"
                        boxShadow="0 10px 10px -10px rgba(0,0,0,0.9);"
                        radius=".5rem"
                        color="white"
                        width="100%"
                        height="4rem"
                        id="failed-join"
                        type="button"
                        backColor="#d50000" >
                            ok
                    </Button>
                </Failed>);
        }    
    }

    
// fuck you

    return (
        <Fragment>

            <Modal show={modal} handler={ ()=> setModal(prev => !prev) }>
                {contentModal}
            </Modal>

            <Container>
                <Header>
                    <Text fontSize="2.5rem" color="black" fontWeight="400">notification</Text>
                </Header>
                <Content>

                    {props.notifications.length !== 0 && props.notifications.map((notif,index)=>{
                        return <NotificationBox deleteNotifiHandler={deleteNotifiHandler} joinHandler={joinHandler} seenNotifHandler={seenNotifHandler} key={index} notifData={notif} />
                    })}
                    {props.notifications.length === 0 && <Text fontSize="4rem" color="black" fontWeight="400">empty</Text>}

                </Content>
                <Footer>

                </Footer>
            </Container>
        </Fragment>
    )
}

export default Notification;