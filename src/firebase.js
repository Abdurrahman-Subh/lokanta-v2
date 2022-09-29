// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArLSyHlO94zo2slNiWqh6CVUBx17Bd5t8",
  authDomain: "cart-60e18.firebaseapp.com",
  projectId: "cart-60e18",
  storageBucket: "cart-60e18.appspot.com",
  messagingSenderId: "697286079934",
  appId: "1:697286079934:web:d2ece605a12621fc2ef5ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {
    db,
}
