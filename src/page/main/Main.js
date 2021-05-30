
import React,{Fragment,useState,useEffect,useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Styled from 'styled-components';

import {mediaQueries} from '../../utils/mediaQueries';

//page
import HomePage from '../home/Main';

//component
import Sidebar from '../../components/sidebar-component/Sidebar';
import Drawer from '../../components/drawer-component/Drawer';

//container
import Chat from './container/Chat';
import Dashboard from './container/Dashboard';
import GroupInfo from './container/GroupInfo';

//self component
import Logo from './components/Logo';
import RenderChat from './components/RenderChat';

//database
import useGetMessage from './customeHook/useGetMessage';

//context
import {AuthContext} from '../../context/authContext';
import {UserContext} from '../../context/userContext';

const Container = Styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #17171b;
`

export default function Main(props){

    // auth context
    let [user,] = useContext(AuthContext);
    let [,,,,groups,chats] = useContext(UserContext);

    // open close group info container
    const [openClose,setOpenClose] = useState(true);
    const groupInfoHandler =(value)=> setOpenClose(value); 

    // isChatSession 
    const [isChatSession,setIsChatSession] = useState(false);
    const chatSessionHandler =(isSession)=>{
        setIsChatSession(isSession);
        localStorage.setItem('isChatSession',isSession ? 'true':'false');
    }
    
    // name collection in firebase
    const [nameDocumentNow,setNameDocumentNow] = useState();
    // is group chat ,if group then-> true, if not group then -> false
    const [isGroup,setIsGroup] = useState(false);
    
    
    const [isGroupDelete,setIsGroupDelete] = useState(false);
    const [isChatDelete,setIsChatDelete] = useState(false);

    //get messages 
    const [messages,history,setHistory] = useGetMessage(nameDocumentNow,isGroup);

    const documentHandler =(doc)=>{ 
        setNameDocumentNow(doc);
        localStorage.setItem('nameDocumentNow',doc);
        setHistory();
    }

    const isGroupHandler =(isgroup) =>{
        setIsGroup(isgroup);
        localStorage.setItem('isGroup',isgroup ? 'true':'false');
    }

    const [isPhone,setIsPhone] = useState(false);

    /// menu dashboard 
    const [menuDashboard,setMenuDashboard] = useState();
    const [openMenuDashboard,setOpenMenuDashboard] = useState(false);
    const [contentDrawer,setContentDrawer] = useState();
    const [isChangeTab,setIsChangeTab] = useState(false);
    const menuDashboardHandler = value =>{

        setIsChangeTab(true);

        setTimeout(()=>{

            if(isPhone) setOpenMenuDashboard(true);

            setMenuDashboard(value);
        },400);

    }

    //sidebar
    const [isOpenSidebar , setIsOpenSidebar] = useState(true);
    const setIsOpenSidebarHandler = () =>{
        setIsOpenSidebar(prev => {
            if(openMenuDashboard){
                setOpenMenuDashboard(false);
                setMenuDashboard();
            } 
            return !prev;
        });
    }

    const closeBothBar =()=>{
        setOpenMenuDashboard(false);
        setIsOpenSidebar(false);
    }

    useEffect(()=>{

        const nameDocumentNow = localStorage.getItem('nameDocumentNow');
        const isChatSession = localStorage.getItem('isChatSession');
        const isGroup = localStorage.getItem('isGroup');

        setIsChatSession(isChatSession === 'true' ? true : false);
        setNameDocumentNow(nameDocumentNow);
        setIsGroup(isGroup === 'true' ? true : false);

    },[]);

    useEffect(()=>{
        const nameDocumentNow = localStorage.getItem('nameDocumentNow');
        const isGroup = localStorage.getItem('isGroup') === 'true' ? true : false;

        if(isGroup){

            if(groups){
                const isThereGroup = groups.find(group => group === nameDocumentNow);
                if(!isThereGroup){
                    setIsGroupDelete(true);
                    groupInfoHandler(false);
                }
            }

        }else{

            if(chats){
                const isThereChat = chats.find(chat => chat === nameDocumentNow);
                if(!isThereChat){
                    setIsChatDelete(true);
                    groupInfoHandler(false);
                }
            }
        }

    },[groups,chats]);

    useEffect(()=>{
        if(window.innerWidth > 900){
            setIsPhone(false);
            setMenuDashboard('chat');
        }else{
            setIsPhone(true);
            setMenuDashboard();
            setIsOpenSidebar(false);
        }
    },[]);

    // check user login 
    if(user === 'null' || user === null) return <HomePage/>
    
    return (
        <Fragment>
            <Container>

                {isPhone &&
                <Drawer padding="0 0 0 10rem"
                        show={openMenuDashboard} 
                        left="-100%" 
                        handler={setOpenMenuDashboard} 
                        bgColor="#050507" width="100%" >
                    <Dashboard
                        tab={menuDashboard}
                        setIsChangeTab={setIsChangeTab}
                        isChangeTab={isChangeTab}
                        setIsOpenSidebar={setIsOpenSidebarHandler}
                        messagesLength={messages ? messages.length : null}
                        menuDashboard={menuDashboard}
                        menuDashboardHandler={menuDashboardHandler}
                        isGroupDelete={isGroupDelete} 
                        setIsGroupDelete={setIsGroupDelete} 
                        nameDocumentNow={nameDocumentNow} 
                        isGroupHandler={isGroupHandler} 
                        setIsChatSession={chatSessionHandler} 
                        setNameDocument={documentHandler} />
                </Drawer> }

                <Sidebar
                    isPhone={isPhone}
                    setIsOpenSidebar={setIsOpenSidebarHandler}
                    isOpenSidebar={isOpenSidebar}
                    menuDashboard={menuDashboard}
                    menuDashboardHandler={menuDashboardHandler}
                /> 
  
                {!isPhone  &&
                <Dashboard
                    tab={menuDashboard}
                    setIsChangeTab={setIsChangeTab}
                    isChangeTab={isChangeTab}
                    setIsOpenSidebar={setIsOpenSidebarHandler}
                    messagesLength={messages ? messages.length : null}
                    menuDashboard={menuDashboard}
                    menuDashboardHandler={menuDashboardHandler}
                    isGroupDelete={isGroupDelete} 
                    setIsGroupDelete={setIsGroupDelete} 
                    nameDocumentNow={nameDocumentNow} 
                    isGroupHandler={isGroupHandler} 
                    setIsChatSession={chatSessionHandler} 
                    setNameDocument={documentHandler} /> }
 
                <Chat 
                    messagesLength={messages ? messages.length : null}
                    isGroupDelete={isGroupDelete} 
                    nameDocumentNow={nameDocumentNow} 
                    isGroup={isGroup} 
                    isChatSession={isChatSession} 
                    handlerGroupInfo={groupInfoHandler}> 

                    { isChatSession && nameDocumentNow && messages && !isGroupDelete ? 
                    <RenderChat  
                        history={history}
                        documentHandler={documentHandler} 
                        isGroupHandler={isGroupHandler}
                        isGroup={isGroup}  
                        groups={groups}
                        messages={messages} /> : 
                    <Logo/>}
                
                </Chat>
                

                {!isPhone && 
                <GroupInfo 
                    isGroup={isGroup} 
                    documentHandler={documentHandler} 
                    isGroupHandler={isGroupHandler} 
                    isGroupDelete={isGroupDelete} 
                    nameDocumentNow={nameDocumentNow} 
                    isOpen={openClose} 
                    handlerGroupInfo={groupInfoHandler} /> }

            </Container>
        </Fragment>
    )
}