// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL_BmSj2Y7rUv4iHUOmQjpgNNatLlViuo",
  authDomain: "chatter-896ab.firebaseapp.com",
  projectId: "chatter-896ab",
  storageBucket: "chatter-896ab.firebasestorage.app",
  messagingSenderId: "260293562842",
  appId: "1:260293562842:web:05f5ab4eed423adbabf0e3",
  measurementId: "G-P76Z1EFGW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
