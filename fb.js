import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
    apiKey: "AIzaSyCPV44gVwibJaPpWH_4G2KY8kc6AKvA1ZM",
    authDomain: "cp3351-39dd4.firebaseapp.com",
    databaseURL: "https://cp3351-39dd4-default-rtdb.firebaseio.com",
    projectId: "cp3351-39dd4",
    storageBucket: "cp3351-39dd4.appspot.com",
    messagingSenderId: "442367383444",
    appId: "1:442367383444:web:c462446d76f860aac6e181",
    measurementId: "G-XQJBRTN4B6"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().useEmulator("10.0.2.2", 8081);
firebase.functions().useEmulator("10.0.2.2", 5001);
firebase.auth().useEmulator(`http://10.0.2.2:9099`);

export default firebase