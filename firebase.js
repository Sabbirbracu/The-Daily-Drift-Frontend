import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDEXxTMOZbW0N7X5K5CBzMrsZlwJve4cLk",
  authDomain: "the-daily-drift.firebaseapp.com",
  projectId: "the-daily-drift",
  storageBucket: "the-daily-drift.firebasestorage.app",
  messagingSenderId: "392859302888",
  appId: "1:392859302888:web:d6ca52da7a4f672e8d025d",
  measurementId: "G-PRH1TJEQ5E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
