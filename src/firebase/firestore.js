import firebase from './firebase';
import uniqid from 'uniqid';


// logout
export const signOut = () =>{
    firebase.auth().signOut();
}

// send messaging
export const sendMessage = async ({...information}) => {

    const data = {
        name: information.userData.name,
        idUser: information.idUser,
        message: information.message,
        time: new Date().getTime(),
        color: information.userData.color
    }

    try{
        const db = firebase.firestore();

        if(information.isGroup){
            db.collection('groups').doc(information.nameDocument).collection('chats').add(data);
        }else{

            db.collection('chats').doc(information.nameDocument).collection('chats').add(data)

            const thisUser = localStorage.getItem('uid');
            const thatUser = information.info.id;

            db.collection('users').doc(thisUser).collection('chats').doc(information.nameDocument).set({});
            db.collection('users').doc(thatUser).collection('chats').doc(information.nameDocument).set({});

        }

    }catch(e){
        console.log(e);
    }

}


// find the user that want to invite to  group with email
export const searchUserWithEmail = async email => {

    let data ;

    const db = firebase.firestore();
 
    try{

        const user = await db.collection('users').where('email','==',email).get();

        if(user.empty){
            return {success: false,message: 'not found email :('}
        }else{
            user.forEach(doc => {
                const {name,email} = doc.data();
                data = {name,email,idUser: doc.id};
            })
        }
        
        return {success: true,data};

    }catch(e){
        return {success: false,message: e}
    }

}

// add member to group 
export const addMember = async (dataUser,isPassByNotif) => {
    const db = firebase.firestore();
    let idGroup ;

    if(isPassByNotif) {
        idGroup = dataUser.idGroup
    }else{
        idGroup = localStorage.getItem('nameDocumentNow');
    }

    try{

        let usersdb = await db.collection('users').doc(dataUser.idUser).collection('groups').doc(idGroup);
        let groupsdb = await db.collection('groups').doc(idGroup).collection('members');

        //check if this groups doesnt exist in this user
        let checkUsers = await usersdb.get();
        let checkGroups = await groupsdb.where('idUser','==',dataUser.idUser).get();


        if(!checkUsers.data() && checkGroups.empty){
            // add groups to user collection
            await usersdb.set({});

            // add user to this group
            await groupsdb.add({idUser: dataUser.idUser,name: dataUser.name,role: 'member',joinAt: new Date().getTime()});

            return {success: true,message: 'horey! new member :)'}
        }else{
            return {success: false,message: 'the user is already registered in this group'}
        }

    }catch(e){
        return {success: false,message: 'something went wrong! try again'}
    }
}


// creating new group
export const createNewGroup = async (data,user) =>{

    if(!data.creator.name || !user || !data.nameGroup) return false;

    const groupId = uniqid(`${data.nameGroup}-${new Date().getTime()}-`);
    const db = firebase.firestore();

    const dataCreator = {
        joinAt: new Date().getTime(),
        idUser: user,
        name: data.creator.name,
        role: "admin"
    }

    const dataGroup = {...data,idGroup: groupId}

    try{

        await db.collection('groups').doc(groupId).set(dataGroup);
        await db.collection('groups').doc(groupId).collection('chats').add({});
        await db.collection('groups').doc(groupId).collection('members').add(dataCreator);

        await db.collection('users').doc(user).collection('groups').doc(groupId).set({});
        
        return true

    }catch(e){
        return false
    }

}

export const kickOutFromGroup = async data =>{
    const db = firebase.firestore();
    try{
        db.collection('users').doc(data.idUser).collection('notifications').add({
            title: 'kickout',
            send: new Date().getTime(),
            seen: false,
            sender: {
                name: data.name,
                email: data.email
            },
            action: {
                accept: false
            },
            content: {
                group: data.idGroup.split("-")[0]
            }
        })
    }catch(e){
        return {success: false,message: e}
    }
}

// inviting stranger user to join group
export const inviteGroup = async (data) =>{

    const db = firebase.firestore();
    
    try{

        const getMembersGroup = await db.collection('groups').doc(data.idGroup).collection('members').where('idUser','==',data.idUserReceiver).get()

        if(!getMembersGroup.empty) return {success: false,message: 'This user is already registered in the group'};

        const storeNotification = await db.collection('users').doc(data.idUserReceiver).collection('notifications').add({
            title: 'invite group',
            send: new Date().getTime(),
            seen: false,
            sender: {
                name: data.name,
                email: data.email
            },
            action: {
                accept: false,
            },
            content: {
                group: data.idGroup,
            }
        })

        if(storeNotification.id) return {success: true};
        return {success: false,message: 'oops something went wrong'}

    }catch(e){
        return {success: false,message: e}
    }

}


