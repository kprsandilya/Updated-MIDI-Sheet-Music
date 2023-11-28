// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getElementError } from "@testing-library/react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4f7epO2a51xuqet6btwimP1iZlptUeeY",
  authDomain: "midi-sheet-music.firebaseapp.com",
  projectId: "midi-sheet-music",
  storageBucket: "midi-sheet-music.appspot.com",
  messagingSenderId: "119321455607",
  appId: "1:119321455607:web:43c4e01704f438f7625cf2",
  measurementId: "G-DH1ET7BYHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const FieldValue = getFirestore(app);
export const storage = getStorage();
export const storageRef = ref(storage);