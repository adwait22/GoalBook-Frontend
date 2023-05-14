import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCXMPT5NDEFISs0WZYAQcSicJvPzhuG2V0",
    authDomain: "goalbook-59ade.firebaseapp.com",
    projectId: "goalbook-59ade",
    storageBucket: "goalbook-59ade.appspot.com",
    messagingSenderId: "586603113378",
    appId: "1:586603113378:web:5eaacd03f4029dd69da0fb"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage()

const storageRef = storage.ref()

export { storageRef, auth }