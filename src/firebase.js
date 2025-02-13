// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "aot-ri.firebaseapp.com",
  projectId: "aot-ri",
  storageBucket: "aot-ri.firebasestorage.app",
  messagingSenderId: "102983244159",
  appId: "1:102983244159:web:cfb7271bf96c9821f6624a",
  measurementId: "G-L9T06XD2M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, collection, doc, getDoc, getDocs };