import React,{Fragment,useState,useContext,useRef,useEffect,useCallback} from 'react';
import Styled from 'styled-components';
import Icofont from 'react-icofont';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchPlus,faPaperPlane,faPlus ,faEllipsisH} from '@fortawesome/free-solid-svg-icons'

//firestore
import {deleteMember,kickOutFromGroup} from '../../../firebase/firestore';

// self components
import MemberBox from '../components/MemberBox';

// customeHook
import useGetInfoDocument from '../customeHook/useGetInfoDocument';
import useEventWindow from '../customeHook/useEventWindow';

//content
import {UserContext} from '../../../context/userContext';

//components
import Modal from '../../../components/modal-component/Modal';
import Failed from '../../../components/failed-component/Failed';
import Warning from '../../../components/warning-component/Warning';
import Button from '../../../components/button-component/Button';
import Loading from '../../../components/loading-component/Loading';

const Container = Styled.div`
    width: ${props => props.isOpen ? '30rem' : '0'};
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color:  #17171b;
    transition: all .5s;
`

const Header = Styled.div`
    width: 100%;
    height: 8rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const TitleText = Styled.p`
    color: white;
    font-size: 2rem;
`
const CreateText = Styled.span`
    font-size: 1.5rem;
    display: block;
    color: rgba(255,255,255,0.5);
`
const Close = Styled.div`
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    color: white;
    background-color: rgba(255,255,255,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    cursor: pointer;
    transition: all .2s;

    :hover{
        background-color: rgba(255,255,255,0.4);
    }
`

const Content = Styled.div`
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
`
const InfoContainer = Styled.div`
    width: 100%;
`
const InfoHeader = Styled.p`
    display: flex;
    color: rgba(255,255,255,0.5);
    justify-content: space-between;
    font-size: 1.5rem;
    margin: 0;
`
const ButtonCollapse = Styled.button`
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    transition: all .2s;
    background-color: transparent;
    border: none;

    :hover{
        color: white
    }
    :active{
        outline: none;
    }
    :focus{
        outline: none;
    }
`
const Box = Styled.div`
    width: 100%;
    display: ${props => props.open ? 'block':'none'};
    margin-top: 1rem;
    background-color: #202025;
    box-sizing: border-box;
    border-radius: 1rem;
    position: relative;
    min-height: 2rem;
`
const Wrapper = Styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`
const Text = Styled.p`
    font-size: 1.6rem;
    font-weight: 400;
`

const getTime = time =>{
    const T = new Date(parseInt(time));
    const day = T.getDate();
    const month = T.getMonth();
    const year = T.getFullYear();
    return `${day}/${month}/${year}` ;
}

export default function GroupInfo(props){

    //context
    const [userData]= useContext(UserContext);

    const groupInfoHandler =(value)=> props.handlerGroupInfo(value);

    const [collapseMember,setCollapseMember] = useState(true);
    const collapseMemberHandler = () => setCollapseMember(prev => !prev);

    const [isClickMenu , setIsClickMenu] = useState(false);

    const [modal,setModal] = useState(false);
    const [contentModal,setContentModal] = useState();

    const dataDeleteUser = useRef();
    

    const deleteMemberAndSendNotif =()=>{
        setModal(false);
        deleteMember(dataDeleteUser.current);
        kickOutFromGroup({...dataDeleteUser.current,name: userData.name,email: ''});
    }

    const deleteMemberContent = (
        <Fragment>
            <Warning message={"kick out? you sure?"}>
                <Wrapper>
                    <Button 
                        onclick={deleteMemberAndSendNotif}
                        margin="0 1rem 0 0"
                        radius=".5rem"
                        color="white"
                        width="100%"
                        height="4rem"
                        type="button"
                        backColor="#d50000" >
                        <Text>sure</Text>
                    </Button>
                    <Button 
                        onclick={()=>setModal(false)}
                        radius=".5rem"
                        color="rgba(0,0,0,0.5)"
                        width="100%"
                        height="4rem"
                        type="button"
                        backColor="transparent" >
                        <Text>nope</Text>
                    </Button>
                </Wrapper>
            </Warning>
        </Fragment>
    )

    const deleteMemberHandler = data =>{
        setContentModal(deleteMemberContent);
        setModal(true);
        dataDeleteUser.current = data
    }

    const [members,infoGroup] = useGetInfoDocument(props.nameDocumentNow,props.isGroup);

    useEventWindow('click',useCallback((e)=>{
        const button = e.target.closest('.menu-button');
        if(!button) setIsClickMenu(false);
    }));
    
    return (
        <Fragment>

            <Modal show={modal} handler={value => setModal(value)}>
                {contentModal}
            </Modal>

            <Container isOpen={props.isOpen}>
                {props.isOpen && (
                    <Fragment>
                        <Header>
                            <TitleText>{props.isGroup ? 'Group Info' : 'Info'}
                                {props.isGroup && <CreateText>Created {infoGroup && getTime(infoGroup.createdAt)}</CreateText> }    
                            </TitleText>
                            <Close onClick={()=>groupInfoHandler(false)} ><Icofont icon="close-line" /></Close>
                        </Header>

                        <Content>

                            <InfoContainer>
                                {props.isGroup && infoGroup && infoGroup.idGroup !== 'global' && 
                                    <Fragment>
                                        <InfoHeader > MEMBERS <ButtonCollapse onClick={collapseMemberHandler}><Icofont icon={collapseMember ? "caret-down" : "caret-right"} /></ButtonCollapse></InfoHeader>
                                        <Box open={collapseMember}>
                                            {members ? members.map((member,index) => {
                                                return <MemberBox
                                                    userData={userData} 
                                                    isGroupHandler={props.isGroupHandler}
                                                    documentHandler={props.documentHandler}
                                                    onClick={()=>null}
                                                    isInfo={true}
                                                    isClickMenu={isClickMenu} 
                                                    setIsClickMenu={setIsClickMenu} 
                                                    deleteMember={deleteMemberHandler} 
                                                    key={index} member={member} />
                                            }) : <Loading widht="30px" height="30px" />}
                                        </Box>
                                    </Fragment>
                                }
                            </InfoContainer>

                        </Content>
                    </Fragment>
                )}
            </Container>
        </Fragment>
    )
}