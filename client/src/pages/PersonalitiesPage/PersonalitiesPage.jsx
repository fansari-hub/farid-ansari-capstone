import "./PersonalitiesPage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import PersonalityConfig from "../../components/PersonalityConfig/PersonalityConfig";

import axios from "axios";
import webapi from "../../utils/webapi";
import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function PersonalitiesPage() {
  const [personalities, setPersonalities] = useState([]);
  const navigate = useNavigate();
  let sessionAuthToken = sessionStorage.getItem("accessToken");
  
  const authHeader = (authToken) => {
    const auth = getAuth();
    let token;
    auth.currentUser
      .getIdToken()
      .then(function (idToken) {
        sessionStorage.setItem("accessToken", idToken);
      })
      .catch(function (error) {});
    return {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
  };


  useEffect(() => {
    if(sessionAuthToken){
      refetchPersonalities();
    } else{
      navigate("/signin");
    }
  }, []);

  async function refetchPersonalities(){
    try {
      const response = await axios.get(webapi.URL + "/personality", authHeader(sessionAuthToken));
      setPersonalities(response.data);
    } catch (error) {
      alert(`HomePage.refetchPersonalities() request failed with error: ${error}`);
    }
  }

  const handleUpdatePersonality = async (personalityObj) => {
    try {
      const updateURL = webapi.URL + "/personality/" + personalityObj.personalityID;
      const response = await axios.put(updateURL, personalityObj, authHeader(sessionAuthToken));
      refetchPersonalities();
    } catch (error) {
      alert(`PersonalitiesPage.handleUpdatePersonality() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleDeletePersonality = async (personalityID) => {
    try{
      const deleteURL = webapi.URL + "/personality/" + personalityID;
      const response = await axios.delete(deleteURL, authHeader(sessionAuthToken));
      refetchPersonalities();
    } catch (error){
      alert(`PersonalitiesPage.handleDeletePersonality() request failed with error: ${error}`);
      return -1;
    }
  }

  const handleAddPersonality = async () =>{
    try{
      const newPersonalityObj = {"name": "New Person", "avatarImg" : "", "temperature" : 1, "conditionPrompt" :"You are a useful assistant.", "avatarPrompt": "A profile picture of a useful assistant", "voice": "alloy"}
      const postURL = webapi.URL + "/personality";
      const response = await axios.post(postURL, newPersonalityObj, authHeader(sessionAuthToken) );
      setPersonalities([]);
      refetchPersonalities();
    }catch(error){
      alert(`PersonalitiesPage.handleAddPersonality() request failed with error: ${error}`);
      return -1;
    }
  }

  const handleGenerateAvatarImg = async (avatarPrompt, personalityID) =>{
    try{
      const postURL = webapi.URL + "/imagegen/avatar/" + personalityID
      const response = await axios.post(postURL, {"prompt" : avatarPrompt}, authHeader(sessionAuthToken));
      setPersonalities([]);
      refetchPersonalities();
    }catch(error){
      alert(`PersonalitiesPage.handleGenerateAvatarImg() request failed with error: ${error}`);
      return -1;
    }

  }

  return (
    <div className="PersonalitiesPage">
      <div className="PersonalitiesPage__left">
        <Sidebar chatSessions={[]} />
      </div>
      <div className="PersonalitiesPage__main">
      < h1 className="PersonalitiesPage__main__title">Configure Personas</h1>
        <div className="PersonalitiesPage__main__content">
          {personalities.map((i,x) => (
            <PersonalityConfig key={i.personalityID} personalityObj={i} updateCallBack={handleUpdatePersonality} deleteCallBack={handleDeletePersonality} generateImgCallBack={handleGenerateAvatarImg}/>
          ))}
          <div className="PersonalitiesPage__main__content__bottom">
        <button className="PersonalitiesPage__main__content__bottom__add" onClick={handleAddPersonality}>Add New Slot</button>
        </div>
        </div>
      </div>
    </div>
  );
}
