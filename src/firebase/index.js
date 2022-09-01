import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAtvyNgSirln7P_HJ7SArhXtl6QZ3m9tV4",
  authDomain: "whomei.firebaseapp.com",
  projectId: "whomei",
  storageBucket: "whomei.appspot.com",
  messagingSenderId: "295732665261",
  appId: "1:295732665261:web:49a6fe0c99e71302b4df24",
  measurementId: "G-HMXDKWY7S9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }