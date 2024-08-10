// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAiXyHlc2xx1tVfnrz2AIPkbD8Iaytrzo",
  authDomain: "newfirebase-42d6e.firebaseapp.com",
  projectId: "newfirebase-42d6e",
  storageBucket: "newfirebase-42d6e.appspot.com",
  messagingSenderId: "813636394366",
  appId: "1:813636394366:web:f928b55b7cfab25f61a72f",
  measurementId: "G-J5LL012CZB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
