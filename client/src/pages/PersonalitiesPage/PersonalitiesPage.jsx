/*****************************
 * Component Page: Personalities Page
 * Purpose: Page for adding, deleting and configurating personalities
 * Notes: none
 ****************************/

import "./PersonalitiesPage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import PersonalityConfig from "../../components/PersonalityConfig/PersonalityConfig";
import Icon from "../../components/Icon/Icon";

import axios from "axios";
import webapi from "../../utils/webapi";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const MAX_PERSON = 12; //Defines the MAXIMUM number of personalties that can be created

export default function PersonalitiesPage() {
  const [personalities, setPersonalities] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  let sessionAuthToken = sessionStorage.getItem("accessToken");

  // Upon load, refresh personality data, forward user to login page if not signed in.
  useEffect(() => {
    if (sessionAuthToken) {
      refetchPersonalities();
    } else {
      navigate("/signin");
    }
  }, []);

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

  //function returns required authorization header with sesionToken information used for authenticating with the backend API
  function authHeader(_authToken) {
    refreshSessionToken(); //always refresh session token to ensure user has latest token before returning header
    return {
      headers: {
        Authorization: `Bearer ${sessionAuthToken}`,
      },
    };
  }

  //function reponsible for fetching personality data from the backend.
  async function refetchPersonalities() {
    try {
      const response = await axios.get(webapi.URL + "/personality", authHeader(sessionAuthToken));
      setPersonalities(response.data);
    } catch (error) {
      alert(`HomePage.refetchPersonalities() request failed with error: ${error}`);
    }
  }

  //function for handling person update by the user
  async function handleUpdatePersonality(objPersonality) {
    try {
      const updateURL = webapi.URL + "/personality/" + objPersonality.personalityID;
      const response = await axios.put(updateURL, objPersonality, authHeader(sessionAuthToken));
      refetchPersonalities();
    } catch (error) {
      alert(`PersonalitiesPage.handleUpdatePersonality() request failed with error: ${error}`);
      return -1;
    }
  }

  //function for handling person delete by the user
  async function handleDeletePersonality(personalityID) {
    try {
      const deleteURL = webapi.URL + "/personality/" + personalityID;
      const response = await axios.delete(deleteURL, authHeader(sessionAuthToken));
      refetchPersonalities();
    } catch (error) {
      alert(`PersonalitiesPage.handleDeletePersonality() request failed with error: ${error}`);
      return -1;
    }
  }

  //function for handling person add by the user
  async function handleAddPersonality() {
    try {
      if (personalities.length >= MAX_PERSON - 1) {
        alert(`Maximum number of personalities is ${MAX_PERSON}!`);
      }
      const newPersonalityObj = { name: "New Person", avatarImg: "", temperature: 1, conditionPrompt: "You are a useful assistant.", avatarPrompt: "A profile picture of a useful assistant", voice: "alloy" };
      const postURL = webapi.URL + "/personality";
      const response = await axios.post(postURL, newPersonalityObj, authHeader(sessionAuthToken));
      setPersonalities([]);
      refetchPersonalities();
    } catch (error) {
      alert(`PersonalitiesPage.handleAddPersonality() request failed with error: ${error}`);
      return -1;
    }
  }

  //function for requesting a new avatar image to be generated from the backend and displayed
  async function handleGenerateAvatarImg(avatarPrompt, personalityID) {
    try {
      const postURL = webapi.URL + "/imagegen/avatar/" + personalityID;
      const response = await axios.post(postURL, { prompt: avatarPrompt }, authHeader(sessionAuthToken));
      setPersonalities([]);
      refetchPersonalities();
    } catch (error) {
      alert(`PersonalitiesPage.handleGenerateAvatarImg() request failed with error: ${error}`);
      return -1;
    }
  }

  return (
    <div className="PersonalitiesPage">
      <div className="PersonalitiesPage__left">
        <Sidebar objArrChatSessions={[]} />
      </div>
      <div className="PersonalitiesPage__main">
        <h1 className="PersonalitiesPage__main__title font-pageTitle">Configure Personas</h1>
        <div className="PersonalitiesPage__main__content">
          {personalities.map((i, x) => (
            <PersonalityConfig key={i.personalityID} objPersonality={i} updateCallBack={handleUpdatePersonality} deleteCallBack={handleDeletePersonality} generateImgCallBack={handleGenerateAvatarImg} />
          ))}
          <div className="PersonalitiesPage__main__content__bottom">
            <div className="PersonalitiesPage__main__content__bottom__add" onClick={handleAddPersonality}>
              <Icon iconIndex={9} strIconName={"Add New Slot"} strActionType="positive" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