/// change specific notification to seen = true
export const seenNotification = data =>{
    const db = firebase.firestore();
    db.collection('users').doc(data.idUser).collection('notifications').doc(data.idNotif).update({seen: true});
}

// delete specific notification
export const deleteNotification = data => {
    const db = firebase.firestore();
    db.collection('users').doc(data.idUser).collection('notifications').doc(data.idNotif).delete();
}

// change accepted or rejected notification status
export const changeStatusActionNotification = data =>{
    const db = firebase.firestore();
    db.collection('users').doc(data.idUser).collection('notifications').doc(data.idNotif).update({action: {accept: data.accept}});
}


export const deleteMember = async data =>{
    console.log(data);
    const db = firebase.firestore();
    try{
        const deleteMemberFromGroup = await db.collection('groups').doc(data.idGroup).collection('members').where('idUser','==',data.idUser).get();
        deleteMemberFromGroup.forEach(async user => await db.collection('groups').doc(data.idGroup).collection('members').doc(user.id).delete());
        
        await deleteGroupSpecificUser(data);

        return {success: true};
        // deleteMemberFromGroup.forEach(el => console.log(el.id);
    }catch(e){
        return {success: false,message: e};
    }
}
 
export const deleteGroupSpecificUser = async data =>{
    const db = firebase.firestore();
    try{
        await db.collection('users').doc(data.idUser).collection('groups').doc(data.idGroup).delete();
        return {success: true};
    }catch(e){
        return {success: false,message: e};
    }
}

//// promote user admin
export const promoteUser = async data =>{
    const db = firebase.firestore();

    try{

        const getUser = await db.collection('groups').doc(data.idGroup).collection('members').where('idUser','==',data.idUser).get();
        getUser.forEach(user =>{
            db.collection('groups').doc(data.idGroup).collection('members').doc(user.id).update({
                role: "admin"
            })
        })

        return {success: true};
    }catch(e){
        return {success: false,message: e};
    }
}


//// delete this group from users group list
export const leaveGroup = async data =>{
    const db = firebase.firestore();

    try{
        if(data.choosenMember){
            await promoteUser({idGroup: data.idGroup,idUser: data.choosenMember});
        }
    
        await deleteGroupSpecificUser(data);
        await deleteMember(data);

        return {success: true};
    }catch(e){
        return {success: false,message: e};
    }

}

// start chat
export const startChat = async data =>{
    const db = firebase.firestore();

    try{

        let id = "";

        const possibility1 =  await db.collection('chats').where('user1','==',data.user1).where('user2','==',data.user2).get()
        const possibility2 =  await db.collection('chats').where('user1','==',data.user2).where('user2','==',data.user1).get()

        if(!possibility1.empty || !possibility2.empty){


            if(!possibility1.empty){
                possibility1.forEach(el => id = el.id );
            }

            if(!possibility2.empty){
                possibility2.forEach(el => id = el.id);
            }

        }else{

            const doc = await db.collection('chats').add({
                user1: data.user1,
                user2: data.user2
            });

            id = doc.id;
        }
        
        return {success: true,id};
        
    }catch(e){
        return {success: false,message: e};
    }
}


// delete messages
export const deleteMessage = async data =>{
    const db = firebase.firestore();

    try{

        const getAllMessage = await db.collection('chats').doc(data.nameDocument).collection('chats').get();
        getAllMessage.forEach(message => db.collection('chats').doc(data.nameDocument).collection('chats').doc(message.id).delete())

        if(data.messagesLength !== 0 && data.messages !== null){
            await db.collection('chats').doc(data.nameDocument).collection('history').add({
                deleteBy: data.user,
                time: new Date().getTime(),
                title: 'delete'
            });
        }

        return {success: true};
    }catch(e){
        return {success: false,message: e};
    }
}

//delete chat for this user
export const deleteChat = async data =>{
    const db = firebase.firestore();

    try{

        db.collection('users').doc(data.idUser).collection('chats').doc(data.idChat).delete();

        return {success: true};
    }catch(e){
        return {success: false,message: e};
    }
}

//add friend
export const addFriend = async data =>{
    const db = firebase.firestore();

    try{

        db.collection('users').doc(data.idUser).collection('friends').doc(data.friend).set({});

        return {success: true};
    }catch(e){
        return {success: false,message: e};
    }
}

