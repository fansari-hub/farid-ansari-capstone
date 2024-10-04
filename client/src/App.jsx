import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PersonalitiesPage from "./pages/PersonalitiesPage/PersonalitiesPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import React from "react";
import { createContext, useState } from "react";
import "./App.scss";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import "./config/firebase-config";

export const UserAuthorizedContext = createContext(null);

function App() {
  const [authorizedUser, setAuthorizedUser] = useState(false ||  sessionStorage.getItem("accessToken"));
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        if (user) {
          user.getIdToken().then((tkn) => {
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);
          });
        }
      })
      .catch((error) => {
        alert(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.clear();
        setAuthorizedUser(false);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            <UserAuthorizedContext.Provider value={{authorizedUser, signInWithGoogle, logoutUser}}>
              <SignInPage />
            </UserAuthorizedContext.Provider>
          }
        />
        <Route
          path="/"
          element={
            <UserAuthorizedContext.Provider value={{authorizedUser, signInWithGoogle, logoutUser}}>
              <HomePage />
            </UserAuthorizedContext.Provider>
          }
        />
        <Route
          path="/setup"
          element={
            <UserAuthorizedContext.Provider value={{authorizedUser, signInWithGoogle, logoutUser}}>
              <PersonalitiesPage />
            </UserAuthorizedContext.Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
