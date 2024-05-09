// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "skillup-8f870.firebaseapp.com",
  projectId: "skillup-8f870",
  storageBucket: "skillup-8f870.appspot.com",
  messagingSenderId: "984139391023",
  appId: "1:984139391023:web:71f19a754e2592c3cd26da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);