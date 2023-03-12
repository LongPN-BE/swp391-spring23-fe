// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx2lazk8cWi80jFGpr0dn9sDz0y5yeJ7M",
  authDomain: "v-leage-ticket.firebaseapp.com",
  projectId: "v-leage-ticket",
  storageBucket: "v-leage-ticket.appspot.com",
  messagingSenderId: "1043474196318",
  appId: "1:1043474196318:web:ef3e07e4918df67ba351cf",
  measurementId: "G-CHQL29WTDE"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);