import "./PersonalitiesPage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import PersonalityConfig from "../../components/PersonalityConfig/PersonalityConfig";

import axios from "axios";
import webapi from "../../utils/webapi";
import { useState, useRef, useEffect } from "react";

export default function PersonalitiesPage() {
  let [personalities, setPersonalities] = useState([{ name: "", avatarImg: "", temperature: 0, conditionPrompt: "", personalityID: "" }]);

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
      console.log(updateURL);
      const response = await axios.put(updateURL, {personalityObj});
      console.log(response.data);
    } catch (error) {
      alert(`PersonalitiesPage.handleUpdatePersonality() request failed with error: ${error}`);
      return -1;
    }
  };

  return (
    <div className="PersonalitiesPage">
      <div className="PersonalitiesPage__left">
        <Sidebar chatSessions={[]} />
      </div>
      <div className="PersonalitiesPage__main">
        <div className="PersonalitiesPage__main__content">
          {personalities.map((i) => (
            <PersonalityConfig personalityObj={i} updateCallBack={handleUpdatePersonality} />
          ))}
        </div>
      </div>
    </div>
  );
}
