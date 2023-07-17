// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import {getFirestore} from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBoSt1x8JmXJvUAhxL5BQDviFLBFHhuD6Q",
    authDomain: "taskexchange-development.firebaseapp.com",
    databaseURL: "https://taskexchange-development-default-rtdb.firebaseio.com",
    projectId: "taskexchange-development",
    storageBucket: "taskexchange-development.appspot.com",
    messagingSenderId: "955973404424",
    appId: "1:955973404424:web:ffbdc2cda4d03649e3cebd"
})

export const auth = app.auth()
export default app

// export const db = getFirestore(app); //get db as firestore db 
export const db = getDatabase(app); 