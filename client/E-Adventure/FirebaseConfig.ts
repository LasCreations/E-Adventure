// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlUawBRdi9ms7EwtLSe58doHgGmAojAV8",
  authDomain: "e-adventure-15fea.firebaseapp.com",
  projectId: "e-adventure-15fea",
  storageBucket: "e-adventure-15fea.appspot.com",
  messagingSenderId: "582255786766",
  appId: "1:582255786766:web:4a94084a57e2f1e939b55f"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);