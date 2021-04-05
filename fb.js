import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyBR4o8GEC0_0Uqd3OSeimB1djijA8iRkAI",
    authDomain: "cp3351-project-9be84.firebaseapp.com",
    projectId: "cp3351-project-9be84",
    storageBucket: "cp3351-project-9be84.appspot.com",
    messagingSenderId: "789561957066",
    appId: "1:789561957066:web:77357785ccb2840713b233",
    measurementId: "G-HE53FYYKKR"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().useEmulator("10.0.2.2", 8081);
firebase.functions().useEmulator("10.0.2.2", 5001);
firebase.auth().useEmulator(`http://10.0.2.2:9099`);

export default firebase;