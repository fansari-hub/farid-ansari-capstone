/*****************************
 * Component Page: App
 * Purpose: Handles main routing to pages and holds function for dealing with user authentication and creation. 
 *          Components access these user auth functions by using the context provider.
 * Usage Notes: none
 ****************************/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PersonalitiesPage from "./pages/PersonalitiesPage/PersonalitiesPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import React from "react";
import { createContext, useState, useEffect } from "react";
import "./App.scss";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import "./config/firebase-config";

export const UserAuthorizedContext = createContext(null);

let timerRefreshSession;
let sessionAuthToken = sessionStorage.getItem("accessToken");

function App() {
  const [authorizedUser, setAuthorizedUser] = useState(false || sessionStorage.getItem("accessToken"));
  const [userName, setUserName] = useState(false || sessionStorage.getItem("userName"));
  const [userEmail, setUserEmail] = useState(false || sessionStorage.getItem("userEmail"));

  const auth = getAuth();

useEffect (() => {
  timerRefreshSession = setInterval(() => {
    refreshSessionToken();
  }, 60000);
  return () => {
    //ensure any active intervals are cleared upon exit
    clearInterval(timerRefreshSession);
  };
}, []);

  //FireBase login functionality via the popup method using selected provider.
  function invokeSignInWithPopup(providerIndex, provider){
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Token. You can use it to access the Google API.
        let credential;

        if (providerIndex === 1) {
          credential = GoogleAuthProvider.credentialFromResult(result);
        } else if (providerIndex == 2) {
          credential = GithubAuthProvider.credentialFromResult(result);
        } else {
          return false;
        }
        const token = credential.accessToken;
        const user = result.user;
        if (user) {
          user.getIdToken().then((token) => {
            sessionStorage.setItem("accessToken", token);
            sessionStorage.setItem("userName", user.displayName);
            sessionStorage.setItem("userEmail", user.email);
            setAuthorizedUser(true);
            setUserName(user.displayName);
            setUserEmail(user.email);
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/account-exists-with-different-credential") {
          alert("You have already have an email account registered another authentication provider, please login using that provider.");
          return false;
        } else {
          alert(`Authentication Error ${errorMessage}`);
          return false;
        }
        //const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  //sign in with GitHub using Firebase
  function signInWithGitHub(){
    invokeSignInWithPopup(2, new GithubAuthProvider());
  };

  //sign in with Google using Firebase
  function signInWithGoogle(){
    invokeSignInWithPopup(1, new GoogleAuthProvider());
  };

  //create email/password user using Firebase
  function createAccountUsingEmail(strEmail, strPassword, strName){
    createUserWithEmailAndPassword(auth, strEmail, strPassword)
      .then((userCredential) => {
        // Signed up

        auth.currentUser
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            sessionStorage.setItem("accessToken", idToken);
          })
          .catch(function (error) {
            // Handle error
          });

        //sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("userName", strName);
        sessionStorage.setItem("userEmail", strEmail);
        setAuthorizedUser(true);
        setUserName(strName);
        setUserEmail(strEmail);
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        return false;
      });
  };

  //sign in with email/password user using Firebase
  function signInWithEmail(strEmail, strPassword, strName){
    signInWithEmailAndPassword(auth, strEmail, strPassword)
      .then((userCredential) => {
        // Signed in

        auth.currentUser
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            sessionStorage.setItem("accessToken", idToken);
          })
          .catch(function (error) {
            // Handle error
          });

        const user = userCredential.user;
        console.log(user);
        //sessionStorage.setItem("userName", user.displayName);
        sessionStorage.setItem("userEmail", user.email);
        setAuthorizedUser(true);
        setUserName(user.displayName);
        setUserEmail(user.email);
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        return false;
      });
  };

  //logout logged in user
  function logoutUser(){
    signOut(auth)
      .then(() => {
        sessionStorage.clear();
        setAuthorizedUser(false);
        clearInterval(timerRefreshSession);
      })
      .catch((error) => {
        alert(error);
      });
  };

  //function refreshes firebase sesion token upon request.
  function refreshSessionToken() {
    auth.currentUser
    ?.getIdToken()
      .then(function (idToken) {
        sessionAuthToken = idToken;
        sessionStorage.setItem("accessToken", idToken);
      })
      .catch(function (error) {
        alert("Session Refresh Error");
      });
  }

  return (
    <UserAuthorizedContext.Provider value={{ authorizedUser, createAccountUsingEmail, signInWithEmail, signInWithGoogle, signInWithGitHub, logoutUser, userName, userEmail }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/setup" element={<PersonalitiesPage />} />
        </Routes>
      </BrowserRouter>
    </UserAuthorizedContext.Provider>
  );
}

export default App;
