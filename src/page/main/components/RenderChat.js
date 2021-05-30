import React,{Fragment,useContext,useState,useCallback} from 'react';
import MessageBox from './MessageBox';
import Styled from 'styled-components';

// context
import {UserContext} from '../../../context/userContext';
import {AuthContext} from '../../../context/authContext';

///cloud firestore
import { inviteGroup } from '../../../firebase/firestore';


//components
import Modal from '../../../components/modal-component/Modal';
import Loader from '../../../components/loader-component/Loader';
import Success from '../../../components/success-component/Success';
import Failed from '../../../components/failed-component/Failed';

//customehook
import useEventWindow from '../customeHook/useEventWindow';


//history box
const HistoryContainer = Styled.div`
    min-width: 20rem;
    height: 4rem;
    background-color: #ff030321;
    color: black;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: space-around;
    border-radius: 100px;
    flex-direction: column;
    padding: 0 4rem;
    margin: 2rem 0;
`
const TextInfo = Styled.p`
    font-size: 1.3rem;
    color: rgba(255,255,255,0.8);
    font-weight: 300;
    margin: 0;
    text-transform: capitalize;
`
const TextTime = Styled.p`
    margin: 0;
    color: rgba(255,255,255,0.3);
`

const getTime = time =>{
    const T = new Date(time);

    const hour = T.getHours();
    const minute = T.getMinutes();
    const date = T.getDate();
    const month = T.getMonth();

    return `${date}/${month},${hour}:${minute}`;
}

export default function RenderChat(props){

    const [userData] = useContext(UserContext);
    const [user] = useContext(AuthContext);


    const [modal,setModal] = useState(false);
    const [modalContent,setModalContent] = useState();

    const inviteGroupHandler = async data =>{
        setModalContent(<Loader message={"sending..."} />)
        setModal(true);
        const req = await inviteGroup({...data,...userData});
        if(req.success) return setModalContent(<Success message={"successfully invited!"} />)
        return setModalContent(<Failed message={req.message} />)
    }
    
    const [isClickMenu,setIsClickMenu] = useState(false);
    useEventWindow('click',useCallback((e)=>{
        const button = e.target.closest('.messagebox-menu');
        if(!button) setIsClickMenu(false);
    }));
    
    return (
        <Fragment>

            <Modal show={modal} handler={()=> setModal(false)}>
                {modalContent}
            </Modal>

            {props.history && props.history.map((history,index)=>{
                return (
                    <HistoryContainer key={index}>
                        <TextInfo>messages was delete by {history.deleteBy}</TextInfo>
                        <TextTime>{getTime(history.time)}</TextTime>
                    </HistoryContainer>
                )
            })}
            {props.messages.map((message,index) => {
                return ( <MessageBox 
                            userData={userData}
                            documentHandler={props.documentHandler} 
                            isGroupHandler={props.isGroupHandler}
                            isGroup={props.isGroup} 
                            isClickMenu={isClickMenu}
                            setIsClickMenu={setIsClickMenu}
                            inviteGroupHandler={inviteGroupHandler} 
                            groups={props.groups} 
                            color={message.color} 
                            selfMessage={user === message.id ? true : false} 
                            key={index} 
                            name={message.name} 
                            time={message.time} 
                            message={message.message} 
                            id={message.id} />);
            })}
            
        </Fragment>
    )
    
}