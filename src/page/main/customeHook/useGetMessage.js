import firebase from '../../../firebase/firebase';
import {useEffect,useState} from 'react';


const useGetMessage = (nameDocument,isGroup) =>{
    const [messages,setMessages] = useState();
    const [history,setHistory] = useState();

    // get all messages from this group or chat private
    const getCollectionMessages = data =>{
        let messagesArray = []; 
    
        data.forEach(doc => {

            const {time,message,name,idUser,color} = JSON.parse(JSON.stringify(doc.data()));
            messagesArray.push({
                id: idUser,
                time,
                message,
                name,
                color
            });

        });

        if(localStorage.getItem('nameDocumentNow') === nameDocument){
            setMessages(messagesArray);
        }
    }

    const getHistory = data =>{
        let historyArray = []; 

        data.forEach(doc => {

            const {deleteBy,time,title} = JSON.parse(JSON.stringify(doc.data()));
            historyArray.push({
                deleteBy,time,title
            });

        });

        if(localStorage.getItem('nameDocumentNow') === nameDocument){
            setHistory(historyArray);
        }
    }

    // 
    const getCollectionGroup = async coll =>{
        try{
            const db = firebase.firestore();
            const getDoc = db.collection('groups');
            getDoc.doc(coll).collection('chats').orderBy('time').onSnapshot(getCollectionMessages);

        }catch(e){
            console.log('error in useFetchMessage',e);
        }
    }


    const getCollectionChat = async coll =>{
        
        try{
            const db = firebase.firestore();
            db.collection('chats').doc(coll).collection('chats').orderBy('time').onSnapshot(getCollectionMessages);
            db.collection('chats').doc(coll).collection('history').orderBy('time').onSnapshot(getHistory);
            
        }catch(e){
            console.log('error in useFetchMessage',e);
        }
    }
 
    useEffect(()=>{

        if(nameDocument){
            setMessages();
            if(isGroup){
                getCollectionGroup(nameDocument);
            }else{
                getCollectionChat(nameDocument);
            }
        }

    },[nameDocument]);

    return [messages,history,setHistory];

}

export default useGetMessage;




