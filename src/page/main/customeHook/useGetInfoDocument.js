import React,{useEffect,useState} from 'react';
import firebase from '../../../firebase/firebase';

const useGetInfoDocument = (nameDocumentNow,isGroup) =>{

    const db = firebase.firestore();

    const [members,setMembers] = useState([]);
    const [info,setInfo] = useState();

    const infoGroup = data =>{
        const result = data.data();
        setInfo(result);
    }

    const membersGroup = data =>{
        let membersArray = []; 
        data.forEach(doc => {
            const {idUser,name,role} = JSON.parse(JSON.stringify(doc.data()));
            membersArray.push({
                id: idUser,
                name,
                role
            })
        });
        if(localStorage.getItem('nameDocumentNow') === nameDocumentNow){
            setMembers(membersArray);
        }
    }

    const infoPrivateChat = data =>{
        const user = localStorage.getItem('uid');

        const getName = data.data();

        const name = [getName.user1,getName.user2].find(element => {
            const dev = element.split("[*devider*]");
            if(dev[0] !== user) return dev;
        }).split("[*devider*]");
        
        setInfo({nameUser: name[1],id: name[0]});
    }

    useEffect(()=>{

        const isGroup = localStorage.getItem('isGroup') === 'true' ? true : false;

        const getInfoDocument = async ()=>{
            db.collection('groups').doc(nameDocumentNow).onSnapshot(infoGroup);
            db.collection('groups').doc(nameDocumentNow).collection('members').orderBy('joinAt').onSnapshot(membersGroup);
        }

        const getInfoPrivateChat = async ()=>{
            db.collection('chats').doc(nameDocumentNow).onSnapshot(infoPrivateChat);
        }

        if(nameDocumentNow){

            if(isGroup){
                getInfoDocument();
            }else{
                getInfoPrivateChat();
            }
        }
    },[nameDocumentNow]);

    return [members,info];

}

export default useGetInfoDocument;