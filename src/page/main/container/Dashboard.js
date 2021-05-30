import React,{Fragment,useContext,useState,useEffect,useCallback,useRef} from 'react';
import Styled from 'styled-components';
import validator from 'validator';

import {mediaQueries} from '../../../utils/mediaQueries';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronDown,faChevronUp,faSearchPlus,faComments} from '@fortawesome/free-solid-svg-icons'

//img
import DummyImg from '../../../image/ex.jpg';

//custom hook
import useEventWindow from '../customeHook/useEventWindow';

// components
import Form from '../../../components/form-component/Form';
import Input from '../../../components/input-component/Input';
import Button from '../../../components/button-component/Button';
import Modal from '../../../components/modal-component/Modal';
import Loader from '../../../components/loader-component/Loader';
import Success from '../../../components/success-component/Success';
import Failed from '../../../components/failed-component/Failed';
import Loading from '../../../components/loading-component/Loading';
import ContentLoading from '../../../components/contentload-component/Content';

//self component
import ChatTab from '../dashboard-tab/Chat';
import FriendTab from '../dashboard-tab/Friend';

//context
import {UserContext} from '../../../context/userContext';
import {AuthContext} from '../../../context/authContext';

//cloud firestore
import {createNewGroup,deleteChat,deleteMessage, addFriend,searchUserWithEmail,startChat} from '../../../firebase/firestore';

const Container = Styled.div`
    flex-basis: 30rem;
    height: 100vh;
    background-color: #050507;

    display: flex;
    flex-direction: column;

    ${mediaQueries("sm")`
        flex-basis: auto;
        width: 100%;
    `};
`
const Header = Styled.div`
    width: 100%;
    height: 8rem;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;
`
const Menu = Styled.div`
    width: 100%;
    height: 200%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 2rem;
    box-sizing: border-box;
    padding-bottom: 20rem;
    transition: all .3s;

    transform: ${props => props.changeTab && 'translate(-100%)'};
`

const Devider = Styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`

/// content modal create group
const ContainerCreateGroupModal = Styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const CreateGroupModalHeader = Styled.div`
    flex: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
`
const Title = Styled.h1`
    font-size: 2rem;
    color: black;
    text-transform: capitalize;
    margin: 0;
    font-weight: 300;
`
const Text = Styled.p`
    text-transform: capitalize;
    font-size: 1.5rem;
`
const CreateGroupModalMain = Styled.div`
    flex: 1;
`
const Icon = Styled.div`
    color: rgba(255,255,255,0.5);
    font-size: 2rem;
    position: absolute;
    right: 1rem;
    transition: all .2s;

    :hover{
        color: white
    }
`

const ErrorText = Styled.p`
    color: #d50000;
    font-size: 1.6rem;
    text-align: center;
    text-transform: capitalize;
`

// search email to chat

const ContainerAddMember = Styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const AddMemberHeader = Styled.div`
    flex: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
`
const TitleContent = Styled.h1`
    font-size: 2rem;
    color: black;
    text-transform: capitalize;
    margin: 0;
    font-weight: 300;
`

const AddMemberMain = Styled.div`
    flex: 1;
`

const BoxUserSearch = Styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 5rem;
    border-radius: 1rem;
    background-color: #ec407a;
    margin-top: 2rem;
    padding: 0 2rem;
    box-sizing: border-box;
`
const NameUserSearch = Styled.p`
    text-transform: capitalize;
    margin: 0;
    color: white;
    font-size: 2rem;
`
const AddButton = Styled.button`
    background: transparent;
    color: white;
    outline: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;

    :active{
        outline: none;
    }

`




const isFriend = data => data.friends.find(friend => friend.split("[*devider*]")[0] === data.idUser );

