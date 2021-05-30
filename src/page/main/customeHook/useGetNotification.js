import firebase from '../../../firebase/firebase';
import {useEffect,useCallback} from 'react';

const useGetNotification =(setUnSeenNotif,setNotifications) => {
    const id = localStorage.getItem('uid');
    const db = firebase.firestore();

    useEffect(()=>{
        
        let result = [];
        let unSeenNotif = 0;

        const getNotif = async()=>{
            try{

                db.collection('users').doc(id).collection('notifications').orderBy('send','desc').onSnapshot((data) => {
                    result = [];
                    unSeenNotif = 0;

                    if(!data.empty){
                        
                        data.forEach(doc => {
                            result.push({id: doc.id,...doc.data()});
                            unSeenNotif += (doc.data().seen === false)
                        });

                        setUnSeenNotif(unSeenNotif);
                        setNotifications(result);
                    }else{
                        setNotifications([]);
                    }

                })
                
        
            }catch(e){
                console.log('error in getNotification',e);
            }
        }

        getNotif();

    },[]);

    
    return 

};

export default useGetNotification;