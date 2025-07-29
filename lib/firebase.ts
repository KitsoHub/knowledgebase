import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB870dB4GsnVTTYxDlgaMcxXeGxQc4cYk0",
  authDomain: "kitsohub0.firebaseapp.com",
  databaseURL: "https://kitsohub0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kitsohub0",
  storageBucket: "kitsohub0.firebasestorage.app",
  messagingSenderId: "608411627397",
  appId: "1:608411627397:web:a83324c6e7b4da8d399eec",
  measurementId: "G-EQZ4BDZTJB"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)

export default app