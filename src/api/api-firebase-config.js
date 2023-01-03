// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB56cJiStR2onmfZvOD4Iq6wghXJvwYBgo",
  authDomain: "to-do-list-app-63b3f.firebaseapp.com",
  databaseURL:
    "https://to-do-list-app-63b3f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "to-do-list-app-63b3f",
  storageBucket: "to-do-list-app-63b3f.appspot.com",
  messagingSenderId: "811809488809",
  appId: "1:811809488809:web:558ef8fe1b74c3df89ceb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Authentication
export const auth = getAuth(app);

//Realtime Database
export const rdb = getDatabase(app);

//Firestore Database
export const fdb = getFirestore(app);
