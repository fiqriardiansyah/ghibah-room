import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyACj71m2-18ecEzEgWEUGnRaOu8JkuUoI8",
    authDomain: "ghibah-room.firebaseapp.com",
    databaseURL: "https://ghibah-room.firebaseio.com",
    projectId: "ghibah-room",
    storageBucket: "ghibah-room.appspot.com",
    messagingSenderId: "973597848409",
    appId: "1:973597848409:web:6809cec8806841775fd248",
    measurementId: "G-73VPX599RW"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase;

