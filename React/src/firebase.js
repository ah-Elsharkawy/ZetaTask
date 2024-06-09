// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAFGGcfwlecNEvR3Hvg86AD3i-zzDroZ4s",
//   authDomain: "zetareacttask.firebaseapp.com",
//   projectId: "zetareacttask",
//   storageBucket: "zetareacttask.appspot.com",
//   messagingSenderId: "383949660159",
//   appId: "1:383949660159:web:63cf6a821c42c6ed5851ca",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFGGcfwlecNEvR3Hvg86AD3i-zzDroZ4s",
  authDomain: "zetareacttask.firebaseapp.com",
  projectId: "zetareacttask",
  storageBucket: "zetareacttask.appspot.com",
  messagingSenderId: "383949660159",
  appId: "1:383949660159:web:63cf6a821c42c6ed5851ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export default app;
