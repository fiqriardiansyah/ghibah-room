import React ,{useState} from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = props =>{


    const [user,setUser] = useState(localStorage.getItem('uid'));
    const setUserLogin =(idReg)=> {
        localStorage.setItem('uid',idReg);
        setUser(idReg);
    }

    const reset =()=> setUser(null)

    return (
        <AuthContext.Provider value={[user,setUserLogin,reset]}>
            {props.children}
        </AuthContext.Provider>
    )    
}