export default function Dashboard(props){

    //context
    const [userData,,,,groups,chats,friends] = useContext(UserContext);
    const [user,] = useContext(AuthContext);

    //modal
    const [showModal,setShowModal] = useState(false);
    const modalHandler = (value) => setShowModal(value);
    const [modalContent,setModalContent] = useState();

    /// dropdown menu
    const [menuGroup,setMenuGroup] = useState(true);
    const [menuChats,setMenuChats] = useState(true);
    const [menuFriends,setMenuFriends] = useState(true);

    ///error
    const [error,setError] = useState(false);
    const [errorSearch,setErrorSearch] = useState();
    const errorSearchHandler = value => setErrorSearch(value);
    const errorHandler = value => setError(value);

    // result user search
    const [userResultSearch,setUserResultSearch] = useState();
    const userResultSearchHandler = value => setUserResultSearch(value);


    const createGroupForm = async e => {
        setError(false);
        e.preventDefault();
        const nameGroup = e.target.elements.namegroup.value;

        if(!nameGroup) return ;
        if(nameGroup.includes("-")) return setError(true);
        
        const data = { creator: userData ,createdAt: new Date().getTime(), nameGroup }

        //render loading content
        setModalContent(<Loader message={"creating..."} />);

        const req = await createNewGroup(data,user);

        if(req){
            setModalContent(successModal);
        }else{
            setModalContent(failedModal);
        }

    }

    const successModal = (
        <Success message={"success create new group"}>
            <Button onclick={()=> modalHandler(false)} width="100%" height="4rem" id="success-button" backColor="#2C5FB5" >got it</Button>
        </Success>
    )

    const failedModal = (
        <Failed message={"oops! something went wrong!!!"} >
            <Button onclick={()=> createGroup()} width="100%" height="4rem" id="success-button" backColor="#2C5FB5" >try again</Button>
        </Failed>
    )

    const contentModalCreateGroup = (
        <ContainerCreateGroupModal>

            <CreateGroupModalHeader>
                <Title>create new group</Title>
            </CreateGroupModalHeader>
            <CreateGroupModalMain>
                <Form direction="column" onsubmit={createGroupForm} >
                    <Input 
                        background="#17171b"
                        fontSize="1.5rem"
                        height="4rem" 
                        type="text" 
                        name="namegroup"
                        id="create-group-input" 
                        placeholder="Group Name" />
                    <Devider width="100%" height="3rem" />
                    <Button 
                        color="black"
                        width="100%"
                        height="3rem"
                        id="create-group-button"
                        type="submit"
                        backColor="transparent" >
                        <Text>+ create now!</Text>
                    </Button>
                </Form>
            </CreateGroupModalMain>

        </ContainerCreateGroupModal>
    )

    const [isPhone,setIsPhone] = useState(false);

    const groupClickHandler =(group)=>{
        props.setIsGroupDelete(false);
        props.setNameDocument(group);
        props.setIsChatSession(true);
        props.isGroupHandler(true);

        if(isPhone) props.setIsOpenSidebar();
    }

    const chatClickHandler =(chat)=>{
        props.setIsGroupDelete(false);
        props.setNameDocument(chat);
        props.setIsChatSession(true);
        props.isGroupHandler(false);
        
        if(isPhone) props.setIsOpenSidebar();
    }

    useEffect(()=>{
        if(window.innerWidth > 900) return setIsPhone(false);
        return setIsPhone(true);
    },[]);

    const createGroup = () =>{
        modalHandler(true);
        setModalContent(contentModalCreateGroup);
    }

    const addFriendHandler =(data)=>{
        addFriend(data);
    }

    const deleteChatHandler = async (data)=>{
        const idUser = localStorage.getItem('uid');
        const nameDocumentNow = localStorage.getItem('nameDocumentNow');

        deleteChat({idChat: data,idUser});
        deleteMessage({nameDocument: data,user: userData.name,messagesLength: props.messagesLength});
        
        if(nameDocumentNow === data){
            groupClickHandler('global');
        }

    }

    const [isClickMenu,setIsClickMenu] = useState(false);
    useEventWindow('click',useCallback((e)=>{
        const button = e.target.closest('.chat-menu');
        if(!button) setIsClickMenu(false);
    }));

    // search user

    const addChatHandler =()=>{
        setModalContent(addChatContent);
        modalHandler(true);
        userResultSearchHandler();
    }

    const input = useRef();
    const inputAddMember = useRef();
    const searchUser = async e=> {
        e.preventDefault();
        errorSearchHandler();
        userResultSearchHandler();
        const email = inputAddMember.current.value;
        if(!validator.isEmail(email)) return errorSearchHandler('not valid email !') ;

        const dataUserSearch = await searchUserWithEmail(email);

        if(dataUserSearch.success){
            if(dataUserSearch.data.idUser === localStorage.getItem('uid')) return errorSearchHandler('this yours email foolish :) \n search again!');
            return userResultSearchHandler(dataUserSearch.data);
        }else{
            return errorSearchHandler(dataUserSearch.message);
        }

    }

    const addChat = async ()=>{
        errorSearchHandler();
        setModalContent(<Loader message={"waiting..."} />);

        if(userResultSearch.idUser){

            const userId = localStorage.getItem('uid'); // current user
    
            const idChat = await startChat({user1: userId + "[*devider*]" + userData.name,user2: userResultSearch.idUser + "[*devider*]" + userResultSearch.name});
    
            if(idChat.success) chatClickHandler(idChat.id);

            setModalContent();
            modalHandler(false);
            userResultSearchHandler();
        }
        
    }

    const addChatContent = (
        <ContainerAddMember>

            <AddMemberHeader>
                <TitleContent>search email</TitleContent>
            </AddMemberHeader>

            <AddMemberMain>
                <Form onsubmit={searchUser}>
                    <Input 
                        ref={inputAddMember}
                        icon={<Icon font="2rem" onClick={searchUser}><FontAwesomeIcon icon={faSearchPlus} /></Icon>}
                        background="#100f10"
                        fontSize="1.5rem"
                        padRight="6rem"
                        height="5rem" 
                        type="text" 
                        name="addmember" 
                        id="addmember" 
                        placeholder="example@gmail.com" />
                </Form>
            </AddMemberMain>

        </ContainerAddMember>
    )

    //change Tab
    useEffect(()=>{

        const menuTab = document.querySelector('.menu-tab');

        menuTab.style.transform = `translateX(${props.isChangeTab ? '-150%' : '0%'})`;

        setTimeout(()=>{
            props.setIsChangeTab(false);
        },500);

    },[props.isChangeTab]);

    return (
        <Fragment>

            <Modal show={showModal} handler={modalHandler}>
                {modalContent}
                {error && <ErrorText>name group cannot containt "-" character</ErrorText>}
                {errorSearch && <ErrorText >{errorSearch}</ErrorText>}
                {userResultSearch && 
                    <BoxUserSearch>
                        <NameUserSearch>{userResultSearch.name}</NameUserSearch>
                        <AddButton onClick={addChat}><FontAwesomeIcon icon={faComments} /></AddButton>
                    </BoxUserSearch>
                }
            </Modal>

            <Container>

                <Header>
                    <Form>
                        <Input
                            icon={<Icon><FontAwesomeIcon icon={faSearch} /></Icon>}
                            padRight="4rem"
                            background="#17171b"
                            fontSize="1.5rem"
                            height="4rem" 
                            type="text" 
                            name="search-input" 
                            id="search-input" 
                            placeholder="Search..." />
                    </Form>
                </Header>

                <Menu className="menu-tab" >
                    {props.tab === 'chat' ?
                     <ChatTab
                        setMenuGroup={setMenuGroup}
                        menuGroup={menuGroup}
                        createGroup={createGroup}
                        groups={groups}
                        nameDocumentNow={props.nameDocumentNow}
                        groupClickHandler={groupClickHandler}

                        setMenuChats={setMenuChats}
                        menuChats={menuChats}
                        addChatHandler={addChatHandler}
                        chats={chats}
                        addFriendHandler={addFriendHandler}
                        isFriend={isFriend}
                        deleteChatHandler={deleteChatHandler}
                        setIsClickMenu={setIsClickMenu}
                        isClickMenu={isClickMenu}
                        chatClickHandler={chatClickHandler}
                        DummyImg={DummyImg}
                        friends={friends}
                     /> : 
                     <FriendTab
                        friends={friends}
                        DummyImg={DummyImg}
                        menuFriends={menuFriends}
                        setMenuFriends={setMenuFriends}
                     
                     /> }

                </Menu>

            </Container>
        </Fragment>
    )
}


// fuck you