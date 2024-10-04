// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf1msKtIcNTS3UI8yM3tLzxjdnLt14VDk",
  authDomain: "jangpt-auth.firebaseapp.com",
  projectId: "jangpt-auth",
  storageBucket: "jangpt-auth.appspot.com",
  messagingSenderId: "133365083496",
  appId: "1:133365083496:web:aff331ca359fd1c3f37add",
  measurementId: "G-F4FJ1GBJYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);