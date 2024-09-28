import "./PersonalitiesPage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import PersonalityConfig from "../../components/PersonalityConfig/PersonalityConfig";

import axios from "axios";
import webapi from "../../utils/webapi";
import { useState, useRef, useEffect } from "react";

export default function PersonalitiesPage() {
  let [personalities, setPersonalities] = useState([]);

  const refetchPersonalities  = async () => {
    try {
      //setPersonalities([]);
      const response = await axios.get(webapi.URL + "/personality");
      setPersonalities(response.data);
    } catch (error) {
      alert(`HomePage.refetchPersonalities() request failed with error: ${error}`);
    }
    
  }

  useEffect(() => {
    const fetchPersonalities = async () => {
      try {
        const response = await axios.get(webapi.URL + "/personality");
        setPersonalities(response.data);
      } catch (error) {
        alert(`HomePage.fetchPersonalities() request failed with error: ${error}`);
      }
    };
    fetchPersonalities();
  }, []);

  const handleUpdatePersonality = async (personalityObj) => {
    try {
      const updateURL = webapi.URL + "/personality/" + personalityObj.personalityID;
      const response = await axios.put(updateURL, personalityObj);
      refetchPersonalities();
    } catch (error) {
      alert(`PersonalitiesPage.handleUpdatePersonality() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleDeletePersonality = async (personalityID) => {
    try{
      const deleteURL = webapi.URL + "/personality/" + personalityID;
      const response = await axios.delete(deleteURL);
      refetchPersonalities();
    } catch (error){
      alert(`PersonalitiesPage.handleDeletePersonality() request failed with error: ${error}`);
      return -1;
    }
  }

  const handleAddPersonality = async () =>{
    try{
      const newPersonalityObj = {"name": "New Person", "avatarImg" : "", "temperature" : 1, "conditionPrompt" :"You are a useful assistant."}
      const postURL = webapi.URL + "/personality";
      const response = await axios.post(postURL, newPersonalityObj );
      refetchPersonalities();
    }catch(error){
      alert(`PersonalitiesPage.handleAddPersonality() request failed with error: ${error}`);
      return -1;
    }
  }

  const handleGenerateAvatarImg = async (avatarPrompt, personalityID) =>{
    try{
      const postURL = webapi.URL + "/imagegen/avatar/" + personalityID
      const response = await axios.post(postURL, {"prompt" : avatarPrompt});
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
        <div className="PersonalitiesPage__main__content">
          {personalities.map((i,x) => (
            <PersonalityConfig key={x} personalityObj={i} updateCallBack={handleUpdatePersonality} deleteCallBack={handleDeletePersonality} generateImgCallBack={handleGenerateAvatarImg}/>
          ))}
          <div className="PersonalitiesPage__main__content__bottom">
        <button className="PersonalitiesPage__main__content__bottom__add" onClick={handleAddPersonality}>Add New Slot</button>
        </div>
        </div>
      </div>
    </div>
  );
}
