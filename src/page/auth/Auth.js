import React,{Fragment,useState,useContext,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';
import Styled from 'styled-components';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import {mediaQueries} from '../../utils/mediaQueries';

import BgImage from '../../image/authbackground.jpg';

import firebase from '../../firebase/firebase';

//components
import Form from '../../components/form-component/Form';
import Input from '../../components/input-component/Input';
import Button from '../../components/button-component/Button';
import Modal from '../../components/modal-component/Modal';
import Loader from '../../components/loader-component/Loader';
import Success from '../../components/success-component/Success';
import Failed from '../../components/failed-component/Failed';

//context
import {AuthContext} from '../../context/authContext';
import {UserContext} from '../../context/userContext';

// utils
import { useComponentWillMount } from '../../utils/useComponentWillMount';
import randomColor from '../../utils/randomColor';

const Container = Styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('${BgImage}');
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    overflow: auto;
    
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormBox = Styled.div`
    min-width: 40rem;
    min-height: 30rem;
    background-color: rgb(35,36,41);
    border-radius: .3rem;
    border: 1px solid rgba(255,255,255,0.3);
    position: relative;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    ${mediaQueries("sm")`
        width: 80% !important;
        min-width: 0;
    `}; 
`

const WelcomeText = Styled.p`
    font-size: 1.5rem;
    color: rgba(255,255,255,0.2);
    font-weight: 300;
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 1rem;

    ${mediaQueries("sm")`
        font-size: 2rem;
    `}; 
`
const AuthText = Styled.p`
    font-size: 2rem;
    color: white;
    font-weight: 400;
    text-transform: capitalize;
    margin: 0;
    margin-bottom: 2rem;

    ${mediaQueries("sm")`
        font-size: 3rem;
    `}; 
`

const SwitchAuthText = Styled.p`
    color: rgba(255,255,255,0.3);
    font-size: 1.5rem;
    font-weight: 200;
    margin: 2rem 0 0 0;

    display: flex;
    align-self: flex-start;
`
const Switch = Styled.span`
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
    margin-left: 1rem;
`

const ErrorMessage = Styled.p`
    margin: ${props => props.margin ? props.margin : '0'};
    font-size: 1.5rem;
    font-weight: 300;
    color: #d11134;
    display: flex;
    align-self: flex-end;
    text-transform: ${props => props.upper ? 'uppercase' : 'capitalize' };
    
`
const Wrapper = Styled.div`
    display: flex; 
    width: 100%;

    ${mediaQueries("sm")`
        flex-direction: column;
    `}
`
const Devider = Styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`

const Icon = Styled.div`
    color: rgba(255,255,255,0.2);
    font-size: 2rem;
    position: absolute;
    right: 1rem;
    cursor: pointer;
    transition: all .2s;

    :hover{
        color: white
    }
`

const Auth = props =>{

    //context
    let [user,setUserLogin] = useContext(AuthContext);
    let [userData,setId,dataGroups] = useContext(UserContext);

    // error 
    const [error,setError] = useState({
        name: null,
        email: null,
        password: null,
        auth: null
    });
    const errorHandler =(data)=> setError( prev => {
        return {...prev,...data}
    })

    //is sign up?
    const [isSignUp,setIsSignUp] = useState(false);
    const signHandler =()=> {
        errorHandler({name: null,email: null,password: null,auth: null});
        setIsSignUp(prev=>!prev);
    };

    //modal
    const [showModal,setShowModal] = useState(false);
    const modalHandler = (value) => setShowModal(value);
    const [modalContent,setModalContent] = useState();

    // visible password input
    const [isVisiblePassword,setIsVisiblePassword] = useState(false);
    const visiblePasswordHandler =()=> setIsVisiblePassword(prev => !prev);


    const submitHandler = async e => {

        let temporaryError = false;

        e.preventDefault();

        let name = e.target.elements.username ? e.target.elements.username.value : null;
        let passwordRepeat = e.target.elements.passwordrepeat ? e.target.elements.passwordrepeat.value : null;
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;

        errorHandler({name: null,email: null,password: null,auth: null});
        temporaryError = false;

        if(!validator.isEmail(email)) {
            temporaryError = true;
            errorHandler({email: 'not valid email'})
        };
        if(password.length < 7) {
            temporaryError = true;
            errorHandler({password: 'at least 8 characters long'})
        };

        if(isSignUp){
            if(name.length === 0) {
                temporaryError = true;
                errorHandler({name: 'field required'})
            };
            if(passwordRepeat !== password) {
                temporaryError = true;
                errorHandler({password: 'repeat password is not same'})
            };
        }

        if(!temporaryError){
            modalHandler(true);
            const reqAuth = await authHandler({name,email,password,isSignUp});
            modalHandler(false);
            if(!reqAuth.success) return errorHandler({auth: reqAuth.message});
        }

        name = '';
        passwordRepeat = '';
        email = '';
        password = '';
    }

    const authHandler = async ({...data}) =>{
        try{
    
            if(data.isSignUp){
                
                setModalContent(<Loader message={"creating..."} />)

                const req = await firebase.auth().createUserWithEmailAndPassword(data.email,data.password);
                const idReg = await JSON.parse(JSON.stringify(req)).user.uid;
        
                //store data user
                const userCollection = await firebase.firestore().collection('users').doc(idReg);
                await userCollection.set({name: data.name,color: randomColor(),email: data.email});
                await userCollection.collection('groups').doc('global').set({});
        
                setUserLogin(idReg);
                setId(idReg);
                
            }else{

                setModalContent(<Loader message={"loading..."} />)

                const req = await firebase.auth().signInWithEmailAndPassword(data.email,data.password);
                const idReg = await JSON.parse(JSON.stringify(req)).user.uid;
        
                setUserLogin(idReg);
                setId(idReg);
        
            }
    
            return {success: true};
    
        }catch(e){
            return {success: false,message: e.message}
        }
    }

    if(user !== 'null' && user !== null){
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            <Modal show={showModal} handler={modalHandler}>
                    {modalContent}
            </Modal>

            <Container>
            <FormBox>
                <WelcomeText>{isSignUp ? 'welcome' : 'welcome back'}</WelcomeText>
                <AuthText>{isSignUp ? 'create your account' : 'log into your account'}</AuthText>
                <Form direction="column" onsubmit={submitHandler}>
                    {isSignUp && 
                    <Input 
                        margin="2rem 0 0 0"
                        useLabel={true}
                        label="Username"
                        radius=".5rem"
                        border="1px solid rgba(255,255,255,0.3)"
                        background="transparent"
                        fontSize="1.5rem"
                        height="4rem" 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="Username" />

                    }
                    {isSignUp && error.name && <ErrorMessage>{error.name}</ErrorMessage>}

                    <Input 
                        margin="2rem 0 0 0"
                        useLabel={true}
                        label="Email"
                        radius=".5rem"
                        border="1px solid rgba(255,255,255,0.3)"
                        background="transparent"
                        fontSize="1.5rem"
                        height="4rem" 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="Email" />

                    {error.email && <ErrorMessage>{error.email}</ErrorMessage>}   

                    <Wrapper>
                        <Input
                            icon={<Icon onClick={visiblePasswordHandler}><FontAwesomeIcon icon={isVisiblePassword ? faEyeSlash : faEye} /></Icon>}
                            margin="2rem 0 0 0"
                            useLabel={true}
                            label="Password"
                            radius=".5rem"
                            border="1px solid rgba(255,255,255,0.3)"
                            background="transparent"
                            fontSize="1.5rem"
                            height="4rem" 
                            type={isVisiblePassword ? 'text':'password'} 
                            name="password" 
                            id="password" 
                            placeholder="Password" />

                    {isSignUp && <Devider width="2rem" height="100%" /> }

                        {isSignUp && 
                            <Input 
                            margin="2rem 0 0 0"
                            useLabel={true}
                            label="Password repeat"
                            radius=".5rem"
                            border="1px solid rgba(255,255,255,0.3)"
                            background="transparent"
                            fontSize="1.5rem"
                            marginRight="0"
                            height="4rem" 
                            type={isVisiblePassword ? 'text':'password'} 
                            name="passwordrepeat" 
                            id="passwordrepeat" 
                            placeholder="Password repeat" />
                        }
                    </Wrapper>
                    {error.password && <ErrorMessage>{error.password}</ErrorMessage>} 

                    <Button
                        radius=".5rem"
                        margin="2rem 0 0 0"
                        width="100%"
                        height="4rem"
                        fontSize="2rem"
                        id="auth-button"
                        type="submit"
                        backColor="rgb(64,139,255)" >
                            {isSignUp ? 'Sign up' : 'Sign in'}
                    </Button>

                    {error.auth && <ErrorMessage margin="1rem 0 0 0" upper={true} >{error.auth}</ErrorMessage>} 

                    <SwitchAuthText>{isSignUp ? 'have an account?':' Not registerd yet?'}<Switch onClick={signHandler} >{isSignUp ? 'SignIn':'SignUp'}</Switch> </SwitchAuthText>

                </Form>
            </FormBox>
        </Container>
        </Fragment>
    )

}

export default withRouter(Auth);