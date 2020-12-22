import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBi8ugJytBRadnEJx1CT4eqodbw6tI1qBg",
    authDomain: "track-your-bugs.firebaseapp.com",
    projectId: "track-your-bugs",
    storageBucket: "track-your-bugs.appspot.com",
    messagingSenderId: "317039492316",
    appId: "1:317039492316:web:da6aa577505540279cc819"
};

firebase.initializeApp(firebaseConfig);

export const fb = firebase;
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();