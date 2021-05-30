import React,{useState,useEffect} from 'react';
import Styled from 'styled-components';
import {Link as LinkDirect} from 'react-router-dom';
import {mediaQueries} from '../../utils/mediaQueries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons'

import frontImg from '../../image/front.svg';
import logo from '../../image/favicon.svg';



//components
import Drawer from '../../components/drawer-component/Drawer';

const Container = Styled.div`
    width: 100vw;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to bottom right, #181718 70%, #252629);
`
const Nav = Styled.nav`
    width: 100vw;
    height: 8rem;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 5rem;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

`
const LogoImg = Styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
`
const Img = Styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`
const Links = Styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    
    display: flex;

    &>*{
        margin-left: 5rem;
    }
`
const Link = Styled.li`
    color: rgba(255,255,255,0.2);
    font-size: 2rem;
    cursor: pointer;
    transition: all .2s;

    :hover{
        color: white;
    }

    ${mediaQueries("sm")`
        color: white !important;
        font-size: 4rem !important;
        margin: 0;
        margin-top: 2rem;
        font-weight: 300;
        text-transform: capitalize;
    `};
`
const Dev = Styled.div`
    display: flex;
    align-items: center;
`
const Name = Styled.p`
    color: #CC7525;
    font-size: 2.5rem;
    margin-left: 2rem;
    font-family: 'Roboto';
    font-weight: 500;
    text-transform: uppercase;
`

const Content = Styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: space-around;
    ${mediaQueries("sm")`
        flex-direction: column;
        justify-content: center;
    `};

`

const FrontImg = Styled.div`
    width: 40rem;
    height: 40rem;

    ${mediaQueries("sm")`
        width: 70%;
    `};
`

const Text = Styled.p`
    color: white;
    font-size: 5rem;
    text-transform: capitalize;

    ${mediaQueries("sm")`
        font-size: 3rem;
    `};
`

const Main = props => {

    const [openDrawer,setOpenDrawer] = useState(false);
    const [isPhone , setIsPhone] = useState(false);

    useEffect(()=>{
        if(window.innerWidth > 600){
            setIsPhone(false);
            setOpenDrawer(false);
        }else{
            setIsPhone(true);
        }
    },[]);

    const drawerContent = (
        <div>
            <Links style={{flexDirection: 'column'}}>
                <LinkDirect style={{textDecoration: 'none',margin: 0}} to="/auth"><Link>sign in</Link></LinkDirect>
                <Link>mantap gan</Link>
                <Link>creator</Link>
            </Links>
        </div>
    );

    return (
        <Container>

            <Drawer show={openDrawer} handler={setOpenDrawer} bgColor="#2e313c" width="70%" left="-70%" >
                {drawerContent}
            </Drawer>

            <Nav>
                <Dev>
                    <LogoImg><Img src={logo} /></LogoImg>
                    <Name>Ghibah Room</Name>
                </Dev>
                {!isPhone ? 
                <Links>
                    <LinkDirect style={{textDecoration: 'none'}} to="/auth"><Link>sign in</Link></LinkDirect>
                    <Link>mantap gan</Link>
                    <Link>creator</Link>
                </Links> :
                <div style={{color: 'white',fontSize: '4rem'}} onClick={()=>setOpenDrawer(prev => !prev)}>
                    <FontAwesomeIcon icon={openDrawer ? faTimes : faBars} />
                </div>
                }
            </Nav>

            <Content>
                <FrontImg><Img src={frontImg} /></FrontImg>
                <Text>lets join to start ghibah</Text>
            </Content>

        </Container>
    )   
}

export default Main;