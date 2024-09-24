import "./PersonalitiesPage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import PersonalityConfig from "../../components/PersonalityConfig/PersonalityConfig";

import axios from "axios";
import webapi from "../../utils/webapi";
import { useState, useRef, useEffect } from "react";

export default function PersonalitiesPage() {
  let [personalities, setPersonalities] = useState([]);

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
    } catch (error) {
      alert(`PersonalitiesPage.handleUpdatePersonality() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleDeletePersonality = async (personalityID) => {
    try{
      const deleteURL = webapi.URL + "/personality/" + personalityID;
      const response = await axios.delete(deleteURL);
    } catch (error){
      alert(`PersonalitiesPage.handleDeletePersonality() request failed with error: ${error}`);
      return -1;
    }
  }

  const handleAddPersonality = async () =>{
    try{
      const newPersonalityObj = {"name": "New Person", "avatarImg" : "SomeURL", "temperature" : 1, "conditionPrompt" :"You are a useful assistant."}
      const postURL = webapi.URL + "/personality";
     const response = await axios.post(postURL, newPersonalityObj );
      setPersonalities([...personalities, newPersonalityObj]);
    }catch(error){
      alert(`PersonalitiesPage.handleAddPersonality() request failed with error: ${error}`);
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
          {personalities.map((i) => (
            <PersonalityConfig personalityObj={i} updateCallBack={handleUpdatePersonality} deleteCallBack={handleDeletePersonality} />
          ))}
          <div className="PersonalitiesPage__main__content__bottom">
        <button onClick={handleAddPersonality}>Add New Slot</button>
        </div>
        </div>
        
        
      </div>
    </div>
  );
}
