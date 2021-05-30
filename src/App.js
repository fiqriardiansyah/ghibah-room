import React from 'react';
import {BrowserRouter as Router ,Route,Redirect,Switch} from 'react-router-dom';

//page
import ChatPage from './page/main/Main';
import ProfilePage from './page/profile/Main';
import AuthPage from './page/auth/Auth';

// auth context
import {AuthProvider} from './context/authContext';
import {UserProvider} from './context/userContext';


export default function App(){

    
    return (
        <>
        <AuthProvider>
            <UserProvider>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <ChatPage />
                        </Route>

                        <Route path="/profile" exact>
                            <ProfilePage />
                        </Route>

                        <Route path="/auth" exact>
                            <AuthPage />
                        </Route>

                        <Redirect to="/auth" />
                    </Switch>
                </Router>
            </UserProvider>
        </AuthProvider>
        </>
    )
}

