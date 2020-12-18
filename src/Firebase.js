import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDqdL_DRARzSq1FQqoB_u998CUWqCkFEq8",
    authDomain: "ultraexchange-8ae89.firebaseapp.com",
    projectId: "ultraexchange-8ae89",
    storageBucket: "ultraexchange-8ae89.appspot.com",
    messagingSenderId: "275744585342",
    appId: "1:275744585342:web:4a409785a8b7f8e37c0a2f",
    measurementId: "G-BYPF8YFPXB"
};

export const currentTime = firebase.firestore.Timestamp;
export const myFirebase = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
      console.log(res.user)
    }).catch((error) => {
      console.log(error.message)
    })
}
const baseDb = myFirebase.firestore();
export const db = baseDb;