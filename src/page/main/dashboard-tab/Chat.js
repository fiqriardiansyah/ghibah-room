import React from 'react';
import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronDown,faChevronUp,faSearchPlus,faComments} from '@fortawesome/free-solid-svg-icons'

//component
import Loading from '../../../components/loading-component/Loading';
import ContentLoading from '../../../components/contentload-component/Content';

//self component
import UserBox from '../components/UserBox';

import { mediaQueries } from '../../../utils/mediaQueries';

const Container = Styled.div`
    flex: 1;
`

const TextContent = Styled.p`
    text-transform: capitalize;
    font-size: 1.5rem;

`
const MenuContainer = Styled.div`
    margin: 2rem 0;
`
const MenuHeader = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`
const NameMenu = Styled.p`
    color: ${props => props.active === "active" ? 'white' : 'rgba(255,255,255,0.5)' };
    font-size: 1.5rem;
    margin-left: 3rem;
    cursor: pointer;
    text-transform: capitalize;
    transition: all .2s;

    :hover{
        color: white;
    }

    ${mediaQueries("sm")`
        font-size: 2rem;
    `};
`
const TagMenu = Styled.span`
    color: ${props => props.active === "active" ? 'white' : 'rgba(255,255,255,0.5)'}
    text-transform: capitalize;

    ${mediaQueries("sm")`
        font-size: 2rem;
    `};
`
const ButtonIcon = Styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    color: rgba(255,255,255,0.4);
    font-size: ${props => props.fontSize || '2rem'};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 100px;
    cursor: pointer;
    transition: all .2s;
    margin: ${props => props.margin || '0'};

    :hover{
        background: rgba(255,255,255,0.2);
        color: white;
    }

    :active{
        outline: none;
    }

    :focus{
        outline:
    }

    ${mediaQueries("sm")`
        font-size: 3rem;
    `};
`
const MenuBody = Styled.div`
    background: #0e0e13;
    padding: 1rem 0;
    border-radius: 1rem;
    position: relative;
    min-height: 8rem;
    box-sizing: border-box;
`
const MenuTitle = Styled.div`
    display: flex;
    align-items: center;
    color: rgba(255,255,255,0.5);
    font-size: 1.5rem;

    ${mediaQueries("sm")`
        font-size: 2rem;
    `}; 
`

const cutNameLength = name => name.length > 12 ? `${name.slice(0,12)}...` : name ;

const Chat = props => {

    return (
        <Container>
            <MenuContainer>

                <MenuHeader>
                    <MenuTitle>GROUPS
                        <ButtonIcon margin="0 0 0 1rem;" onClick={()=>props.setMenuGroup(prev => !prev)} fontSize="1.5rem" >
                            <FontAwesomeIcon icon={props.menuGroup ? faChevronUp : faChevronDown} />
                        </ButtonIcon>
                    </MenuTitle> 
                    <ButtonIcon onClick={props.createGroup}>+</ButtonIcon>
                </MenuHeader>

                {props.menuGroup &&
                    <MenuBody>
                        {
                            props.groups ? props.groups.map((group,index) =>{
                                return <NameMenu 
                                    active={group === props.nameDocumentNow ? 'active' : 'nonactive'} 
                                    key={index} 
                                    onClick={()=>props.groupClickHandler(group)}>
                                        <TagMenu
                                        active={group === props.nameDocumentNow ? 'active' : 'nonactive'}
                                        ># </TagMenu>{cutNameLength(group.split("-")[0])}
                                    </NameMenu>
                            }) :
                            <ContentLoading lines={[50,80,60]} />
                        }
                    </MenuBody> 
                }

            </MenuContainer>

            <MenuContainer> 
                <MenuHeader>
                    <MenuTitle>DIRECT MESSAGES
                        <ButtonIcon margin="0 0 0 1rem;" onClick={()=>props.setMenuChats(prev => !prev)} fontSize="1.5rem" >
                            <FontAwesomeIcon icon={props.menuChats ? faChevronUp : faChevronDown} />
                        </ButtonIcon>
                    </MenuTitle> 
                    <ButtonIcon onClick={props.addChatHandler}>+</ButtonIcon>
                </MenuHeader>

                {props.menuChats && 
                    <MenuBody>
                        {
                            props.chats ? props.chats.map((data,index)=>{
                                return <UserBox 
                                        addFriendHandler={props.addFriendHandler}
                                        isFriend={props.isFriend({idUser: data.idUser,friends: props.friends})}
                                        deleteChat={props.deleteChatHandler}
                                        setIsClickMenu={props.setIsClickMenu}
                                        isClickMenu={props.isClickMenu}
                                        active={data.idChat === props.nameDocumentNow ? 'active' : 'nonactive'} 
                                        key={index} 
                                        onClick={()=>props.chatClickHandler(data.idChat)} 
                                        data={data} 
                                        image={props.DummyImg} />
                            }) :
                            <ContentLoading lines={[50,80,60]} />
                        }
                    </MenuBody>
                }

            </MenuContainer>

        </Container>
    );
}


export default Chat;