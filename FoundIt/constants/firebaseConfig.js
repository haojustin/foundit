import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJEEL46M37Ku8w9igcFfX1QC4Nanoxk3A",
  authDomain: "foundit-ac051.firebaseapp.com",
  projectId: "foundit-ac051",
  storageBucket: "foundit-ac051.appspot.com",
  messagingSenderId: "404987780601",
  appId: "1:404987780601:web:b98377cbf6850cbeccf128",
  measurementId: "G-CV64G7PDQ7"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const authdb = getFirestore(app);
const auth = getAuth(app);

export default db;

export {authdb, auth};