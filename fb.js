import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyBQH1A9fHAnQbOjkRj47L3HrXOn_g_841A",
    authDomain: "imagesensor-d3d51.firebaseapp.com",
    databaseURL: "https://imagesensor-d3d51-default-rtdb.firebaseio.com",
    projectId: "imagesensor-d3d51",
    storageBucket: "imagesensor-d3d51.appspot.com",
    messagingSenderId: "747089375585",
    appId: "1:747089375585:web:5c5ee73fcdb84b351fd520",
    measurementId: "G-DXJL97PWHY"
};

import { Platform } from "react-native";
console.log("Platform.OS", Platform.OS); // ios, android

import Constants from "expo-constants";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);

  const { manifest } = Constants;
  const ip = `${manifest.debuggerHost.split(":").shift()}`;

  firebase.firestore().useEmulator(ip, 8080);
  firebase.functions().useEmulator(ip, 5001);
  firebase.auth().useEmulator(`http://${ip}:9099`);
}

export default firebase;