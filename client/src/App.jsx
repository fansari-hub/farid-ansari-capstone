import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PersonalitiesPage from "./pages/PersonalitiesPage/PersonalitiesPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import React from "react";
import { createContext, useState } from "react";
import "./App.scss";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import "./config/firebase-config";

export const UserAuthorizedContext = createContext(null);

function App() {
  const [authorizedUser, setAuthorizedUser] = useState(false || sessionStorage.getItem("accessToken"));
  const [userName, setUserName] = useState(false || sessionStorage.getItem("userName"));
  const [userEmail, setUserEmail] = useState(false || sessionStorage.getItem("userEmail"));
  //const provider = new GoogleAuthProvider();
  const providerGoogle = new GoogleAuthProvider();
  const providerGitHub = new GithubAuthProvider();
  const auth = getAuth();

  const signInWithGitHub = () => {
    signInWithPopup(auth, providerGitHub)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (user) {
          user.getIdToken().then((tkn) => {
            sessionStorage.setItem("accessToken", tkn);
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
        //const email = error.customData.email;
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert("You have already have an emain account registered another authentication provider, please login using that provider.");
          return false;
        } else {
          alert(`Authentication Error ${errorMessage}`);
          return false;
        }
        //const credential = GithubAuthProvider.credentialFromError(error);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (user) {
          user.getIdToken().then((tkn) => {
            sessionStorage.setItem("accessToken", tkn);
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
        //const email = error.customData.email;

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

  const createAccountUsingEmail = (strEmail, strPassword, strName) => {
    createUserWithEmailAndPassword(auth, strEmail, strPassword, strName)
      .then((userCredential) => {
        // Signed up
        const token = userCredential.accessToken;
        sessionStorage.setItem("accessToken", token);
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

  const signInWithEmail = (strEmail, strPassword, strName) => {
    signInWithEmailAndPassword(auth, strEmail, strPassword, strName)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const token = userCredential.accessToken;
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("userName", strName);
        sessionStorage.setItem("userEmail", strEmail);
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
  
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.clear();
        setAuthorizedUser(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

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
