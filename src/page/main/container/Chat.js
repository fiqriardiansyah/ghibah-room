import React,{Fragment,useState,useRef,useContext,useEffect,useCallback} from 'react';
import Styled from 'styled-components';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchPlus,faPaperPlane,faPlus,faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'

import {mediaQueries} from '../../../utils/mediaQueries';

// fuck you

//component
import Form from '../../../components/form-component/Form';
import Input from '../../../components/input-component/Input';
import Button from '../../../components/button-component/Button';
import Modal from '../../../components/modal-component/Modal';
import Loader from '../../../components/loader-component/Loader';
import Success from '../../../components/success-component/Success';
import Failed from '../../../components/failed-component/Failed';
import Warning from '../../../components/warning-component/Warning';
import Loading from '../../../components/loading-component/Loading';
import ContentLoading from '../../../components/contentload-component/Content';

//self component
import MemberBox from '../components/MemberBox';

// cloud firestore
import {sendMessage,searchUserWithEmail,addMember,leaveGroup,deleteMessage} from '../../../firebase/firestore';

//context
import {AuthContext} from '../../../context/authContext';
import {UserContext} from '../../../context/userContext';

//customeHook
import useGetInfoDocument from '../customeHook/useGetInfoDocument';
import useEventWindow from '../customeHook/useEventWindow';


const Container = Styled.div`
    flex: 1;
    height: 100vh;
    background-color: #17171b;
    border-right: 1px solid rgba(255,255,255,0.1);
    border-left: 1px solid rgba(255,255,255,0.1);

    display: flex;
    flex-direction: column;
`


// header
const Header = Styled.div`
    height: 8rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 0 4rem;
    position: relative;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HeaderInfo = Styled.div`

`
const Tag = Styled.span`
    color: rgba(255,255,255,0.5);
    margin-right: 1rem;
`
const Name = Styled.p`

    color: white;
    font-size: ${props => props.fontSize };
    text-transform: capitalize;
    margin: 0;
    
`
const Member = Styled.p`
    color: rgba(255,255,255,0.5);
    font-size: 1.3rem;
    margin: 0;
    margin-left: 2.5rem;
`
const AddMember = Styled.span`
    color: white;
    margin-left: 2rem;
    cursor: pointer;
`

const HeaderAction = Styled.div`
    position: relative;
`
const Dots = Styled.div`
    width: .5rem;
    height: .5rem;
    background-color: white;
    border-radius: 50%;
    position: relative;
    opacity: 0.5;
    transition: all .2s;

    ::before{
        content: "";
        width: 100%;
        height: 100%;
        background-color: white;
        display: block;
        border-radius: 50%;
        transform: translateY(1rem);
    }
    ::after{
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 50%;
        transform: translateY(-1.5rem);
    }
`
const DotsButton = Styled.button`
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all .2s;
    cursor: pointer;
    border: none;
    background-color: transparent;

    :hover{
        background-color: rgba(255,255,255,0.1);
    }

    :hover ${Dots}{
        opacity: 1;
    }

    :focus{
        outline: none;
    }
    :active{
        outline: none;
    }
`

const MenuList = Styled.div`
    min-width: 15rem;
    min-height: 5rem;
    background-color: white;
    border-radius: .5rem;
    position: absolute;
    top: 100%;
    right: 100%;
    z-index: 10;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
`
const Ul = Styled.ul`
    list-style: none;
    margin: 0;
    padding: 2rem;

    >*:not(:last-child){
        margin-bottom: 1rem;
    }
`
const Li = Styled.li`
    font-size: 2rem;
    font-weight: 300;
    padding-bottom: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all .2s;
    cursor: pointer;
    text-transform: capitalize;
    white-space: nowrap;

    :hover{
        color: rgba(0,0,0,0.5);
    }
