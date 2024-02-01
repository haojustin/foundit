// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJEEL46M37Ku8w9igcCfX1QC4Nanoxk3A",
  authDomain: "foundit-ac051.firebaseapp.com",
  projectId: "foundit-ac051",
  storageBucket: "foundit-ac051.appspot.com",
  messagingSenderId: "404987780601",
  appId: "1:404987780601:web:b98377cbf6850cbeccf128",
  measurementId: "G-CV64G7PDQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);