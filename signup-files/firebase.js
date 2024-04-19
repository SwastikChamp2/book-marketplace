// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAOa8gLKrCFm7dZQYE_lIww02ZALd6BLE0",
  authDomain: "book-marketplace-website.firebaseapp.com",
  databaseURL: "https://book-marketplace-website-default-rtdb.firebaseio.com",
  projectId: "book-marketplace-website",
  storageBucket: "book-marketplace-website.appspot.com",
  messagingSenderId: "160086574117",
  appId: "1:160086574117:web:82438b38bf37d54247abcc",
  measurementId: "G-XGKY9TTTXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;