`


//content
const Content = Styled.div`
    flex: 5;
    width: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`


//bottom
const Bottom = Styled.div`
    flex: 1;
    border-top: 1px solid #58595C;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    position: relative;


    ::after{
        content: "";
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: -100%;
        left: 0;
        background-image: linear-gradient(to top , #17171b,transparent);
        pointer-events: none;
    }
`
const Icon = Styled.div`
    position: absolute;
    color: rgba(255,255,255,0.5);
    right: 2rem;
    font-size: ${props => props.font };
    cursor: pointer;
    transition: all .2s;

    :hover{
        color: white
    }
`

// content modal
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
const AddMemberMain = Styled.div`
    flex: 1;
`
const ErrorText = Styled.p`
    font-size: 1.5rem;
    color: #d60d3f;
    text-transform: capitalize;

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

const Dummy = Styled.div`
    transition: all 1s 1s;
    width: 100%;
    height: 100px;
    display: block;
    margin-top: 50px;
`

////////////////////// member list

const MemberListContentContainer = Styled.div`
    display: flex;
    flex-direction: column;
`
const MemberListContentHeader = Styled.div`
    width: 100%;
    height: 5rem;
`
const MemberListContentText = Styled.div`
    color: black;
    text-align: center;
    font-weight: 300;
    font-size: 2.5rem;
`
const MemberListContentMain = Styled.div`
    width: 100%;
    max-height: 30rem;
    overflow: auto;
    padding: 0 6rem;
    box-sizing: border-box;
    min-height: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
`
const MemberListContentFooter = Styled.div`
    width: 100%;
    height: 5rem;

    display: flex;
    align-items: center;
    justify-content: space-around;
`


//button down
const ButtonToDown = Styled.button`
    background-color: #38006b;
    border: none;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    position: absolute;
    right: 2rem;
    bottom: 8rem;
    z-index: 2;
    cursor: pointer;
    transition: all .2s;
    color: rgba(255,255,255,0.5);
    font-size: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    :hover{
        background-color: #8e24aa;
        color: white;
    }
    :active{
        outline: none;
    }
    :focus{
        outline: none;
    }

    ${mediaQueries("sm")`
        bottom: 10rem;
        width: 7rem;
        height: 7rem;
    `}
`


const Chat = props =>{    

    //context
    const [user,] = useContext(AuthContext);
    const [userData,,,,groups] = useContext(UserContext);

    const [members,info] = useGetInfoDocument(props.nameDocumentNow,props.isGroup);

    const choosenMember = useRef();

    const scrollToBottom = useRef();
    const contentScroll = useRef();
    const input = useRef();
    const inputAddMember = useRef();

    const [isScroll,setIsScroll] = useState(true);

    // result user search
    const [userResultSearch,setUserResultSearch] = useState();
    const userResultSearchHandler = value => setUserResultSearch(value);

    // menu list
    const [isOpenMenuList,setIsOpenMenuList] = useState(false);
    const menuListHandler =()=> setIsOpenMenuList(prev => !prev);

    //modal 
    const [showModal,setShowModal] = useState(false);
    const modalHandler = value =>{
        if(!value) choosenMember.current = null;
        setShowModal(value);
    }
    const [contentModal,setContentModal] = useState();

    //error
    const [error,setError] = useState();
    const errorHandler = value => setError(value);
    const groupInfoHandler = value => {
        props.handlerGroupInfo(value);
        menuListHandler();
    };

    const sendForm = async (e)=>{

        e.preventDefault();

        const message = input.current.value;
        if(!message) return ;

        // send message
        const data = {
            message,
            nameDocument : props.nameDocumentNow,
            isGroup: props.isGroup,
            idUser: user,
            userData,
            info
        }

        sendMessage(data);

        input.current.value = '';
        setIsScroll(true);
    }

    const addMemberHandler =()=>{
        setContentModal(addMemberContent);
        modalHandler(true);
    }

    const deleteMessageHandler = async () =>{
        const nameDocument = localStorage.getItem('nameDocumentNow');
        deleteMessage({nameDocument,user: userData.name,messagesLength : props.messagesLength});  
    }

    const searchUser = async e=> {
        e.preventDefault();
        errorHandler();
        userResultSearchHandler();
        const email = inputAddMember.current.value;
        if(!validator.isEmail(email)) return errorHandler('not valid email !') ;

        const dataUserSearch = await searchUserWithEmail(email);

        if(dataUserSearch.success){
            if(dataUserSearch.data.idUser === localStorage.getItem('uid')) return errorHandler('this yours email foolish :) \n search again!');
            return userResultSearchHandler(dataUserSearch.data);
        }else{
            return errorHandler(dataUserSearch.message);
        }

    }

    const add = async ()=>{
        errorHandler();
        userResultSearchHandler();
        setContentModal(<Loader message={"waiting..."} />);

        const adduser = await addMember(userResultSearch,false);

        if(adduser.success){
            setContentModal(<Success message={adduser.message} />);
        }else{
            setContentModal(
                <Fragment>
                    <Failed message={adduser.message} />
                    <Button 
                        onclick={addMemberHandler}
                        color="black"
                        width="100%"
                        height="4rem"
                        id="failed-adduser"
                        type="button"
                        backColor="transparent" >
                        <Text>try another email</Text>
                    </Button>
                </Fragment>
            )
        }
    }


    const leave = async (isPromoteUser)=>{
        modalHandler(false);
        const idGroup = localStorage.getItem('nameDocumentNow');
        const idUser = localStorage.getItem('uid');
        const userData = members.find(member => member.id === idUser);

        let leave;
        if(isPromoteUser){
            leave = await leaveGroup({idGroup,idUser,userData,choosenMember: choosenMember.current});
        }else{
            leave = await leaveGroup({idGroup,idUser,userData});
        }

        if(leave.success){
            setContentModal(<Success message={"you left the group"} />);
        }else{
            setContentModal(<Success message={leave.message} />);
        }
        modalHandler(true);
    }

    const clarificationLeave = async (isPromoteUser)=>{

        setContentModal(<Warning message={"left the group?"}>
        <div style={{display: 'flex',alignItems: 'center',width: '100%'}}>
            <Button
                onclick={()=> leave(isPromoteUser)}
                margin={"0 2rem 0 0"}
                radius={".5rem"}
                width="100%"
                height="4rem"
                backColor="#d32f2f">sure</Button>
            <Button
                color="rgba(0,0,0,0.5)"
                onclick={()=> modalHandler(false)}
                radius={".5rem"}
                width="100%"
                height="4rem"
                backColor="transparent">cancel</Button>
        </div>
        </Warning>)

        modalHandler(true);
    }

    const choosenMemberHandler = async ()=> choosenMember.current && clarificationLeave(true);

    const leaveGroupHandler = async () =>{
        const idGroup = localStorage.getItem('nameDocumentNow');
        const idUser = localStorage.getItem('uid');
        const userData = members.find(member => member.id === idUser);

        if(userData.role === "admin" && members.length >= 2){
            modalHandler(true);
            setContentModal(memberListContent);
        }else{
            clarificationLeave(false);
        }

    }

    useEventWindow('click',useCallback((e)=>{
        const button = e.target.closest('.dots-button');
        if(!button) setIsOpenMenuList(false);
    }));


    const memberListContent = (
        <MemberListContentContainer>

            <MemberListContentHeader>
                <MemberListContentText>
                    Before you go ,choose who the next admin!
                </MemberListContentText>
            </MemberListContentHeader>
            <MemberListContentMain>

                {/* content */}
                {members ? members.map((member,index) => {

                    return member.role !== "admin"  && <Fragment key={index} >
                        <input type="radio" name="radio-group" id={`radio${index}`} ></input>
                        <label htmlFor={`radio${index}`}>
                        <MemberBox
                            onClick={()=>{
                                choosenMember.current = member.id;
                            }}
                            cursor="pointer"
                            isInfo={false}
                            textColor="black"
                            key={index} member={member} />
                        </label>
                    </Fragment>

                }) : <Loading widht="30px" height="30px" />}


            </MemberListContentMain>
            <MemberListContentFooter>
                <Button
                    onclick={choosenMemberHandler}
                    margin={"0 2rem 0 0"}
                    radius={".5rem"}
                    width="100%"
                    height="4rem"
                    backColor="#1faa00" >Seems Good</Button>
                <Button 
                    onclick={()=>modalHandler(false)}
                    radius={".5rem"}
                    width="100%" 
                    height="4rem" 
                    backColor="#b0bec5">Cancel</Button>
            </MemberListContentFooter>

        </MemberListContentContainer>
    );

    const addMemberContent = (
        <ContainerAddMember>

            <AddMemberHeader>
                <Title>search your friend email</Title>
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
                        placeholder="yourfriends@gmail.com" />
                </Form>
            </AddMemberMain>

        </ContainerAddMember>
    )

    useEffect(()=>{
        if(scrollToBottom.current && isScroll) scrollToBottom.current.scrollIntoView({behavior: 'smooth'});
    });

    const scrollHandler =()=>{
        const elementScroll = contentScroll.current;

        if(elementScroll){
            const scrollHeight = elementScroll.scrollHeight - (elementScroll.clientHeight + elementScroll.scrollTop);
            if(scrollHeight === 0){
                setIsScroll(true);
            }else{
                if(isScroll) return setIsScroll(false);
            }
        }
    }

    return (
        <Fragment>

            <Modal show={showModal} handler={modalHandler}>
                {contentModal}
                {error && <ErrorText >{error}</ErrorText>}
                {userResultSearch && 
                    <BoxUserSearch>
                        <NameUserSearch>{userResultSearch.name}</NameUserSearch>
                        <AddButton onClick={add}><FontAwesomeIcon icon={faPlus} /></AddButton>
                    </BoxUserSearch>
                }
            </Modal>

            <Container >

                {/* header */}
                {props.isChatSession && props.nameDocumentNow && !props.isGroupDelete &&
                    <Header>
                        
                        {info ? 
                        <Fragment>
                            <HeaderInfo>
                                {props.isGroup ?
                                <Fragment>
                                    {!props.isGroup && <Name fontSize="2rem"><Tag>#</Tag>{info ? info.nameUser : '' }</Name>}
                                    {props.isGroup && <Name fontSize="2rem"><Tag>#</Tag>{info ? info.nameGroup : ''}</Name>}
                                    {members && info && info.nameGroup !== 'global' && <Member>{members.length} member<AddMember onClick={addMemberHandler}>+ add member</AddMember></Member>}
                                </Fragment> :
                                <Name fontSize="2rem"><Tag>#</Tag>{info ? info.nameUser : ''}</Name>
                                }
                            </HeaderInfo>

                            <HeaderAction>
                                {isOpenMenuList && 
                                <MenuList>
                                    <Ul>
                                        <Li onClick={()=>groupInfoHandler(true)}>{props.isGroup ? 'group info' : 'info'}</Li>
                                        {props.isGroup && localStorage.getItem('nameDocumentNow') !== 'global' && <Li onClick={leaveGroupHandler}>leave the group</Li>}
                                        {!props.isGroup && <Li onClick={deleteMessageHandler}>delete messages</Li>}
                                    </Ul>
                                </MenuList>}

                                <DotsButton className="dots-button" onClick={menuListHandler}><Dots/></DotsButton>
                            </HeaderAction>
                        </Fragment> :
                        <ContentLoading lines={[40,60]} />
                        }

                    </Header>
                }

                {/* content */}
                <Content ref={contentScroll} onScroll={scrollHandler} >
                    {props.children}
                    <Dummy ref={scrollToBottom} />
                </Content>
                
                {/* bottom */}
                <Bottom> 
                    {!isScroll &&
                    <ButtonToDown onClick={()=>setIsScroll(true)}>
                        <FontAwesomeIcon icon={faAngleDoubleDown} />
                    </ButtonToDown>
                    }
                   
                    {props.isChatSession && props.nameDocumentNow && !props.isGroupDelete &&
                        <Form onsubmit={sendForm}>
                            <Input 
                                ref={input}
                                icon={<Icon font="3rem" onClick={sendForm}><FontAwesomeIcon icon={faPaperPlane} /></Icon>}
                                background="#100f10" 
                                fontSize="2rem" 
                                padRight="6rem" 
                                height="5rem" 
                                type="text" 
                                name="message" 
                                id="chat-input" 
                                placeholder="Type something fun.." />
                        </Form>
                    }
                </Bottom>
            </Container>

        </Fragment>
    )
};


export default Chat;