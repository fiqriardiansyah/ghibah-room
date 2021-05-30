import React,{Fragment,useContext,useState,useEffect} from 'react';
import {withRouter} from 'react-router';
import Styled from 'styled-components';

import {mediaQueries} from '../../utils/mediaQueries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft } from '@fortawesome/free-solid-svg-icons'

//image
import ProfilImg from '../../image/profile_icon.jpg';
import FaviconImg from '../../image/favicon.svg';

//icon image
import {AlarmIcon,LogoutIcon,FriendsIcon,ChatsIcon} from '../../components/svg-component/Svg';

//component
import Toast from '../toast-component/Toast';
import Modal from '../modal-component/Modal';
import Notification from '../notification-component/Notification';
import Backdrop from '../modal-component/Backdrop';

//auth context
import {AuthContext} from '../../context/authContext';
import {UserContext} from '../../context/userContext';


//cloud firestore
import {signOut} from '../../firebase/firestore';

//database
import useGetNotification from '../../page/main/customeHook/useGetNotification';

// fuck you

const Container = Styled.div`
    width: 5rem;
    background-color: #100f10;
    position: relative;
    padding: 2rem 0;
    transition: all .3s;
    z-index: 30;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    transform: translateX(${props => props.isOpenSidebar ? '0' : '-100%'});

    ${mediaQueries("sm")`
        width: 6rem;
        position: absolute;
        height: 100vh;
        border-right: 1px solid rgba(255,255,255,0.1);

    `};
`
const Box = Styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: ${props => props.color || 'transparent'};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.justify}
`

const ButtonIcon = Styled.button`
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    transition: all .2s ;
    height: 3rem;
    margin: 1rem;

    :hover{
        color: white;
    }
    :focus{
        outline: none;
    }
    :active{
        outline: none;
    }
`

const ImageProfile = Styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 100px;
    overflow: hidden;
    cursor: pointer;

    ${mediaQueries("sm")`
        width: 5rem;
        height: 5rem;
    `};
`
const Image = Styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Logo = Styled.div`
    width: 50%;
    margin: 0 auto;
`

const Bullet = Styled.div`
    border: 3px solid #100f10;
    box-sizing: border-box;
    background-color: ${props => props.bgColor};
    color: ${props => props.color};
    width: 2rem;
    height: 2rem;
    border-radius: 100px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    top: 0;
    right: 0;
    transform: translateX(-50%);
`

const ButtonSidebar = Styled.button`    
    display: none;
    z-index: 20;
    position: absolute;
    right: -60%;
    top: 19%;
    width: 30px;
    height: 80px;
    background-color: #100f10;
    border: none;
    color: rgba(255,255,255,0.4);
    font-size: 2rem;
    transform: translateY(-50%);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    border-top: 1px solid rgba(255,255,255,0.1);
    border-right: 1px solid rgba(255,255,255,0.1);
    align-items: center;
    justify-content: center;
    border-top-right-radius: 5rem;
    border-bottom-right-radius: 5rem;

    :active{
        outline: none;
        color: white;
    }
    :focus{
        outline: none;
    }

    ${mediaQueries("sm")`
        display: flex;
    `};
`

const Sidebar = props =>{

    const [,,resetAuth] = useContext(AuthContext);
    const [,,,resetUser] = useContext(UserContext);

    const [unSeenNotif,setUnSeenNotif] = useState(0);
    const [notifications,setNotifications] = useState([]);

    const [modal,setModal] = useState(false);
    const [contentModal,setContentModal] = useState();

    const signOutHandler =()=>{
        signOut();
        resetAuth();
        resetUser();
        localStorage.clear();
        props.history.push('/auth');
    }

    // get notif from firestore
    useGetNotification(setUnSeenNotif,setNotifications);

    const notifContent = ( <Notification notifications={notifications} /> );

    const notifClickHandler =()=>{
        setContentModal(notifContent);
        setModal(prev => !prev);
    }

    useEffect(()=>{
        setContentModal(<Notification notifications={notifications} />);
    },[notifications]);

    const menuClick = menu =>{
        props.menuDashboardHandler(menu);
    }

    const openSidebarHandler = value =>{
        props.setIsOpenSidebar();
    }

    return (
        <Fragment>

            <Modal show={modal} handler={ ()=> setModal(prev => !prev) }>
                {contentModal}
            </Modal>

            {props.isOpenSidebar && props.isPhone && <Backdrop handler={props.setIsOpenSidebar} /> }

            <Container isOpenSidebar={props.isOpenSidebar} isPhone={props.isPhone} >

                <ButtonSidebar onClick={openSidebarHandler} >
                    <FontAwesomeIcon icon={props.isOpenSidebar ? faArrowLeft : faArrowRight } />
                </ButtonSidebar>

                <Box justify={"flex-start"}>
                    <Logo>
                        <Image src={FaviconImg} />
                    </Logo>
                </Box>

                <Box justify={"space-evenly"}>
                    <Toast text={"friends"}>
                        <ButtonIcon onClick={()=>menuClick('friend')}>
                            <FriendsIcon active={props.menuDashboard === 'friend'} />
                        </ButtonIcon>
                    </Toast>
                    <Toast text={"chats"}>
                        <ButtonIcon onClick={()=>menuClick('chat')}>
                            <ChatsIcon active={props.menuDashboard === 'chat'} />
                        </ButtonIcon>
                    </Toast>
                    <Toast text={"logout"}>
                        <ButtonIcon onClick={signOutHandler}>
                            <LogoutIcon/>
                        </ButtonIcon>
                    </Toast>
                </Box>

                <Box justify={"flex-end"}>
                    <Toast text={"notification"}>
                        <ButtonIcon onClick={notifClickHandler} >
                            <AlarmIcon/>
                        </ButtonIcon>
                        {unSeenNotif !== 0 &&<Bullet bgColor={"#f50057"} color={"white"}>
                            {unSeenNotif}
                        </Bullet> }
                    </Toast>
                    <div style={{height: '3rem',width: '100%'}}></div>
                    <Toast text={"my profile"} >
                        <ImageProfile>
                            <Image src={ProfilImg} />
                        </ImageProfile>
                    </Toast>
                </Box>

            </Container>

        </Fragment>
    )
}

export default withRouter(Sidebar);