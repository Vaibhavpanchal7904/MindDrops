// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWo_kWdkUvQOpS0jy0hpUV_dCvKDMoVkU",
  authDomain: "pesonalblog-7b5f8.firebaseapp.com",
  projectId: "pesonalblog-7b5f8",
  storageBucket: "pesonalblog-7b5f8.firebasestorage.app",
  messagingSenderId: "363493473134",
  appId: "1:363493473134:web:450c2c4dc3485389b85f7f",
  measurementId: "G-E5BLDE2LHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);  
const storage = getStorage(app); 
export { db,storage };