import React,{createContext,useState,useEffect} from 'react';

import firebase from '../firebase/firebase';

export const UserContext = createContext();

export const UserProvider = props =>{

    const db = firebase.firestore();

    const [userData,setUserData] = useState();
    const [id,setId] = useState(localStorage.getItem('uid'));
    const [groups,setGroups] = useState();
    const [idChats,setIdChats] = useState();
    const [dataChats,setDataChats] = useState();
    const [friends,setFriends] = useState();
    

    const reset = () => {
        setUserData(null);
        setId(null);
        setGroups(null);
        setIdChats(null);
        setDataChats(null);
    }
    
    
    useEffect(()=>{

        const userId = localStorage.getItem('uid');

        if(idChats){

            setDataChats([]);

            idChats.forEach( async id => {
                const getDoc = await db.collection('chats').doc(id).get();

                const data = getDoc.data();

                const dataChat = [data.user1,data.user2].find(element => {
                    const dev = element.split("[*devider*]");
                    if(dev[0] !== userId) return dev;
                });

                const separator = dataChat.split("[*devider*]");

                setDataChats(prev => [...prev,{idUser: separator[0],idChat: id,name: separator[1]}])

            });
            
        }

    },[idChats]);

    useEffect(()=>{
        
        const getData = async ()=>{
            
            const usersCollection = db.collection('users');
            
            // data user now
            usersCollection.doc(id).onSnapshot((data) =>{
                const result = data.data();
                setUserData(result);
            });
            
            // user group
            usersCollection.doc(id).collection('groups').onSnapshot((data)=>{
                let groups = [];
                data.forEach(el => groups.push(JSON.parse(JSON.stringify(el.id))) );
                setGroups(groups);
            });

            usersCollection.doc(id).collection('chats').onSnapshot((data) =>{
                let idChats = [];
                data.forEach(el => idChats.push(JSON.parse(JSON.stringify(el.id))));
                setIdChats(idChats);
            });

            usersCollection.doc(id).collection('friends').onSnapshot((data)=>{
                let friends = [];
                data.forEach(el => friends.push(JSON.parse(JSON.stringify(el.id))))
                setFriends(friends);
            });

        }
        
        if(id !== 'null' && id !== null && id !== undefined){
            getData(); 
        }

    },[id]);

    return (
        <UserContext.Provider value={[userData,setId,null,reset,groups,dataChats,friends]}>
            {props.children}
        </UserContext.Provider>
    )

}